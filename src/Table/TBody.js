import React from 'react';
import Row from "./Row";

class TBody extends React.Component {

  render() {
    const rows = [];
    const children = this.props.children;
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

    rows.push(
      children.map((el, i) => {
        return <Row className={el.type}
                    isFixed={el.props.className}
                    key={i}
                    tableLeftBorder={tableLeftBorder}
                    onFillCellWidth={onFillCellWidth}
                    onFillLeftBorderArray={onFillLeftBorderArray}
                    cellsWidth={cellsWidth}
                    cellsFixedX={cellsFixedX}
                    scrollLeft={scrollLeft}>
          {el.props.children}
        </Row>
      })
    );

    className += this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');

    return (
      <div className={className}>
        {rows}
      </div>
    );
  }
}

export default TBody;