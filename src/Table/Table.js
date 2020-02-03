import React from 'react';
import THead from "./THead";
import TBody from "./TBody";

class Table extends React.Component {

  tableRef;

  constructor(props) {
    super(props);
    this.state = {
      scrollLeft: 0,
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
    this.setState({
      scrollLeft: e.target.scrollLeft,
    });
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

  render() {
    const rows = [];
    const children = this.props.children;
    let className = '';
    this.tableRef = React.createRef();

    const scrollLeft = this.state.scrollLeft;
    const tableLeftBorder = this.state.tableLeftBorder;
    const tableTopBorder = this.state.tableTopBorder;
    const fixedRowBottom = this.state.fixedRowBottom;
    const onChangeBorder = this.handleChangeBorder;
    const onChangeFixedRowBottom = this.handleChangeFixedRowBottom;

    rows.push(
      children.map((el, i) => {
        if (el.type === 'thead') {
          return (<THead className={el.type}
                         isFixed={el.props.className}
                         key={i}
                         tableLeftBorder={tableLeftBorder}
                         tableTopBorder={tableTopBorder}
                         onChangeBorder={onChangeBorder}
                         onChangeFixedRowBottom={onChangeFixedRowBottom}
                         scrollLeft={scrollLeft}>
            {el.props.children}
          </THead>)
        }
        if (el.type === 'tbody') {
          return (<TBody className={el.type}
                         isFixed={el.props.className}
                         key={i}
                         tableLeftBorder={tableLeftBorder}
                         fixedRowBottom={fixedRowBottom}
                         scrollLeft={scrollLeft}>
            {el.props.children}
          </TBody>)
        }
      })
    );

    className += this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    return (
      <div className={className} ref={this.tableRef} onScroll={this.handleScroll}>
        {rows}
      </div>
    );
  }
}

export default Table;