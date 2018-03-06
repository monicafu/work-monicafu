import React from 'react';
import CWButton from './CWButton';
import './App.css';
import {inputValidation} from './inputValidation';
import { pickErrorMessage } from './respError';

const CWControls = ({mode,list,word,error,playGame,onUpdateWord,clearError}) => {
    const placeholder = 'Input a 5 length word';
    const maxLen = 5;
    const valid = inputValidation(list,word);
    const checkForSubmit = (event) => {
        if(event.key === "Enter") {
            playGame();
        }
    };

    const updateWord = (event) => {
        onUpdateWord(event.target.value);
    };

    let message = pickErrorMessage(error);

    return (
        <div className="cw-controls">
            Input: <input disabled={!!error} value={word} onKeyPress={checkForSubmit} onChange={updateWord} placeholder={placeholder} maxLength = {maxLen}/>
            <CWButton text = {mode} onClick = {playGame}  validInput = {valid} />
            <div>
                <label>* Message from server: {message}</label>
                <button onClick={clearError}>Got it</button>
            </div>
        </div>
    );
};
export default CWControls;
