import React from 'react';
import { Glyphicon, OverlayTrigger } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import ToolTipUI from '../ToolTipUI.js'

const HeaderCellUI = ({label1, label2, align, tooltip, tooltipId, tooltip2}) =>
  <th className={align}>
    <span>
      <span className='text-nowrap'>{label1}</span>
      { label2 && <br/> }
      { label2 && <span>{label2}</span> }
    </span>
    { tooltip && <span>{' '}</span> }
    { tooltip2 && <span>{' '}</span> }
    {
      tooltip &&
      <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltip}>
        <Glyphicon glyph="info-sign" className='text-muted' />
      </OverlayTrigger>
    }
    {
      tooltip2 &&
      <ToolTipUI tooltipId={tooltipId} tooltip={tooltip2} />
    }
  </th>

export default HeaderCellUI;
