import React from 'react';
import TickerPopoverUI from '../TickerPopoverUI.js';

// note: children is a special props
const TickerCellPopoverUI = ({ticker}) =>
  <td>
    <TickerPopoverUI ticker={ticker} />
  </td>

export default TickerCellPopoverUI;
