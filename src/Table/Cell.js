import React from 'react';

class Cell extends React.Component {

  ref;

  constructor(props) {
    super(props);
    this.state = {
      fixFlag: false,
    }
  }

  componentDidUpdate() {
    // if (this.props.isFixed === 'col-fixed') {
    //   let tableLeftBorder = this.props.tableLeftBorder;
    //   let cellLeftBorder = this.ref.current.getBoundingClientRect().x;
    //
    //   // если фиксированная колонка заехала за край таблицы и флаг неактивен
    //   if ((cellLeftBorder <= tableLeftBorder) && !this.fixFlag) {
    //     //this.cellLeft = this.props.scrollLeft - this.state.defaultCellLeftBorder + tableLeftBorder;
    //     this.fixFlag = true;
    //   }
    //
    //   if (this.fixFlag) {
    //     this.cellLeft = tableLeftBorder - this.state.defaultCellLeftBorder + this.props.scrollLeft;
    //     //console.log(this.cellLeft);
    //   }
    //
    //   // если фиксированная колонка проехала изначальную позицию
    //   if ((cellLeftBorder < this.state.defaultCellLeftBorder - this.props.scrollLeft) && this.fixFlag) {
    //     this.cellLeft = 0;
    //     this.fixFlag = false;
    //   }
    // }
  }

  componentDidMount() {
    if (this.props.isFixed === 'col-fixed') {
      this.setState({defaultCellLeftBorder: this.ref.current.getBoundingClientRect().x});
    }
  }

  render() {
    this.ref = React.createRef();
    let className = this.props.className + ' ' + (this.props.isFixed ? this.props.isFixed : '');
    let cellLeft = 0;

    if ((this.props.tableLeftBorder) && (this.props.isFixed === 'col-fixed')) {
      console.log(this.props.tableLeftBorder);

      if ((this.props.scrollLeft >= this.state.defaultCellLeftBorder - this.props.tableLeftBorder)) {
        if (!this.state.fixFlag) {
          this.setState({fixFlag: true});
        }
      } else {
        if (this.state.fixFlag) {
          this.setState({fixFlag: false});
          cellLeft = 0;
        }
      }

      if (this.state.fixFlag) {
        cellLeft = this.props.scrollLeft - this.state.defaultCellLeftBorder + this.props.tableLeftBorder;
      }
    }

    return <div className={className} style={{left: cellLeft}} ref={this.ref}>
      {this.props.children}
    </div>
  }
}

export default Cell;
