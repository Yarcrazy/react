import React from 'react';

class TBody extends React.Component {

  render() {
    let children = this.props.children;
    const className = 'tbody ' + (this.props.className ? this.props.className : '');

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

export default TBody;