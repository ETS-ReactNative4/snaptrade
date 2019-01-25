import React from 'react';

const MegaphonePanelUI = ({message}) =>
<div>
  {
    message &&
    <div className="alert alert-warning" style={{marginBottom: '10px'}}>{message}</div>
  }
</div>


export default MegaphonePanelUI;
