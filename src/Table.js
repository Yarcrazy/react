import React from 'react';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
      //tableParent: null,
    }
  }

  componentDidMount() {
    // if ((this.props.className === 'tr')&&(this.state.isFixed === 'row-fixed')) {
    //   this.setState({tableParent: document.querySelector('.table')});
    // }
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

    className += this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');
    //TODO можно использовать classNames
    console.log(this.props);
    let scrollTop = 0;
    if ((this.props.className === 'tr')&&(this.state.isFixed === 'row-fixed')) {
      //console.log(this.state.tableParent);
      // scrollTop = {
      //   top: document.querySelector('.table').scrollTop,
      // };
    }
    return (
      <div className={className} style={{scrollTop}}>
        {rows}
      </div>
    );
  }
}

export default Table;