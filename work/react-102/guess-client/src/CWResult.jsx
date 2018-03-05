import React from 'react';
import CWMessage from './CWMessage.jsx'
import './App.css';

const CWResult = ({ won,results }) => {

    const resultList = results.map( ({ word, common },index) => {
        return (<li key = {index}> The guess is {word}, has {common} common letters</li>);
    });


    return (
        <div className="cw-result">
            <div><label><CWMessage won = {won} text = {results.length}/></label></div>
            <ul>
                {resultList}
            </ul>
        </div>
    );
};

export default CWResult;