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
    if ((e.target.scrollTop !== 0) && (!this.state.isScrolledTop)) {
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

  handleFillCellWidthArray = (cellWidth) => (
    this.setState((state) => {
      return {cellsWidth: [...state.cellsWidth, cellWidth]}
    })
  );

  handleResizeCellWidth = (cellWidth, i) => (
    this.setState((state) => {
      let cellsWidth = state.cellsWidth;
      cellsWidth[i] = cellWidth;
      return cellsWidth
    })
  );

  render() {
    const rows = [];
    const children = this.props.children;
    let className = '';
    let paddingTop = 0;
    this.tableRef = React.createRef();

    const scrollLeft = this.state.scrollLeft;
    const cellsWidth = this.state.cellsWidth;
    const tableLeftBorder = this.state.tableLeftBorder;
    const tableTopBorder = this.state.tableTopBorder;
    const isScrolledTop = this.state.isScrolledTop;
    const onChangeBorder = this.handleChangeBorder;
    const onChangeFixedRowBottom = this.handleChangeFixedRowBottom;
    const onFillCellWidthArray = this.handleFillCellWidthArray;
    const onResizeCellWidth = this.handleResizeCellWidth;

    if (isScrolledTop) {
      paddingTop = this.state.fixedRowBottom;
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
                           onFillCellWidthArray={onFillCellWidthArray}
                           onResizeCellWidth={onResizeCellWidth}
                           isScrolledTop={isScrolledTop}
                           scrollLeft={scrollLeft}
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
                        onResizeCellWidth={onResizeCellWidth}
                        cellsWidth={cellsWidth}
                        scrollLeft={scrollLeft}>
              {elem.props.children}
            </Row>
          })
        }
      })
    );

    className += this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    return (
      <div className={className} ref={this.tableRef} onScroll={this.handleScroll} style={{paddingTop: paddingTop}}>
        {rows}
      </div>
    );
  }
}

export default Table;