import React from 'react';
import { Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap';

const ToolTipUI = ({tooltipId, tooltip}) =>
  <span>
  {
    tooltip &&
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="top"
      overlay={<Popover id={tooltipId}><span>{tooltip}</span></Popover>}
      >

      <Glyphicon glyph="info-sign" className='text-muted' />
    </OverlayTrigger>
  }
  </span>

export default ToolTipUI;
