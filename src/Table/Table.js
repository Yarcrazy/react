import React from 'react';
import "./table.css";
import {TableContext} from "./Context";

class Table extends React.Component {

  tableRef;

  constructor(props) {
    super(props);
    this.state = {
      scrollLeft: 0,
      isScrolledTop: false,
      cellsWidth: [],
      cellsFixedX: [],
    }
  }

  componentDidMount() {
    const tableRect = this.tableRef.current.getBoundingClientRect();
    this.setState({
      tableLeftBorder: [tableRect.x],
      tableTopBorder: tableRect.top,
    });
  }

  handleScroll = (e) => {
    if (((e.target.scrollTop !== 0) || (e.target.scrollLeft !== 0)) && (!this.state.isScrolledTop)) {
      this.setState(
        {
          isScrolledTop: true,
        }
      )
    }
    this.setState(
      {
        scrollLeft: e.target.scrollLeft,
      }
    )
  };

  handleChangeBorder = (tableLeftBorder) => {
    this.setState((state) => {
      // Если такого значения границы нет в массиве, то добавлять
      return (!state.tableLeftBorder.includes(tableLeftBorder)) ?
        {tableLeftBorder: [...state.tableLeftBorder, tableLeftBorder]} :
        false;
    });
  };

  handleChangeFixedRowBottom = (fixedRowBottom) => {
    this.setState({fixedRowBottom: fixedRowBottom});
  };

  handleFillLeftBorderArray = (cellX, i) => {
    if (i >= 0) {
      this.setState((state) => {
        let cellsFixedX = state.cellsFixedX;
        if (cellsFixedX[i] === undefined) {
          cellsFixedX.push(cellX);
        } else if (cellX > cellsFixedX[i]) {
          cellsFixedX[i] = cellX;
        }
        return {cellsFixedX: cellsFixedX}
      })
    }
  };

  handleFillCellWidth = (cellWidth, i) => {
    if (i >= 0) {
      this.setState((state) => {
        let cellsWidth = state.cellsWidth;
        if (cellsWidth[i] === undefined) {
          cellsWidth.push(cellWidth);
        } else if (cellWidth > cellsWidth[i]) {
          cellsWidth[i] = cellWidth;
        }
        return {cellsWidth: cellsWidth}
      })
    }
  };

  render() {
    this.tableRef = React.createRef();
    let paddingTop = 0;

    const value = {
      scrollLeft: this.state.scrollLeft,
      cellsWidth: this.state.cellsWidth,
      cellsFixedX: this.state.cellsFixedX,
      tableLeftBorder: this.state.tableLeftBorder,
      tableTopBorder: this.state.tableTopBorder,
      isScrolledTop: this.state.isScrolledTop,
      onChangeBorder: this.handleChangeBorder,
      onChangeFixedRowBottom: this.handleChangeFixedRowBottom,
      onFillCellWidth: this.handleFillCellWidth,
      onFillLeftBorderArray: this.handleFillLeftBorderArray,
    };

    if (value.isScrolledTop) {
      paddingTop = this.state.fixedRowBottom;
    }

    return (
      <TableContext.Provider value={value}>
        <div className={'table'} ref={this.tableRef} onScroll={this.handleScroll} style={{paddingTop: paddingTop}}>
          {this.props.children}
        </div>
      </TableContext.Provider>
    );
  }
}

export default Table;