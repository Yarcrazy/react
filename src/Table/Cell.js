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
    if (this.props.isFixed === 'col-fixed') {
      this.setState({defaultCellLeftBorder: this.ref.current.getBoundingClientRect().x,
      width: this.ref.current.getBoundingClientRect().width});
    }
  }

  render() {
    this.ref = React.createRef();
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    let cellLeft = 0;
    const num = this.props.num;

    if ((this.props.tableLeftBorder) && (this.props.isFixed === 'col-fixed')) {

      if ((this.props.scrollLeft >= this.state.defaultCellLeftBorder - this.props.tableLeftBorder[num])) {
        if (!this.state.fixFlag) {
          this.setState({fixFlag: true});
          if (this.props.onChangeBorder) {
            this.props.onChangeBorder(this.props.tableLeftBorder[num] + this.state.width);
          }
        }
      } else {
        if (this.state.fixFlag) {
          this.setState({fixFlag: false});
          cellLeft = 0;
        }
      }

      if (this.state.fixFlag) {
        cellLeft = this.props.scrollLeft - this.state.defaultCellLeftBorder + this.props.tableLeftBorder[num];
      }
    }

    return <div className={className} style={{left: cellLeft}} ref={this.ref}>
      {this.props.children}
    </div>
  }
}

export default Cell;