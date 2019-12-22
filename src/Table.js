import React from 'react';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: this.props.isFixed,
    }
  }

  render() {
    const rows = [];
    let className = '';

    if ((this.props.className === 'td') || (this.props.className === 'th')) {
      rows.push(this.props.children);
      className += 'c-' + (this.props.num + 1) + ' ';
    } else if (Array.isArray(this.props.children)) {
      rows.push(
          this.props.children.map((el, i) => {
            return <Table className={el.type}
                          isFixed={el.props.className}
                          key={i}
                          num={i}>{el.props.children}</Table>;
          })
      );
    } else {
      rows.push(
        <React.Fragment key={'0'}>
          <Table className={this.props.children.type}
                 isFixed={this.props.children.props.className}
                 key={this.props.children.type.length}>{this.props.children.props.children}</Table>
        </React.Fragment>
      );
    }

    className += this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');
    console.log(this.props);
    return (
      <div className={className}>
        {rows}
      </div>
    );
  }
}

export default Table;