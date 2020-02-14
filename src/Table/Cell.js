import React from 'react';

class Cell extends React.Component {

  ref;

  constructor(props) {
    super(props);
    this.state = {
      fixFlag: false,
      colSpan: 1,
    }
  }

  componentDidMount() {
    const rect = this.ref.current.getBoundingClientRect();
    const colSpan = this.props.colSpan ? this.props.colSpan : this.state.colSpan;
    if (this.props.isFixed === 'col-fixed') {
      this.props.onFillLeftBorderArray(rect.x, this.props.num);
    }
    // если есть аргумент colspan и это натуральное число
    if ((colSpan > 0) && (colSpan % 1 === 0)) {
      this.setState({colSpan: colSpan});
    }
    this.props.onFillCellWidth(rect.width, this.props.i, colSpan);
  }

  render() {
    this.ref = React.createRef();
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    let cellLeft = 0;
    let width = this.props.cellsWidth[this.props.i];
    const num = this.props.num;

    if ((this.props.tableLeftBorder) && (this.props.isFixed === 'col-fixed')) {

      if ((this.props.scrollLeft >= this.props.cellsFixedX[num] - this.props.tableLeftBorder[num])) {
        if (!this.state.fixFlag) {
          this.setState({fixFlag: true});
          if (this.props.onChangeBorder) {
            this.props.onChangeBorder(this.props.tableLeftBorder[num] + width);
          }
        }
      } else {
        if (this.state.fixFlag) {
          this.setState({fixFlag: false});
          cellLeft = 0;
        }
      }

      if (this.state.fixFlag) {
        cellLeft = this.props.scrollLeft - this.props.cellsFixedX[num] + this.props.tableLeftBorder[num];
      }
    }

    return <div className={className} style={{left: cellLeft, minWidth: width}} ref={this.ref}>
      {this.props.children}
    </div>
  }
}

export default Cell;