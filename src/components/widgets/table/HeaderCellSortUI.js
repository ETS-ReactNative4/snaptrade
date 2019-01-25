import React from 'react';
import { Glyphicon, OverlayTrigger } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import ToolTipUI from '../ToolTipUI.js'

const HeaderCellSortUI = ({label1, label2, columnCode, align, tooltip, tooltipId, tooltip2, onSort, sortColumn, sortOrder}) =>
<th className={align}>
  {
    columnCode &&
    <a href='#sort' onClick={onSort} data-column={columnCode} data-order={sortOrder}>
      <span className={label2 && 'text-nowrap'} onClick={onSort} data-column={columnCode} data-order={sortOrder}>
        {
          sortColumn === columnCode && sortOrder === 'asc' &&
          <Glyphicon glyph="chevron-down" className='text-muted' />
        }
        {
          sortColumn === columnCode && sortOrder === 'desc' &&
          <Glyphicon glyph="chevron-up" className='text-muted' />
        }
        {' '}{label1}
      </span>
      { label2 && <br/> }
      {label2}
    </a>
  }
  {
    !columnCode &&
    <span>
      <span className='text-nowrap'>{label1}</span>
      { label2 && <br/> }
      { label2 && <span>{label2}</span> }
    </span>
  }
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

export default HeaderCellSortUI;
