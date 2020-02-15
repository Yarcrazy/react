import React from 'react';
import Row from "./Row";

class TBody extends React.Component {

  render() {
    const rows = [];
    let children = this.props.children;
    let className = '';

    const scrollLeft = this.props.scrollLeft;
    const tableLeftBorder = this.props.tableLeftBorder;
    const cellsFixedX = this.props.cellsFixedX;
    const cellsWidth = this.props.cellsWidth;
    const onFillCellWidth = this.props.onFillCellWidth;
    const onFillLeftBorderArray = this.props.onFillLeftBorderArray;

    // const tBody = document.querySelector('.tBody');
    // if (tBody) {
    //   tBody.scrollLeft = this.state.scrollLeft;
    // }
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
            if (type === 'tr') {
              return <Row className={type}
                          isFixed={className}
                          key={i}
                          tableLeftBorder={tableLeftBorder}
                          onFillCellWidth={onFillCellWidth}
                          onFillLeftBorderArray={onFillLeftBorderArray}
                          cellsWidth={cellsWidth}
                          cellsFixedX={cellsFixedX}
                          scrollLeft={scrollLeft}>
                {el.props.children}
              </Row>
            }
          }
          return el
        })
      );
    }

    className += this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');

    return (
      <div className={className}>
        {rows}
      </div>
    );
  }
}

export default TBody;