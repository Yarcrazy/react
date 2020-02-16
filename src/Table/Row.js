import React from 'react';
import Cell from "./Cell";

class Row extends React.Component {

  render() {
    let rows = [];
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    let children = this.props.children;
    const cellsWidth = this.props.cellsWidth;
    const cellsFixedX = this.props.cellsFixedX;
    const onFillCellWidth = this.props.onFillCellWidth;
    const onFillLeftBorderArray = this.props.onFillLeftBorderArray;

    let scrollLeft = 0;
    let tableLeftBorder = 0;

    // j нужна для нумерования фиксированных столбцов, i - для всех столбцов
    let j = -1;
    let z = -1;

    if (children !== undefined) {
      if (!Array.isArray(children)) {
        children = Array.of(children);
      }
      rows.push(
        children.map((el, i) => {
          if (el !== null) {
            if ((el.type === 'th') || (el.type === 'td')) {
              z++;
              if (el.props.className === 'col-fixed') {
                scrollLeft = this.props.scrollLeft;
                tableLeftBorder = this.props.tableLeftBorder;
                j++;
              }
              return <Cell className={el.type}
                           isFixed={el.props.className}
                           key={z}
                           i={z}
                           num={j}
                           tableLeftBorder={tableLeftBorder}
                           cellsWidth={cellsWidth}
                           cellsFixedX={cellsFixedX}
                           onFillCellWidth={onFillCellWidth}
                           onFillLeftBorderArray={onFillLeftBorderArray}
                           scrollLeft={scrollLeft}>
                {el.props.children}
              </Cell>
            }
            return el
          }
        })
      );
    }

    return <div className={className}>
      {rows}
    </div>
  }
}

export default Row;
