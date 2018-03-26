import React from 'react';
import './App.css'


const Player = ({name,results,answer}) => {

    const resultList = results.map( ({guess,matched},index)=>{
       return (<li key ={index}>The guess is {guess},has {matched} common letters</li>);
    });
        return (
            <div className="App-player">
                <label>{name}:  </label>
                <input value={answer}/>
                <div>
                    <ul >
                        {resultList}
                    </ul>
                </div>
            </div>
        );
};

export default Player;