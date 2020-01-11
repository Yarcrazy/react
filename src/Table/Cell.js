import React from 'react';

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
    }
  }

  render() {
    let className = this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');
    return <div className={className}>
      {this.props.children}
    </div>
  }
}

export default Cell;
