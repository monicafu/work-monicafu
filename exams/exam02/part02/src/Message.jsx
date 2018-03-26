import React from 'react';
import './App.css';

const Message = ({won,winner,turns}) => {
    return (
        <div className="App-message">
            <label> { won ? `Congratulations, ${winner} won in ${turns.length} turns`:
                        `Numbers of turns : ${turns.length}`} </label>
        </div>
    );
};
export default Message;