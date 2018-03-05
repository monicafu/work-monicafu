import React from 'react';
import './App.css';

const CWMessage = ({won,text}) => {
    return (
        <label> { won ? `Congratulations, you won in ${text} turns`:
            `Numbers of turns : ${text}`} </label>
    );
};
export default CWMessage;
