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

    let scrollTop = 0;
    let scrollLeft = 0;

    if (this.state.isFixed === 'row-fixed') {
      scrollTop = this.props.scrollTop;
      //scrollTop = this.props.tableRef.current.scrollTop;
      //console.log(this.props.tableRef);
    }

    rows.push(
      children.map((el, i) => {
          if (el.props.className === 'col-fixed') {
            scrollLeft = this.props.scrollLeft;
          }
          return <Cell className={el.type}
                       isFixed={el.props.className}
                       key={i}
                       scrollLeft={scrollLeft}>
            {el.props.children}
          </Cell>
        }
      )
    );

    return <div className={className} style={{top: scrollTop}}>
      {rows}
    </div>
  }
}

export default Row;
