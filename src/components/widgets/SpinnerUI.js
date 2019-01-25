import React from 'react';
import { DotLoader } from 'react-spinners';

const SpinnerUI = () =>
  <div style={loaderCont}>
    <DotLoader
      color='#64b5f6'
      loading={true}
    />
  </div>

const loaderCont = {
  height : '320px',
  width : '320px',
  padding : '120px 150px 150px 150px',
  margin : 'auto'
}

export default SpinnerUI
