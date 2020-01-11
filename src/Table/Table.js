import React from 'react';
import Row from "./Row";

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
      scroll: {
        top: 0,
        left: 0,
      },
    }
  }

  handleScroll = (e) => {
    if (this.props.className === 'table') {
      this.setState({
        scroll: {
          top: e.target.scrollTop,
          left: e.target.scrollLeft,
        }
      });
    }
  };

  render() {
    const rows = [];
    const children = this.props.children;
    let className = '';

    const tableRef = (this.props.className === 'table') ? React.createRef() : '';

    let scroll = this.props.scroll;
    if (this.props.className === 'table') {
        scroll = this.state.scroll;
    }

    if (Array.isArray(children)) {
      rows.push(
        children.map((el, i) => {
          if (el.type === 'tr') {
            return (<Row className={el.type}
                         isFixed={el.props.className}
                         key={i}
                         scroll={scroll}>
              {el.props.children}
            </Row>)
          } else {
            return (<Table className={el.type}
                           isFixed={el.props.className}
                           key={i}
                           scroll={scroll}>
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
               key={children.type.length}
               scroll={scroll}>{children.props.children}
          </Row>)
      } else {
        rows.push(
          <Table className={children.type}
                 isFixed={children.props.className}
                 key={children.type.length}
                 scroll={scroll}>{children.props.children}
          </Table>
        )
      }
    }

    className += this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');
    //TODO можно использовать classNames
    return (
      <div className={className} ref={tableRef} onScroll={this.handleScroll}>
        {rows}
      </div>
    );
  }
}

export default Table;