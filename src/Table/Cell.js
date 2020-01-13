import React from 'react';

class Cell extends React.Component {

  ref;
  cellLeft = 0;
  fixFlag = false;

  componentDidUpdate(prevProps) {
    if (this.props.isFixed === 'col-fixed') {
      let tableLeftBorder = this.props.tableRect.x;
      let cellLeftBorder = this.ref.current.getBoundingClientRect().x;
      if (cellLeftBorder <= tableLeftBorder) {
        //this.cellLeft = this.props.scrollLeft - this.state.defaultCellLeftBorder + tableLeftBorder;
        this.fixFlag = prevProps.scrollLeft !== this.props.scrollLeft;
      }
      // if (cellLeftBorder >= this.state.defaultCellLeftBorder) {
      //   this.cellLeft = 0;
      // }
      if (this.fixFlag === true) {
        this.cellLeft = tableLeftBorder - this.state.defaultCellLeftBorder + this.props.scrollLeft;
        console.log(this.cellLeft);
      }
      if ((prevProps.scrollLeft > this.props.scrollLeft) && (this.fixFlag === true) && (tableLeftBorder < this.state.defaultCellLeftBorder)) {
        this.cellLeft = 0;
      }
    }
  }

  componentDidMount() {
    if (this.props.isFixed === 'col-fixed') {
      this.setState({defaultCellLeftBorder: this.ref.current.getBoundingClientRect().x});
    }
  }

  render() {
    this.ref = React.createRef();
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');

    if (this.fixFlag === true) {
      //cellLeft = this.props.scrollLeft;
    }

    return <div className={className} style={{left: this.cellLeft}} ref={this.ref}>
      {this.props.children}
    </div>
  }
}

export default Cell;
