import React, {useState, useRef, useContext, useEffect} from 'react';
import {RowContext, TableContext} from "./Context";

function Td(props) {

  const ref = useRef(null);
  const [fixFlag, setFixFlag] = useState(false);
  const [col, setCol] = useState(-1);
  const [fixedCol, setFixedCol] = useState(-1);
  const [cellLeft, setCellLeft] = useState(0);
  const rowContext = useContext(RowContext);
  const tableContext = useContext(TableContext);
  const children = props.children;
  const className = 'td ' + (props.className ? props.className : '');
  let width = tableContext.cellsWidth[col];

  // данный хук выполняется один раз для нумерования колонок всех и фиксированных
  useEffect(() => {
    setCol(rowContext.colNumber++);
    if (props.className === 'col-fixed') {
      setFixedCol(rowContext.fixedColNumber++);
    }
  }, []);

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    if (props.className === 'col-fixed') {
      tableContext.onFillLeftBorderArray(rect.x, fixedCol);
    }
    tableContext.onFillCellWidth(rect.width, col);
  }, [col]);

  useEffect(() => {
    if (fixedCol >= 0) {
      if (tableContext.scrollLeft >= tableContext.cellsFixedX[fixedCol] - tableContext.tableLeftBorder[fixedCol]) {
        if (!fixFlag) {
          setFixFlag(true);
          tableContext.onChangeBorder(tableContext.tableLeftBorder[fixedCol] + width);
        }
      } else {
        if (fixFlag) {
          setFixFlag(false);
        }
      }

      if (fixFlag) {
        let left = tableContext.scrollLeft - tableContext.cellsFixedX[fixedCol] + tableContext.tableLeftBorder[fixedCol];
        setCellLeft((left <= 0) ? 0 : left);
      }
    }
  },[tableContext.scrollLeft]);

  return <div className={className} style={{left: cellLeft, width: width}} ref={ref}>
    {children}
  </div>
}

export default Td;