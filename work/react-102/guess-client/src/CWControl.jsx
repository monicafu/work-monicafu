import React from 'react';
import CWButton from './CWButton';
import './App.css';
import {inputValidation} from './inputValidation';

const CWControls = ({mode,list,word,playGame,onUpdateWord,placeholder,maxLen}) => {
    const valid = inputValidation(list,word);
    const checkForSubmit = (event) => {
        if(event.key === "Enter") {
            playGame();
        }
    };

    const updateWord = (event) => {
        onUpdateWord(event.target.value);
    };

    return (
        <div className="cw-controls">
            Input: <input value={word} onKeyPress={checkForSubmit} onChange={updateWord} placeholder={placeholder} maxLength = {maxLen}/>
            <CWButton text = {mode} onClick = {playGame}  validInput = {valid} />
        </div>
    );
};
export default CWControls;
