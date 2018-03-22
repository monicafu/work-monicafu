import React from 'react';
import './App.css';

const CWButton = ({ onClick,text,validInput}) => {
  return (
    <button onClick={onClick} disabled={(validInput || text === 'Reset')? false: 'disabled'}> {text} </button>
  );
};
export default CWButton;
