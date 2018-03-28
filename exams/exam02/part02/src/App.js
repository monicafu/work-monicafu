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
        this.startGame = this.startGame.bind(this);
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
            const secResults = await getIdWord(url);
                await this.handleIdWord(secResults);
        }catch(err){
                this.handleError(err);
        }
    }

    async handleIdWord(secResults){
        if (secResults.id.charAt(0) === 'a'){
            await this.setState({
                listA:{
                    ...this.state.listA,
                    id:secResults.id,
                    answer:secResults.answer,
                }
            });
        }else{
            await this.setState({
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
                const newGuess = await getGuessed(url,results.guess,results.matched);
                await this.handleGuess(id,newGuess);
            }catch(err){
                this.handleError(err);
            }
        }else{
            url = this.state.listB.url+`/game/${id}/guessed`;
            const lenB = this.state.listB.results.length;
            results = this.state.listB.results[lenB-1];
            try{
                const guessResult = await getGuessed(url,results.guess,results.matched);
                await this.handleGuess(id,guessResult);
            }catch(err){
                this.handleError(err);
            }
        }
    }
    async handleGuess(id,guessResult) {
        if (guessResult.msg){
            this.handleError(guessResult.msg);
        }
        if (id.charAt(0) === 'a'){
            await this.setState({
                listA:{
                    ...this.state.listA,
                    guessed : guessResult.newGuess}
            });
        }else{
            await this.setState({
                listB:{
                    ...this.state.listB,
                    guessed : guessResult.newGuess}
            });
        }
    }

    async fetchResult(toServer,idForThatServer,myId,newGuess){
        let url;
        if (toServer === config.server.b){
            url = this.state.listB.url+`/game/${idForThatServer}/guess/${newGuess}`;
        }else{
            url = this.state.listA.url+`/game/${idForThatServer}/guess/${newGuess}`;
        }
        try{
            const results = await getResult(url);
            await this.handleResults(myId,results);
        }catch(err){
            this.handleError(err);
        }
    }

    async handleWon(id,results){
        if (results.hasWon) {
            await this.setState({won: true});
            console.log('is won ? '+this.state.won);
            if (id.charAt(0) === 'a') {
                await this.setWinner(id);
                await this.setState({
                    listA: {
                        ...this.state.listA,
                        results: [...this.state.listA.results, {
                            guess: this.state.listA.guessed,
                            hasWon: true,
                            matched: results.matched
                        }],
                    }
                });
                await console.log('results A: '+this.state.listA.results.guess,this.state.listA.results.matched);
            } else {
                await this.setWinner(id);
                await this.setState({
                    listB: {
                        ...this.state.listB,
                        results: [...this.state.listB.results, {
                            guess: this.state.listB.guessed,
                            hasWon: true,
                            matched: results.matched
                        }],
                    }
                });
                await console.log('results B: '+this.state.listA.results.guess,this.state.listB.results.matched);
            }

        }
    }
    async handleResults(id,results) {
        // debugger;
        if (results.msg){
            this.handleError(results.msg);
        }
        await this.handleWon(id,results);
        if (id.charAt(0) === 'a') {
            await this.setState({
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
            await this.setState({
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

    async setWinner(id){
        if (id.charAt(0) ==='a'){
            await this.setState({
                winner:'Alfred'
            });
        }else{
            await this.setState({
                winner:'Barbara'
            });
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
            const results = await deleteRecord(url);
            return await this.handleDelete(id,results);
        }catch(err){
            this.handleError(err);
        }
    }

    async handleDelete(id,results){
        if (id.charAt(0) === 'a' && results.isDeleted){
            return await results.isDeleted;
        }else if(id.charAt(0) === 'b' && results.isDeleted){
            return await results.isDeleted;
        }
    }

    async toggleMode(){
        if(this.state.won){
            await this.setState({
                mode: this.state.modes[1]
            });
        }else{
            await this.setState({
                mode: this.state.modes[0]
        });
    }
}
    async startGame(){
        if (this.state.mode === this.state.modes[0]){
            await this.playGame();
        }else {
            await this.resetGame();
        }
    }
    async playGame(){
        await this.fetchIdWord();
        await this.fetchIdWord();

        while (!this.state.won){
            //server alfred
            await this.fetchGuessed(this.state.listA.id);
            const guessedOfA = this.state.listA.guessed;
            const idOfA = this.state.listA.id;
            await this.fetchResult(config.server.b,this.state.listB.id,idOfA,guessedOfA);
            //server barbara
            await this.fetchGuessed(this.state.listB.id);
            const guessedOfB = this.state.listB.guessed;
            const idOfB = this.state.listB.id;
            await this.fetchResult(config.server.a,this.state.listA.id,idOfB,guessedOfB);
        }
        if(this.state.won){
            const deleteA = await this.fetchDelete(this.state.listA.id);
            const deleteB = await this.fetchDelete(this.state.listB.id);
            if(deleteA && deleteB){
                await this.toggleMode();
            }
        }
    }

    async resetGame(){
        await this.resetState();
        this.nextRound();
    }

    nextRound(){
        this.startGame = this.startGame.bind(this);
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
                startGame = {this.startGame}

            />
            <Message won = {this.state.won} winner = {this.state.winner} turns = {this.state.listA.results.length-1}/>
            <div className="App-output">
                <Player
                    name ={config.server.a}
                    results = {this.state.listA.results}
                    answer = {this.state.listA.answer}
                />
                <Player
                    name ={config.server.b}
                    results = {this.state.listB.results}
                    answer = {this.state.listB.answer}
                />
            </div>
      </div>
    );
  }
}

export default App;
