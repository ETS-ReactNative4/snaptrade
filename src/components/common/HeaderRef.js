import React, { Component } from 'react';

class HeaderRef extends Component {
  render() {
    return (
      <div ref={(div) => { this.refDiv = div; }}></div>
    );
  }

  componentDidMount() {
    this.props.onHeaderMount(this.refDiv)
  }
}

export default HeaderRef;
