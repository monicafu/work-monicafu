import React from 'react';
import './App.css';
import {pickErrorMessage} from "./respError";

const GameControl = ({mode,error,clearError,won,answer,playGame}) => {

    let message = pickErrorMessage(error);

    return (
        <div>
            <button className="App-btn" onClick={playGame} disabled={ (won || !answer) ? false : 'disabled'}>{mode}</button>
            <p>* Message from server: {message}<button onClick={clearError}>clear</button></p>
        </div>
    );
};
export default GameControl;