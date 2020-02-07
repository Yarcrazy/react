import React from 'react';
import Cell from "./Cell";

class FixedRow extends React.Component {

  ref;

  constructor(props) {
    super(props);
    this.state = {
      isRowAbsolute: false,
    }
  }

  componentDidMount() {
    const rowRect = this.ref.current.getBoundingClientRect();
    this.props.onChangeFixedRowBottom(rowRect.height);
  }

  render() {
    let rows = [];
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    const children = this.props.children;
    this.ref = React.createRef();

    let top = 0;
    let scrollLeft = 0;
    let tableLeftBorder = 0;
    let onChangeBorder;

    // if (this.ref) {
    //   this.ref.current.scrollLeft = this.props.scrollLeft;
    // document.querySelector('.row-fixed').scrollLeft = this.props.scrollLeft;
    // }
    const rowFixed = document.querySelector('.row-fixed');
    if (rowFixed) {
      //console.log(document.querySelector('.row-fixed').scrollLeft);
      rowFixed.scrollLeft = this.props.scrollLeft;
    }

    if (this.props.isFixed === 'row-fixed') {
      if (this.props.scrollTop !== 0) {
        className += ' fixed';
        top = this.props.tableTopBorder;
        if (!this.state.isRowAbsolute) {
          this.setState({
            isRowAbsolute: true,
          });
          this.props.onRowAbsolute(true);
        }
      } else {
        if (this.state.isRowAbsolute) {
          this.setState({
            isRowAbsolute: false,
          });
          this.props.onRowAbsolute(false);
        }
      }
      //scrollTop = this.props.scrollTop;
      //scrollTop = this.props.tableRef.current.scrollTop;
      //console.log(this.props.tableRef);
    }

    let j = -1;
    rows.push(
      children.map((el, i) => {
          if (el.props.className === 'col-fixed') {
            if (this.props.isFixed === 'row-fixed') {
              onChangeBorder = this.props.onChangeBorder;
            }
            scrollLeft = this.props.scrollLeft;
            tableLeftBorder = this.props.tableLeftBorder;
            j++;
          }
          return <Cell className={el.type}
                       isFixed={el.props.className}
                       key={i}
                       num={j}
                       tableLeftBorder={tableLeftBorder}
                       onChangeBorder={onChangeBorder}
                       scrollLeft={scrollLeft}>
            {el.props.children}
          </Cell>
        }
      )
    );

    return <div className={className} style={{top: top}} ref={this.ref}>
      {rows}
    </div>
  }
}

export default FixedRow;
