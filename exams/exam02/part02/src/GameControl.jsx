import React from 'react';
import './App.css';
import {pickErrorMessage} from "./respError";

const GameControl = ({mode,error,playGame}) => {

    let message = pickErrorMessage(error);
    return (
        <div>
            <button className="App-btn" onClick={playGame}>{mode}</button>
            <p>* Message from server: {message}<button>clear</button></p>
        </div>
    );
};
export default GameControl;