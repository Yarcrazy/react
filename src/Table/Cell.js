import React from 'react';

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
    }
  }

  render() {
    let rows = this.props.children;
    return {rows}
  }
}

export default Cell;
