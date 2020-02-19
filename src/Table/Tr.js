import React from 'react';
import {RowContext} from "./Context";
import {useState} from "react";

function Tr(props) {
  const [rowNumber, setRowNumber] = useState(0);
  const children = props.children;
  const className = 'tr ' + (props.className ? props.className : '');
  //  setRowNumber((prevRowNumber) => prevRowNumber + 1);
  const value = {rowNumber: rowNumber,};

  return (
    <RowContext.Provider value={value}>
      <div className={className}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

export default Tr;
