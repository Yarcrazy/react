import React from 'react';
import FixedRow from "./FixedRow";

class THead extends React.Component {

  render() {
    const rows = [];
    const children = this.props.children;
    let className = '';

    const scrollLeft = this.props.scrollLeft;
    const tableLeftBorder = this.props.tableLeftBorder;
    const tableTopBorder = this.props.tableTopBorder;
    const onChangeBorder = this.props.onChangeBorder;
    const onChangeFixedRowBottom = this.props.onChangeFixedRowBottom;

    rows.push(
      <FixedRow className={children.type}
                isFixed={children.props.className}
                key={children.type.length}
                tableLeftBorder={tableLeftBorder}
                tableTopBorder={tableTopBorder}
                onChangeBorder={onChangeBorder}
                onChangeFixedRowBottom={onChangeFixedRowBottom}
                scrollLeft={scrollLeft}>
        {children.props.children}
      </FixedRow>
    );

    className += this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');

    return (
      <div className={className}>
        {rows}
      </div>
    );
  }
}

export default THead;