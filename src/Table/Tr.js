import React, {useRef} from 'react';
import {RowContext} from "./Context";

function Tr(props) {
  const children = props.children;
  const className = 'tr ' + (props.className ? props.className : '');
  //  setRowNumber((prevRowNumber) => prevRowNumber + 1);
  const colNumber = useRef(0);
  const fixedColNumber = useRef(0);
  const value = {colNumber: colNumber.current,
    fixedColNumber: fixedColNumber.current,
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
