import React from 'react';
import FixedRow from "./FixedRow";

class THead extends React.Component {

  ref;

  constructor(props) {
    super(props);
    this.state = {
      width: 'unset',
    }
  }

  componentDidMount() {
    const rect = this.ref.current.getBoundingClientRect();
    this.props.onChangeFixedRowBottom(rect.height);
    this.setState({width: rect.width});
  }

  render() {
    const rows = [];
    let children = this.props.children;
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    this.ref = React.createRef();
    let top = 0;

    const scrollLeft = this.props.scrollLeft;
    const tableLeftBorder = this.props.tableLeftBorder;
    const onFillCellWidth = this.props.onFillCellWidth;
    const onFillLeftBorderArray = this.props.onFillLeftBorderArray;
    const cellsWidth = this.props.cellsWidth;
    const cellsFixedX = this.props.cellsFixedX;
    const tableTopBorder = this.props.tableTopBorder;
    const onChangeBorder = this.props.onChangeBorder;
    const onChangeFixedRowBottom = this.props.onChangeFixedRowBottom;

    if (this.props.isFixed === 'fixed') {
      if (this.props.isScrolledTop) {
        className += ' absolute';
        top = this.props.tableTopBorder;
      }
    }

    const headFixed = document.querySelector('.fixed');
    if (headFixed) {
      headFixed.scrollLeft = this.props.scrollLeft;
    }

    if (children !== undefined) {
      if (!Array.isArray(children)) {
        children = Array.of(children);
      }
      rows.push(
        children.map((el, i) => {
          if (el !== null) {
            if (el.type === 'tr') {
              return <FixedRow className={el.type}
                               isFixed={el.props.className}
                               key={i}
                               tableLeftBorder={tableLeftBorder}
                               tableTopBorder={tableTopBorder}
                               onChangeBorder={onChangeBorder}
                               onChangeFixedRowBottom={onChangeFixedRowBottom}
                               onFillCellWidth={onFillCellWidth}
                               onFillLeftBorderArray={onFillLeftBorderArray}
                               scrollLeft={scrollLeft}
                               cellsFixedX={cellsFixedX}
                               cellsWidth={cellsWidth}>
                {el.props.children}
              </FixedRow>
            }
          }
          return el
        })
      );
    }

    return (
      <div className={className} style={{top: top, width: this.state.width}} ref={this.ref}>
        {rows}
      </div>
    );
  }
}

export default THead;