import React from 'react';

class Cell extends React.Component {

  ref;
  scrollLeft = 0;

  constructor(props) {
    super(props);
    this.state = {
      FixFlag: false,
    }
  }

  componentDidUpdate() {
    if (this.props.isFixed === 'col-fixed') {
      let tableLeftBorder = this.props.tableRect.x;
      let cellLeftBorder = this.ref.current.getBoundingClientRect().x;
      if (cellLeftBorder <= tableLeftBorder) {
        this.scrollLeft = this.props.scrollLeft - this.state.defaultCellLeftBorder + tableLeftBorder;
      }
      if (cellLeftBorder >= this.state.defaultCellLeftBorder) {
        this.scrollLeft = 0;
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

    if (this.props.isFixed === 'col-fixed') {
      //scrollLeft = this.props.scrollLeft;
    }

    return <div className={className} style={{left: this.scrollLeft}} ref={this.ref}>
      {this.props.children}
    </div>
  }
}

export default Cell;
