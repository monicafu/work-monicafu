import React from 'react';
import './App.css';

const Message = ({won,winner,turns}) => {
    return (
        <div className="App-message">
            <label> { won ? `Congratulations, ${winner} won in ${turns} turns`:
                        `Numbers of turns : ${turns}`} </label>
        </div>
    );
};
export default Message;