import React from 'react';
import { connect } from 'react-redux'

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

    if ((this.props.className === 'td') || (this.props.className === 'th')) {
      rows.push(children);
      className += 'c-' + (this.props.num + 1) + ' ';
    } else if (Array.isArray(children)) {
      rows.push(
        children.map((el, i) => {
          // if (el.props.className === 'col-fixed') {
          //
          // }
          return <Table className={el.type}
                        isFixed={el.props.className}
                        key={i}
                        num={i}>{el.props.children}</Table>
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

    // добавляем обработчики событий скролла таблицы
    // if (this.state.isFixed === 'row-fixed') {
    //
    // }


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

const mapStateToProps = store => {
  console.log(store);
  return {
    scroll: store.scroll,
  }
};

export default connect(mapStateToProps)(Table)