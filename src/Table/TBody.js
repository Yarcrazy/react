import React from 'react';
import Row from "./Row";

class TBody extends React.Component {

  render() {
    const rows = [];
    const children = this.props.children;
    let className = '';

    const scrollLeft = this.props.scrollLeft;
    const tableLeftBorder = this.props.tableLeftBorder;
    const top = this.props.fixedRowBottom ? this.props.fixedRowBottom : 0;

    // const tBody = document.querySelector('.tBody');
    // if (tBody) {
    //   tBody.scrollLeft = this.state.scrollLeft;
    // }

    rows.push(
      children.map((el, i) => {
        return <Row className={el.type}
             isFixed={el.props.className}
             key={i}
             tableLeftBorder={tableLeftBorder}
             scrollLeft={scrollLeft}>
          {el.props.children}
        </Row>
      })
    );

    className += this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');

    return (
        {rows}
    );
  }
}

export default TBody;