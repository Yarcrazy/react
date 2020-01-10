import React from 'react';
import Cell from "./Cell";

class Row extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
    }
  }

  render() {
    let rows = [];
    let className = this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');
    const children = this.props.children;

    rows.push(
      children.map((el, i) => {
          return <Cell className={el.type}
                       isFixed={el.props.className}
                       key={i}>
            {el.props.children}
          </Cell>
        }
      )
    );

    return <div className={className}>
      {rows}
    </div>
  }
}

export default Row;
