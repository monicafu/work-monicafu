import React, { Component } from 'react';
import './App.css';

// Some config values
import config from './config';

//import components
import CWHeader from './CWHeader';
import CWControl from './CWControl';
import CWResult from './CWResult';

//logic function
import {inputValidation} from './inputValidation';
import {getId,getWordList,getResult} from "./services/getData";


class App extends Component {
    constructor(props) {
        super(props);
        //init the first round
        this.state = {
            modes :['guess','reset'],
            mode :'guess',
            results: [],
            word: '',
            list:[],
            id : '',
            error: null,
            won: false
        };
        this.playGame = this.playGame.bind(this);
        this.updateWord = this.updateWord.bind(this);
        this.clearError = this.clearError.bind(this);
    }

    componentWillMount() {
        this.fetchId();
        this.fetchList();
    }

    fetchId() {
        getId()
            .then( id => this.handleId(id) )
            .catch( e => this.handleError(e) );
    }
    handleId(id) {
        this.setState({ id : id });
    }

    fetchList() {
        getWordList()
            .then( list => this.handleList(list) )
            .catch( e => this.handleError(e) );
    }

    handleList(list = []) {
        this.setState({list});
    }

    fetchResult(){
        getResult(this.state.word,this.state.id)
            .then(res => this.handleResult(res))
            .catch( e => this.handleError(e));
    }

    handleResult(res){
        if (res.status === 500){
            this.handleError(res.errCode);
        }else{
            if (res.isWon){
                this.setState( {
                    results:[...this.state.results,{
                        word:this.state.word.toUpperCase(),
                        common:res.common
                    }],
                    won: true},() => {
                    this.toggleMode();
                });
            }else{
                this.setState({
                    results:[...this.state.results,{
                        word:this.state.word.toUpperCase(),
                        common:res.common
                    }],
                    won : res.isWon,
                    word :''
                });
            }
        }
    }
    handleError(e) {
        this.setState({
            error: e
        });
        console.log(e);
    }
    //change the mode between reset and guess
    toggleMode(){
        if(this.state.won){
            this.setState({
                mode: this.state.modes[1],//reset
            });
        }else{
            this.setState({
                mode: this.state.modes[0]//guess
            });
        }
    }
    //begin a new round
    beginGame(){
        this.setState({
            modes :['guess','reset'],
            mode : this.state.modes[0],
            results: [],
            word: '',
            list: [],
            id : '',
            error: null,
            won: false
        });
        //bind again
        this.playGame = this.playGame.bind(this);
        this.updateWord = this.updateWord.bind(this);
        this.clearError = this.clearError.bind(this);
        //fetch again
        this.fetchId();
        this.fetchList();
        this.render();
    }
    //reset the game to play another
    resetGame() {
        this.setState({
            modes :['guess','reset'],
            mode : this.state.modes[0],
            results: [],
            word: '',
            list:[],
            id :'',
            error: null,
            won: false
        });
        this.beginGame();
    }
    //this the real listener of button onClick
    playGame(){
        if (!this.state.word){
            return;
        }
        let valid = inputValidation(this.state.list,this.state.word);
        if (valid && this.state.mode === this.state.modes[0]){
            this.fetchResult();
        }else if (this.state.won){
            this.resetGame();
        }
    }

    updateWord(word) {
        this.setState({
            word
        });
    }
    //clear error message
    clearError() {
        this.setState({
            error: null
        });
        this.fetchId();
        this.fetchList();
    }

  render() {
      const modeLabel = config.modeLabels[this.state.mode];
      const title = 'Welcome to Guess Word Game';
    return (
        <div className="App">
            <CWHeader title = {title}/>
            <CWControl
                  mode = {modeLabel}
                  list = {this.state.list}
                  word = {this.state.word}
                  error = {this.state.error}
                  playGame = {this.playGame}
                  onUpdateWord = {this.updateWord}
                  clearError = {this.clearError}
            />
            <CWResult won = {this.state.won} results = {this.state.results}/>
        </div>

    );
  }
}

export default App;
