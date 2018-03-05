import React from 'react';
import './App.css';
const CWHeader = ({ title }) => {
    return (
        <header className="cw-header">
            {title}
        </header>
    );
};

export default CWHeader;