import React from 'react';
import Cell from "./Cell";

class FixedRow extends React.Component {

  render() {
    let rows = [];
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    let children = this.props.children;

    let scrollLeft = 0;
    let tableLeftBorder = 0;
    let onChangeBorder;
    const onFillCellWidth = this.props.onFillCellWidth;
    const onFillLeftBorderArray = this.props.onFillLeftBorderArray;
    const cellsWidth = this.props.cellsWidth;
    const cellsFixedX = this.props.cellsFixedX;

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
            let type = el.type;
            let className = el.props.className;
            if (typeof type === 'function') {
              type = type().type;
              className = el.type().props.className;
            }
            if ((type === 'th') || (type === 'td')) {
              z++;
              if (className === 'col-fixed') {
                onChangeBorder = this.props.onChangeBorder;
                scrollLeft = this.props.scrollLeft;
                tableLeftBorder = this.props.tableLeftBorder;
                j++;
              }
              return <Cell className={type}
                           isFixed={className}
                           key={z}
                           i={z}
                           num={j}
                           tableLeftBorder={tableLeftBorder}
                           onChangeBorder={onChangeBorder}
                           onFillCellWidth={onFillCellWidth}
                           onFillLeftBorderArray={onFillLeftBorderArray}
                           cellsWidth={cellsWidth}
                           cellsFixedX={cellsFixedX}
                           scrollLeft={scrollLeft}>
                {el.props.children}
              </Cell>
            }
          }
          return el
        })
      );
    }

    return <div className={className}>
      {rows}
    </div>
  }
}

export default FixedRow;
