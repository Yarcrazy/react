import React from 'react';
import THead from "./THead";
import FixedRow from "./FixedRow";
import Row from "./Row";

class Table extends React.Component {

  tableRef;

  constructor(props) {
    super(props);
    this.state = {
      scrollLeft: 0,
      scrollTop: 0,
      isRowAbsolute: false,
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
    this.setState(
      {
        scrollLeft: e.target.scrollLeft,
        scrollTop: e.target.scrollTop,
      }
    )
  };

  handleChangeBorder = (tableLeftBorder) => {
    this.setState((state) => {
      // Если такого значения границы нет в массиве, то добавлять
      return (!state.tableLeftBorder.includes(tableLeftBorder)) ?
        {tableLeftBorder: [...state.tableLeftBorder, tableLeftBorder]} :
        {tableLeftBorder: state.tableLeftBorder};
    });
  };

  handleChangeFixedRowBottom = (fixedRowBottom) => {
    this.setState({fixedRowBottom: fixedRowBottom});
  };

  handleRowAbsolute = (isRowAbsolute) => {
    this.setState({isRowAbsolute: isRowAbsolute});
  };

  render() {
    const rows = [];
    const children = this.props.children;
    let className = '';
    let paddingTop = 0;
    this.tableRef = React.createRef();

    const scrollLeft = this.state.scrollLeft;
    const tableLeftBorder = this.state.tableLeftBorder;
    const tableTopBorder = this.state.tableTopBorder;
    const scrollTop = this.state.scrollTop;
    const onChangeBorder = this.handleChangeBorder;
    const onChangeFixedRowBottom = this.handleChangeFixedRowBottom;
    const onRowAbsolute = this.handleRowAbsolute;

    if (this.state.isRowAbsolute) {
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
                           scrollTop={scrollTop}
                           onChangeFixedRowBottom={onChangeFixedRowBottom}
                           onRowAbsolute={onRowAbsolute}
                           scrollLeft={scrollLeft}>
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