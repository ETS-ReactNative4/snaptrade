import React from 'react';
import { Glyphicon, OverlayTrigger } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';

const DataCellUI = ({value, details, align}) =>
  <td className={align}>
    <span>
      <span className='text-nowrap'>{value}</span>
      { details && <br/> }
      { details && <small>{details}</small> }
    </span>
  </td>

export default DataCellUI;
