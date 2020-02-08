import React from 'react';
import Cell from "./Cell";

class Row extends React.Component {

  render() {
    let rows = [];
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    const children = this.props.children;

    let scrollLeft = 0;
    let tableLeftBorder = 0;

    let j = -1;
    rows.push(
      children.map((el, i) => {
          if (el.props.className === 'col-fixed') {
            scrollLeft = this.props.scrollLeft;
            tableLeftBorder = this.props.tableLeftBorder;
            j++;
          }
          return <Cell className={el.type}
                       isFixed={el.props.className}
                       key={i}
                       num={j}
                       tableLeftBorder={tableLeftBorder}
                       scrollLeft={scrollLeft}>
            {el.props.children}
          </Cell>
        }
      )
    );

    return <div className={className}>
      {rows}
    </div>
  }
}

export default Row;
