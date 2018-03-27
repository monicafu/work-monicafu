import React, { Component } from 'react';
//component import
import GameControl from './GameControl';
import Player from './Player';
import Message from './Message';
import './App.css';

//config values
import config from './config.json';

//services function
import {getIdWord,getGuessed,getResult,deleteRecord} from './getData';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modes :['start','reset'],
            mode:'start',
            winner:'',
            listA:{
                url: config.alfred,
                id:'',
                answer:'',
                guessed: '',
                results:[{
                    guess: '',
                    hasWon: false,
                    matched: 0
                }],
            },
            listB:{
                url: config.barbara,
                id:'',
                answer:'',
                guessed: '',
                results:[{
                    guess: '',
                    hasWon: false,
                    matched: 0
                }],
            },
            won:false,
            error:null
        };
        this.playGame = this.playGame.bind(this);
        this.clearError = this.clearError.bind(this);
    };


    async fetchIdWord(){
        let url;
        if (this.state.listA.id === ''){
           url = this.state.listA.url+'/game';
        }else{
            url = this.state.listB.url+'/game';
        }
        try{
            let secResults = await getIdWord(url);
                this.handleIdWord(secResults);
        }catch(err){
                this.handleError(err);
        }
    }

    handleIdWord(secResults){
        if (secResults.id.charAt(0) === 'a'){
            this.setState({
                listA:{
                    ...this.state.listA,
                    id:secResults.id,
                    answer:secResults.answer,
                }
            });
        }else{
            this.setState({
                listB:{
                    ...this.state.listB,
                    id:secResults.id,
                    answer:secResults.answer,
                }
            });

        }
    }
    async fetchGuessed(id){
        let url;
        let results;
        if (id.charAt(0) === 'a'){
            url = this.state.listA.url+`/game/${id}/guessed`;
            const lenA = this.state.listA.results.length;
            results = this.state.listA.results[lenA-1];
            try{
                let newGuess = await getGuessed(url,results.guess,results.matched);
                await this.handleGuess(id,newGuess);
            }catch(err){
                this.handleError(err);
            }
        }else{
            url = this.state.listB.url+`/game/${id}/guessed`;
            const lenB = this.state.listB.results.length;
            results = this.state.listB.results[lenB-1];
            try{
                let guessResult = await getGuessed(url,results.guess,results.matched);
                await this.handleGuess(id,guessResult);
            }catch(err){
                this.handleError(err);
            }
        }
    }
    handleGuess(id,guessResult) {
        if (id.charAt(0) === 'a'){
            this.setState({
                listA:{
                    ...this.state.listA,
                    guessed : guessResult.newGuess
                }
            });
        }else{
            this.setState({
                listB:{
                    ...this.state.listB,
                    guessed : guessResult.newGuess
                }
            });
        }
    }

    async fetchResult(toServer,id,newGuess){
        let url;
        if (toServer === 'b'){
            url = this.state.listB.url+`/game/${id}/guess/${newGuess}`;
        }else{
            url = this.state.listA.url+`/game/${id}/guess/${newGuess}`;
        }
        try{
            let results = await getResult(url);
            await this.handleResults(id,results);
        }catch(err){
            this.handleError(err);
        }
    }
    async fetchDelete(id){
        let url;
        if (id.charAt(0) === 'a'){
            url = this.state.listA.url+`/game/${id}`;
        }else{
            url = this.state.listB.url+`/game/${id}`;
        }
        try {
            let results = await deleteRecord(url);
            return await this.handleDelete(id,results);
        }catch(err){
            this.handleError(err);
        }
    }

    async handleDelete(id,results){
        let count = 0;
        if (id.charAt(0) === 'a' && results.isDeleted){
            count++;
        }else if(id.charAt(0) === 'b' && results.isDeleted){
            count++;
        }
        if (count === 2){
            await this.resetGame();
        }
    }



    async handleWon(id,results){
        if (results.hasWon) {
            this.setState({won: true},() => this.toggleMode());
            await this.fetchDelete(this.state.listB.id);
            await this.fetchDelete(this.state.listA.id);
            if (id.charAt(0) === 'a') {
                await this.setWinner(id);
                this.setState({
                    listA: {
                        ...this.state.listA,
                        results: [...this.state.listA.results, {
                            guess: this.state.listA.guessed,
                            hasWon: true,
                            matched: results.matched}],}
                });
            }else {
                await this.setWinner(id);
                this.setState({
                    listB: {
                        ...this.state.listB,
                        results: [...this.state.listB.results, {
                            guess: this.state.listB.guessed,
                            hasWon: true,
                            matched: results.matched}],}
                });
            }
        }
    }
    async handleResults(id,results) {
        // debugger;
        await this.handleWon(id,results);
        if (id.charAt(0) === 'a') {
            this.setState({
                listA: {
                    ...this.state.listA,
                    results: [...this.state.listA.results, {
                        guess: this.state.listA.guessed,
                        matched: results.matched,
                        hasWon: results.hasWon,
                    }]
                },
            });
        } else {
            this.setState({
                listB: {
                    ...this.state.listB,
                    results: [...this.state.listB.results, {
                        guess: this.state.listB.guessed,
                        matched: results.matched,
                        hasWon: results.hasWon,
                    }]
                }
            });
        }
    }

    setWinner(id){
        if (id.charAt(0) ==='a'){
            this.setState({
                winner:'Alfred'
            });
        }else{
            this.setState({
                winner:'Barbara'
            });
        }
    }

    toggleMode(){
        if(this.state.won){
            this.setState({
                mode: this.state.modes[1]
            });
        }else{
            this.setState({
                mode: this.state.modes[0]
        });
    }
}
    /*playGame*/
    async playGame(){
        //get id and secret and set state
        await this.fetchIdWord();
        await this.fetchIdWord();
        while(!this.state.won){
            await this.fetchGuessed(this.state.listA.id);
            await this.fetchGuessed(this.state.listB.id);
            /**********************/
            let guessedOfA = this.state.listA.guessed;
            await this.fetchResult('b',this.state.listB.id ,guessedOfA);
            let guessedOfB = this.state.listB.guessed;
            await this.fetchResult('a',this.state.listA.id,guessedOfB);
        }
    }

    async resetGame(){
        await this.resetState();
        this.playGame = this.playGame.bind(this);
        this.clearError = this.clearError.bind(this);
        this.render();
    }


    resetState(){
        this.setState({
            mode:this.state.modes[0],
            listA:{
                url: config.alfred,
                id:'',
                answer:'',
                guessed: '',
                results:[{
                    guess : '',
                    matched : 0,
                    hasWon : false
                }],
            },
            listB:{
                url: config.barbara,
                id:'',
                answer:'',
                guessed: '',
                results:[{
                    guess : '',
                    matched : 0,
                    hasWon:false
                }],
            },
            won:false,
            error:null
        });
    }
    clearError(){
        this.setState({
            error : null
        });
    }

    handleError(err){
        this.setState({
            error : err
        });
        console.log(err);
    }



    render(){
        const title = 'Welcome to Guess Game';
        const modeLabel = config.modeLabels[this.state.mode];

        return (

        <div className="App">
            <header className="App-header">
                <h2 className="App-title">{title}</h2>
            </header>
            <GameControl
                mode = {modeLabel}
                error = {this.state.error}
                clearError = {this.clearError}
                won = {this.state.won}
                answer = {this.state.listA.answer}
                playGame = {this.playGame}

            />
            <Message won = {this.state.won} winner = {this.state.winner} turns = {this.state.listA.results.length-1}/>
            <div className="App-output">
                <div className = "Alfred" >
                    <Player
                    name ={config.server.a}
                    guessed ={this.state.listA.guessed}
                    results = {this.state.listA.results}
                    answer = {this.state.listA.answer}
                    />
                </div>
                <div className = "Barbara" >
                    <Player
                    name ={config.server.b}
                    guessed ={this.state.listB.guessed}
                    results = {this.state.listB.results}
                    answer = {this.state.listB.answer}
                    />
                </div>
            </div>
      </div>
    );
  }
}

export default App;
