import React from 'react';
import { Glyphicon } from 'react-bootstrap';

// note: children is a special props
const FoldUnfoldCellUI = ({id, folded, onFold, onUnfold, children}) =>
  <td>
    <span className='text-nowrap'>
      <a href='/#/_' onClick={folded ? onUnfold : onFold}
        style={{'textDecoration':'none'}}>
        {
          folded &&
          <Glyphicon glyph="triangle-right" data-id={id} />
        }
        {
          ! folded &&
          <Glyphicon glyph="triangle-bottom" data-id={id} />
        }
        {' '}
        <span data-id={id}>
          {children}
        </span>
      </a>
    </span>
  </td>

export default FoldUnfoldCellUI;
