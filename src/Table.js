import React from 'react';

class Table extends React.Component {

  tableRef;

  constructor(props) {
    super(props);
    this.state = {
      isFixed: props.isFixed,
      scrollTop: 0,
    }
  }

  componentDidUpdate() {
    this.setState({scrollTop: this.props.scrollTop})
  }

  handleScroll = () => {
    if (this.props.className === 'table') {
      this.setState({scrollTop: this.tableRef.current.scrollTop});
    }
  };

  render() {
    this.tableRef = (this.props.className === 'table') ? React.createRef() : '';

    console.log(this);
    const rows = [];
    const children = this.props.children;
    let className = '';
    let scrollTop = 0;

    if ((this.state.isFixed === 'row-fixed') && (this.props.className === 'tr')) {
      scrollTop = this.state.scrollTop;
    }
    if ((this.props.className === 'td') || (this.props.className === 'th')) {
      rows.push(children);
      className += 'c-' + (this.props.num + 1) + ' ';
    } else if (Array.isArray(children)) {
      rows.push(
        children.map((el, i) => {
          return <Table className={el.type}
                        isFixed={el.props.className}
                        key={i}
                        num={i}
                        scrollTop={this.state.scrollTop}>{el.props.children}
          </Table>
        })
      );
    } else {
      rows.push(
        <React.Fragment key={'0'}>
          <Table className={children.type}
                 isFixed={children.props.className}
                 key={children.type.length}
                 scrollTop={this.state.scrollTop}>
            {children.props.children}
          </Table>
        </React.Fragment>
      );
    }

    className += this.props.className + ' ' + (this.state.isFixed ? this.state.isFixed : '');
    //TODO можно использовать classNames
    return (
      <div className={className} style={{top: scrollTop}} ref={this.tableRef} onScroll={this.handleScroll}>
        {rows}
      </div>
    );
  }
}

export default Table;