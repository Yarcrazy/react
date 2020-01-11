import React from 'react';

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
    }
  }

  render() {
    let scrollLeft = 0;
    let className = this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');

    // if (this.state.isFixed === 'col-fixed') {
    //   scrollLeft = this.props.scrollLeft;
    // }
    return <div className={className} style={{left: scrollLeft}}>
      {this.props.children}
    </div>
  }
}

export default Cell;
