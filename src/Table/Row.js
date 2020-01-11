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

    let scroll = {
      top: 0,
      left: 0,
    };

    if (this.state.isFixed === 'row-fixed') {
      scroll = this.props.scroll;
      //scrollTop = this.props.tableRef.current.scrollTop;
      //console.log(this.props.tableRef);
    }

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

    return <div className={className} style={{top: scroll.top}}>
      {rows}
    </div>
  }
}

export default Row;
