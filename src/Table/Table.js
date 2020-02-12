import React from 'react';
import FixedRow from "./FixedRow";
import Row from "./Row";

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

  handleFillLeftBorderArray = (cellX, i) => (
    this.setState((state) => {
      let cellsFixedX = state.cellsFixedX;
      if (cellsFixedX[i] === undefined) {
        cellsFixedX.push(cellX);
      } else if (cellX > cellsFixedX[i]) {
        cellsFixedX[i] = cellX;
      }
      return {cellsFixedX: cellsFixedX}
    })
  );

  handleFillCellWidth = (cellWidth, i) => (
    this.setState((state) => {
      let cellsWidth = state.cellsWidth;
      if (cellsWidth[i] === undefined) {
        cellsWidth.push(cellWidth);
      } else if (cellWidth > cellsWidth[i]) {
        cellsWidth[i] = cellWidth;
      }
      return {cellsWidth: cellsWidth}
    })
  );

  render() {
    const rows = [];
    let children = this.props.children;
    let className = '';
    this.tableRef = React.createRef();
    let paddingTop = 0;

    const scrollLeft = this.state.scrollLeft;
    const cellsWidth = this.state.cellsWidth;
    const cellsFixedX = this.state.cellsFixedX;
    const tableLeftBorder = this.state.tableLeftBorder;
    const tableTopBorder = this.state.tableTopBorder;
    const isScrolledTop = this.state.isScrolledTop;
    const onChangeBorder = this.handleChangeBorder;
    const onChangeFixedRowBottom = this.handleChangeFixedRowBottom;
    const onFillCellWidth = this.handleFillCellWidth;
    const onFillLeftBorderArray = this.handleFillLeftBorderArray;

    if (isScrolledTop) {
      paddingTop = this.state.fixedRowBottom;
    }

    if (children !== undefined) {
      if (!Array.isArray(children)) {
        children = Array.of(children);
      }

      rows.push(
        children.map((el, i) => {
          if (el.type === 'thead') {
            el = el.props.children;
            return <FixedRow className={el.type}
                             isFixed={el.props.className}
                             key={i}
                             tableLeftBorder={tableLeftBorder}
                             tableTopBorder={tableTopBorder}
                             onChangeBorder={onChangeBorder}
                             onChangeFixedRowBottom={onChangeFixedRowBottom}
                             onFillCellWidth={onFillCellWidth}
                             onFillLeftBorderArray={onFillLeftBorderArray}
                             isScrolledTop={isScrolledTop}
                             scrollLeft={scrollLeft}
                             cellsFixedX={cellsFixedX}
                             cellsWidth={cellsWidth}>
              {el.props.children}
            </FixedRow>
          }
          if (el.type === 'tbody') {
            const child = el.props.children;
            return child.map((elem, j) => {
              return <Row className={elem.type}
                          isFixed={elem.props.className}
                          key={j}
                          tableLeftBorder={tableLeftBorder}
                          onFillCellWidth={onFillCellWidth}
                          onFillLeftBorderArray={onFillLeftBorderArray}
                          cellsWidth={cellsWidth}
                          cellsFixedX={cellsFixedX}
                          scrollLeft={scrollLeft}>
                {elem.props.children}
              </Row>
            })
          }
          return el
        })
      );
    }

    className += this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    return (
      <div className={className} ref={this.tableRef} onScroll={this.handleScroll} style={{paddingTop: paddingTop}}>
        {rows}
      </div>
    );
  }
}

export default Table;