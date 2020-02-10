import React from 'react';

class Cell extends React.Component {

  ref;

  constructor(props) {
    super(props);
    this.state = {
      fixFlag: false,
    }
  }

  componentDidMount() {
    const rect = this.ref.current.getBoundingClientRect();
    if (this.props.isFixed === 'col-fixed') {
      this.props.onFillLeftBorderArray(rect.x, this.props.num);
    }
    this.props.onFillCellWidth(rect.width, this.props.i);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log(this.ref.current.getBoundingClientRect().width);
  //   if (this.ref.current.getBoundingClientRect().width > this.props.cellsWidth[this.props.i]) {
  //     this.props.onFillCellWidth(this.ref.current.getBoundingClientRect().width, this.props.i);
  //     this.setState({width: this.props.cellsWidth[this.props.i]});
  //   }
  // }

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