import React, {useState} from 'react';
import {RowContext} from "./Context";

function Tr(props) {
  const children = props.children;
  const className = 'tr ' + (props.className ? props.className : '');
  //  setRowNumber((prevRowNumber) => prevRowNumber + 1);
  const [colNumber, setColNumber] = useState(0);
  const [fixedColNumber, setFixedColNumber] = useState(0);
  const value = {colNumber: colNumber,
    setColNumber: setColNumber,
    fixedColNumber: fixedColNumber,
    setFixedColNumber: setFixedColNumber,
  };

  return (
    <RowContext.Provider value={value}>
      <div className={className}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

export default Tr;
