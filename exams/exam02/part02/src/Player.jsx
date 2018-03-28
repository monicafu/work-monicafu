import React from 'react';
import './App.css'


const Player = ({name,results,answer}) => {


    let resultList = results.map( ({guess,matched},index)=>{
            return (<li key ={index}>{guess}   matched:   {matched} </li>);
        });
        return (
            <div className="App-player">
                <div className={name}>
                    <button>{name}:     </button>
                    <label> {answer}</label>
                    <div>
                        <ul >
                            {resultList}
                        </ul>
                    </div>
                </div>
            </div>
        );
};

export default Player;