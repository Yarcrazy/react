import React from 'react';
import Cell from "./Cell";

class Tr extends React.Component {

  render() {
    const children = this.props.children;
    const className = 'tr ' + (this.props.className ? this.props.className : '');

    // j нужна для нумерования фиксированных столбцов, i - для всех столбцов
    // let j = -1;
    // let z = -1;
    //
    // if (children !== undefined) {
    //   if (!Array.isArray(children)) {
    //     children = Array.of(children);
    //   }
    //   rows.push(
    //     children.map((el, i) => {
    //       if (el !== null) {
    //         if ((el.type === 'th') || (el.type === 'td')) {
    //           z++;
    //           if (el.props.className === 'col-fixed') {
    //             scrollLeft = this.props.scrollLeft;
    //             tableLeftBorder = this.props.tableLeftBorder;
    //             j++;
    //           }
    //           return <Cell className={el.type}
    //                        isFixed={el.props.className}
    //                        key={z}
    //                        i={z}
    //                        num={j}
    //                        tableLeftBorder={tableLeftBorder}
    //                        cellsWidth={cellsWidth}
    //                        cellsFixedX={cellsFixedX}
    //                        onFillCellWidth={onFillCellWidth}
    //                        onFillLeftBorderArray={onFillLeftBorderArray}
    //                        scrollLeft={scrollLeft}>
    //             {el.props.children}
    //           </Cell>
    //         }
    //         return el
    //       }
    //     })
    //   );
    // }

    return <div className={className}>
      {children}
    </div>
  }
}

export default Tr;
