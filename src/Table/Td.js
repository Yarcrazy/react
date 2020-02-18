import React from 'react';
import TableContext from "./TableContext";

class Td extends React.Component {

  ref;

  constructor(props) {
    super(props);
    this.state = {
      fixFlag: false,
    }
  }

  componentDidMount() {
    const rect = this.ref.current.getBoundingClientRect();
    if (this.props.className === 'col-fixed') {
      this.context.onFillLeftBorderArray(rect.x, this.props.num);
    }
    this.context.onFillCellWidth(rect.width, this.props.i);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.children !== this.props.children) {
  //     const rect = this.ref.current.getBoundingClientRect();
  //     // if (this.props.isFixed === 'col-fixed') {
  //     //   this.props.onFillLeftBorderArray(rect.x, this.props.num);
  //     // }
  //     this.props.onFillCellWidth(rect.width, this.props.i);
  //   }
  // }

  render() {
    this.ref = React.createRef();
    const children = this.props.children;
    const className = 'td ' + (this.props.className ? this.props.className : '');
    let cellLeft = 0;
    let width = this.context.cellsWidth[this.props.i];
    //const num = this.props.num;

    // if ((this.props.tableLeftBorder) && (this.props.isFixed === 'col-fixed')) {
    //
    //   if ((this.props.scrollLeft >= this.props.cellsFixedX[num] - this.props.tableLeftBorder[num])) {
    //     if (!this.state.fixFlag) {
    //       this.setState({fixFlag: true});
    //       if (this.props.onChangeBorder) {
    //         this.props.onChangeBorder(this.props.tableLeftBorder[num] + width);
    //       }
    //     }
    //   } else {
    //     if (this.state.fixFlag) {
    //       this.setState({fixFlag: false});
    //       cellLeft = 0;
    //     }
    //   }
    //
    //   if (this.state.fixFlag) {
    //     cellLeft = this.props.scrollLeft - this.props.cellsFixedX[num] + this.props.tableLeftBorder[num];
    //   }
    // }

    return <div className={className} style={{left: cellLeft, width: width}} ref={this.ref}>
      {children}
    </div>
  }
}

Td.contextType = TableContext;

export default Td;