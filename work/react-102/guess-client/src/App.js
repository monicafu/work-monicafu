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
        this.setState({
            results:[...this.state.results,{
                word:this.state.word.toUpperCase(),
                common:res.common
            }],
            won : res.isWon,
            word :''//blank the input
        });
        console.log(`res json from server: ${res.common}, ${res.isWon}`);
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
    //begin an new round
    beginGame(){
        this.setState({
            modes :['guess','reset'],
            mode :'guess',
            results: [],
            word: '',
            list: [],
            id : '',
            error: null,
            won: false
        });
        this.playGame = this.playGame.bind(this);
        this.updateWord = this.updateWord.bind(this);
        this.render();
    }
    //reset the game to play another
    resetGame() {
        this.setState({
            mode :this.state.modes[0],
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
        if (this.state.won) {
            this.setState( {won: true},() => {
                this.toggleMode();
            });
        }
        if (valid && this.state.mode === this.state.modes[0]){
            this.fetchResult();
        }else if (this.state.won){
            this.resetGame();
        }
    }

    //listen the word change and set the word dynamically
    updateWord(word) {
        this.setState({
            word
        });
    }

  render() {
      const modeLabel = config.modeLabels[this.state.mode];
      const placeholder = 'Input a 5 length word';
      const maxLen = 5;
      const title = 'Welcome to Guess Word Game';

    return (
        <div className="App">
            <CWHeader title = {title}/>
            <CWControl
                  mode = {modeLabel}
                  list = {this.state.list}
                  word = {this.state.word}
                  playGame = {this.playGame}
                  onUpdateWord = {this.updateWord}
                  placeholder = {placeholder}
                  maxLen = {maxLen}
            />
            <CWResult won = {this.state.won} results = {this.state.results}/>
        </div>

    );
  }
}

export default App;
