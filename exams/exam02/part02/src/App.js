import React, { Component } from 'react';
//component import
import GameControl from './GameControl';
import Player from './Player';
import Message from './Message';
import './App.css';

//config values
import config from './config';

//services function
import {getIdWord,getGuessed,getResult} from './getData';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modes :['start','reset'],
            mode:'start',
            listA:{
                url: config.alfred,
                id:'',
                answer:'',
                results:[{
                    guessed : '',
                    matched : 0,
                    hasWon : false
                }],
            },
            listB:{
                url: config.barbara,
                id:'',
                answer:'',
                results:[{
                    guessed : '',
                    matched : 0,
                    hasWon:false
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
           console.log(url);
        }else{
            url = this.state.listB.url+'/game';
        }
        console.log('url in app getIdWord '+ url);
        try{
            let data = await getIdWord(url);
            await this.handleIdWord(data)
        }catch(err){
            await this.handleError(err);
        }
        // getIdWord(url)
        //     .then(data  => this.handleIdWord(data))
        //     .catch( err => this.handleError(err));
    }

    async handleIdWord(data){
        if (data.id.charAt(0) === 'a'){
            await this.setState({
               listA:{
                   id:data.id,
                   answer:data.secret}
            });
        }else{
            await this.setState({
                listB:{
                    id:data.id,
                    answer:data.secret}
            });
        }
    }
    async fetchGuessed(id){
        let url;
        let results;
        if (id.charAt(0) === 'a'){
            url = this.state.listA.url+'/game/id/guessed';
            results = this.state.listA.results;
            try{
                let newGuess = await getGuessed(url,results.guessed,results.matched);
                await this.handleGuess(id,newGuess);
            }catch(err){
                await this.handleError(err);
            }
            // getGuessed(url,results.guessed,results.matched)
            //     .then(newGuess => this.handleGuess(id,newGuess))
            //     .catch(err => this.handleError(err));
        }else{
            url = this.state.listB.url+'/game/id/guessed';
            results = this.state.listB.results;
            try{
                let newGuess = await getGuessed(url,results.guessed,results.matched);
                await this.handleGuess(id,newGuess);
            }catch(err){
                await this.handleError(err);
            }
            // getGuessed(url,results.guessed,results.matched)
            //     .then(newGuess => this.handleGuess(id,newGuess))
            //     .catch(err => this.handleError(err));
        }

    }
    async handleGuess(id,newGuess) {
        if (id.charAt(0) === 'a'){
            await this.setState({
                listA:{results:[{
                        guessed : newGuess}]}
            });
        }else{
            await this.setState({
                listB:{results:[{
                        guessed : newGuess}]}
            });
        }
        await this.fetchResult(id,newGuess);
    }

    async fetchResult(id,newGuess){
        let url;
        if (id.charAt(0) === 'a'){
            url = this.state.listB.url+'/game/id/guess/newGuess';
        }else{
            url = this.state.listA.url+'/game/id/guess/newGuess';
        }
        try{
            let data = await getResult(url,id,newGuess);
            await this.handleResults(id,data);
        }catch(err){
            await this.handleError(err);
        }
        // getResult(url,id,newGuess)
        //     .then( data => this.handleResults(id,data))
        //     .catch( err => this.handleError(err));

    }

    async handleResults(id,data) {
        if (data.hasWon) {
            await this.setState({
                won: true
            }, () => this.toggleMode());
            if (id.charAt(0) === 'a') {
                await this.setState({
                    listA: {results: [{
                            hasWon: true}]
                    }
                });
            } else {
                await this.setState({
                    listB: {results: [{
                            hasWon: true}]
                    }
                });
            }
        }
        if (id.charAt(0) === 'a') {
            await this.setState({
                listA: {
                    results: [{
                        matched: data.matched}],
                }
            });
        } else {
            await this.setState({
                listB: {
                    results: [{
                        matched: data.matched}],
                }
            });
        }
    }

    getWinner(){
        if (this.state.listA.hasWon){
            return 'Alfred';
        }else{
            return 'Barbara';
        }
    }

    async toggleMode(){
        if(this.state.won){
            await this.setState({
                mode: this.state.modes[1],//reset
            });
        }else{
            await this.setState({
                mode: this.state.modes[0]//guess
            });
        }
    }
    /*playGame*/
    async playGame(){
        //get id and secret and set state
        await this.fetchIdWord();
        await this.fetchIdWord();
        //use id to construct url to get guess
        await this.fetchGuessed(this.state.listA.id);
        await this.fetchGuessed(this.state.listB.id);
        //get the matched result
        if(!this.state.won){
            let guessedOfA = this.state.listA.results.guessed;
            await this.fetchResult(this.state.listA.id,guessedOfA);
            let guessedOfB = this.state.listB.results.guessed;
            this.fetchResult(this.state.listB.id,guessedOfB);
        }else{
            await this.resetGame();
        }
    }

    async resetGame(){
        await this.resetState();
        this.playGame = this.playGame.bind(this);
        this.clearError = this.clearError.bind(this);
        //this.playGame();
        await this.render();
    }
    async resetState(){
        await this.setState ({
            mode:this.state.modes[0],
            listA:{
                url: config.alfred,
                id:'',
                answer:'',
                results:[{
                    guessed : '',
                    matched : 0,
                    hasWon : false
                }],
            },
            listB:{
                url: config.barbara,
                id:'',
                answer:'',
                results:[{
                    guessed : '',
                    matched : 0,
                    hasWon:false
                }],
            },
            won:false,
            error:null
        });
    }
    async clearError(){
        await this.setState({
            error : null
        });
    }

    async handleError(err){
        await this.setState({
            error:err
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
                playGame = {this.playGame}

            />
            <Message won = {this.state.won} winner = {this.getWinner} turns = {this.state.listA.results}/>
            <div className="App-output">
                <div className = "Alfred" >
                    <Player
                    name ={config.server.a}
                    results = {this.state.listA.results}
                    answer = {this.state.listA.answer}
                    />
                </div>
                <div className = "Barbara" >
                    <Player
                    name ={config.server.b}
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
