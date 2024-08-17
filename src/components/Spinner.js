// Spinner.js
import React from 'react';
import Loading from './Loading.gif'; 

function Spinner() {
  return (
    <div className="text-center">
      <img 
        src={Loading} alt="Loading..." style={{width: "50px", height: "50px", margin: "auto", display: "block"}} />
    </div>
  );
}

export default Spinner;

