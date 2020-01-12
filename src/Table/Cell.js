import React from 'react';

class Cell extends React.Component {

  ref;
  scrollLeft = 0;

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
    }
  }

  componentDidUpdate() {
    if (this.state.isFixed === 'col-fixed') {
      let tableLeftBorder = this.props.tableRect.x;
      let tableRightBorder = this.props.tableRect.right;
      let cellLeftBorder = this.ref.current.getBoundingClientRect().x;
      let cellRightBorder = this.ref.current.getBoundingClientRect().right;
      if (cellLeftBorder <= tableLeftBorder) {
        this.scrollLeft = this.props.scrollLeft - this.state.defaultCellLeftBorder + tableLeftBorder;
      }
      // TODO магическое число!!! да и вообще все нахрен переделать!
      if (cellRightBorder - 50 >= tableRightBorder) {
        this.scrollLeft = this.props.scrollLeft + this.state.defaultCellRightBorder - tableLeftBorder;
      }
      //scrollLeft = this.props.scrollLeft;
    }
  }

  componentDidMount() {
    if (this.state.isFixed === 'col-fixed') {
      this.setState({defaultCellLeftBorder: this.ref.current.getBoundingClientRect().x});
      this.setState({defaultCellRightBorder: this.ref.current.getBoundingClientRect().right});
    }
  }

  render() {
    this.ref = React.createRef();
    let className = this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');

    if (this.state.isFixed === 'col-fixed') {
      //scrollLeft = this.props.scrollLeft;
    }

    return <div className={className} style={{left: this.scrollLeft}} ref={this.ref}>
      {this.props.children}
    </div>
  }
}

export default Cell;
