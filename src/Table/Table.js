import React from 'react';
import Row from "./Row";

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
          if (el.type === 'tr') {
            return (<Row className={el.type}
                         isFixed={el.props.className}
                         key={i}>
              {el.props.children}
            </Row>)
          } else {
            return (<Table className={el.type}
                           isFixed={el.props.className}
                           key={i}>
              {el.props.children}
            </Table>)
          }
        })
      );
    } else {
      if (children.type === 'tr') {
        rows.push(
          <Row className={children.type}
               isFixed={children.props.className}
               key={children.type.length}>{children.props.children}
          </Row>)
      } else {
        rows.push(
          <Table className={children.type}
                 isFixed={children.props.className}
                 key={children.type.length}>{children.props.children}
          </Table>
        )
      }
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