import * as React from "react/cjs/react.development";

class Table extends React.Component {

  render() {
    const rows = [];
    let className = '';

    if (typeof this.props.children === "string") {
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

    className += this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    return (
      <div className={className}>
        {rows}
      </div>
    );
  }
}

export default Table;