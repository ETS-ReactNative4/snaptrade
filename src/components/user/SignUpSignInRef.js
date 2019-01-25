import React, { Component } from 'react';

class SignUpSignInRef extends Component {
  render() {
    return (
      <div ref={(div) => { this.refDiv = div; }}></div>
    );
  }

  componentDidMount() {
    this.props.onSignUpSignInMount(this.refDiv)
  }
}

export default SignUpSignInRef;
