import React from 'react';
import Cell from "./Cell";

class Row extends React.Component {

  render() {
    let rows = [];
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    const children = this.props.children;

    let scrollTop = 0;
    let scrollLeft = 0;
    let tableLeftBorder = 0;

    if (this.props.isFixed === 'row-fixed') {
      scrollTop = this.props.scrollTop;
      //scrollTop = this.props.tableRef.current.scrollTop;
      //console.log(this.props.tableRef);
    }

    rows.push(
      children.map((el, i) => {
          if (el.props.className === 'col-fixed') {
            scrollLeft = this.props.scrollLeft;
            tableLeftBorder = this.props.tableLeftBorder;
          }
          return <Cell className={el.type}
                       isFixed={el.props.className}
                       key={i}
                       num={i+1}
                       tableLeftBorder={tableLeftBorder}
                       scrollLeft={scrollLeft}>
            {el.props.children}
          </Cell>
        }
      )
    );

    return <div className={className} style={{top: scrollTop}}>
      {rows}
    </div>
  }
}

export default Row;
