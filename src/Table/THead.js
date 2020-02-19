import React from 'react';
import {TableContext} from "./Context";

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
    this.context.onChangeFixedRowBottom(rect.height);
    this.setState({width: rect.width});
  }

  render() {
    const children = this.props.children;
    let className = 'thead ' + (this.props.className ? this.props.className : '');
    this.ref = React.createRef();
    let top = 0;

    if (this.props.className === 'fixed') {
      if (this.context.isScrolledTop) {
        className += ' absolute';
        top = this.context.tableTopBorder;
      }
    }

    const headFixed = document.querySelector('.fixed');
    if (headFixed) {
      headFixed.scrollLeft = this.context.scrollLeft;
    }

    return (
      <div className={className} style={{top: top, width: this.state.width}} ref={this.ref}>
        {children}
      </div>
    );
  }
}

THead.contextType = TableContext;

export default THead;