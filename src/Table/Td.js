import React, {useState, useRef, useContext, useEffect} from 'react';
import {RowContext, TableContext} from "./Context";

function Td(props) {

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.children !== this.props.children) {
  //     const rect = this.ref.current.getBoundingClientRect();
  //     // if (this.props.isFixed === 'col-fixed') {
  //     //   this.props.onFillLeftBorderArray(rect.x, this.props.num);
  //     // }
  //     this.props.onFillCellWidth(rect.width, this.props.i);
  //   }
  // }

  const ref = useRef(null);
  const [fixFlag, setFixFlag] = useState(false);
  const [col, setCol] = useState(0);
  const [fixedCol, setFixedCol] = useState(0);
  const rowContext = useContext(RowContext);
  const tableContext = useContext(TableContext);

  // данный хук выполняется один раз для нумерования колонок всех и фиксированных()
  useEffect(() => {
    setCol(rowContext.colNumber);
    rowContext.colNumber++;
    if (props.className === 'col-fixed') {
      setFixedCol(rowContext.fixedColNumber);
      rowContext.fixedColNumber++;
    }
  }, []);

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    if (props.className === 'col-fixed') {
      tableContext.onFillLeftBorderArray(rect.x, fixedCol);
    }
    tableContext.onFillCellWidth(rect.width, col);
  }, [col]);

  const children = props.children;
  const className = 'td ' + (props.className ? props.className : '');
  let cellLeft = 0;
  let width = tableContext.cellsWidth[col];

  // if ((this.props.tableLeftBorder) && (this.props.isFixed === 'col-fixed')) {
  //
  //   if ((this.props.scrollLeft >= this.props.cellsFixedX[num] - this.props.tableLeftBorder[num])) {
  //     if (!this.state.fixFlag) {
  //       this.setState({fixFlag: true});
  //       if (this.props.onChangeBorder) {
  //         this.props.onChangeBorder(this.props.tableLeftBorder[num] + width);
  //       }
  //     }
  //   } else {
  //     if (this.state.fixFlag) {
  //       this.setState({fixFlag: false});
  //       cellLeft = 0;
  //     }
  //   }
  //
  //   if (this.state.fixFlag) {
  //     cellLeft = this.props.scrollLeft - this.props.cellsFixedX[num] + this.props.tableLeftBorder[num];
  //   }
  // }

  return <div className={className} style={{left: cellLeft, width: width}} ref={ref}>
    {children}
  </div>
}

export default Td;