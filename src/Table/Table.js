import React from 'react';
import Row from "./Row";

class Table extends React.Component {

  tableRef;

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
      scrollLeft: 0,
    }
  }

  componentDidMount() {
    if (this.props.className === 'table') {
      const tableRect = this.tableRef.current.getBoundingClientRect();
      this.setState({
        tableLeftBorder: [tableRect.x],
        tableTopBorder: tableRect.top,
      });
    }
  }

  handleScroll = (e) => {
    if (this.props.className === 'table') {
      this.setState({
        scrollLeft: e.target.scrollLeft,
      });
    }
  };

  handleChangeBorder = (tableLeftBorder) => {
    if (this.props.className === 'table') {
      this.setState((state) => {
        // Если такого значения границы нет в массиве, то добавлять
        return (!state.tableLeftBorder.includes(tableLeftBorder)) ?
          {tableLeftBorder: [...state.tableLeftBorder, tableLeftBorder]} :
          {tableLeftBorder: state.tableLeftBorder};
      });
    }
  };

  render() {
    const rows = [];
    const children = this.props.children;
    let className = '';
    this.tableRef = (this.props.className === 'table') ? React.createRef() : '';

    let scrollLeft = this.props.scrollLeft;
    let tableLeftBorder = this.props.tableLeftBorder;
    let tableTopBorder = this.props.tableTopBorder;
    let onChangeBorder = this.props.onChangeBorder;

    if (this.props.className === 'table') {
      scrollLeft = this.state.scrollLeft;
      tableLeftBorder = this.state.tableLeftBorder;
      tableTopBorder = this.state.tableTopBorder;
      onChangeBorder = this.handleChangeBorder;
    }

    if (Array.isArray(children)) {
      rows.push(
        children.map((el, i) => {
          if (el.type === 'tr') {
            return (<Row className={el.type}
                         isFixed={el.props.className}
                         key={i}
                         tableLeftBorder={tableLeftBorder}
                         tableTopBorder={tableTopBorder}
                         onChangeBorder={onChangeBorder}
                         scrollLeft={scrollLeft}>
              {el.props.children}
            </Row>)
          } else {
            return (<Table className={el.type}
                           isFixed={el.props.className}
                           key={i}
                           tableLeftBorder={tableLeftBorder}
                           tableTopBorder={tableTopBorder}
                           onChangeBorder={onChangeBorder}
                           scrollLeft={scrollLeft}>
              {el.props.children}
            </Table>)
          }
        })
      );
    } else {
      if (children.type === 'tr') {
        rows.push(
          <Row className={children.type}
               isFixed={children.props.className}
               key={children.type.length}
               tableLeftBorder={tableLeftBorder}
               tableTopBorder={tableTopBorder}
               onChangeBorder={onChangeBorder}
               scrollLeft={scrollLeft}>{children.props.children}
          </Row>)
      } else {
        rows.push(
          <Table className={children.type}
                 isFixed={children.props.className}
                 key={children.type.length}
                 tableLeftBorder={tableLeftBorder}
                 tableTopBorder={tableTopBorder}
                 onChangeBorder={onChangeBorder}
                 scrollLeft={scrollLeft}>{children.props.children}
          </Table>
        )
      }
    }

    className += this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');
    //TODO можно использовать classNames
    return (
      <div className={className} ref={this.tableRef} onScroll={this.handleScroll}>
        {rows}
      </div>
    );
  }
}

export default Table;