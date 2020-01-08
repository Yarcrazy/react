import React from 'react';
import Cell from "./Cell";

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
    }
  }

  render() {
    const rows = [];
    const children = this.props.children;
    let className = '';

    if (Array.isArray(children)) {
      rows.push(
        children.map((el, i) => {
          if ((el.type === 'td') || (el.type === 'th')) {
            return (<Cell className={el.type}
                         isFixed={el.props.className}
                         key={i}
                         num={i}>
              {el.props.children}
            </Cell>)
          } else {
            return (<Table className={el.type}
                          isFixed={el.props.className}
                          key={i}
                          num={i}>{el.props.children}</Table>)
          }
        })
      );
    } else {
      rows.push(
        <React.Fragment key={'0'}>
          <Table className={children.type}
                 isFixed={children.props.className}
                 key={children.type.length}>{children.props.children}</Table>
        </React.Fragment>
      );
    }

    className += this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');
    //TODO можно использовать classNames
    console.log(this.props);
    return (
      <div className={className}>
        {rows}
      </div>
    );
  }
}

export default Table;