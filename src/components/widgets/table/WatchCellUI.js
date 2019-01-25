import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const WatchCellUI = ({ticker, is_in_watchlist, onRowWatchClick}) =>
  <td className='text-center'>
    { ! is_in_watchlist &&
      <a href='#watch' onClick={onRowWatchClick}>
      <Glyphicon glyph="plus" data-ticker={ticker} /></a>
    }
    { is_in_watchlist &&
      <Glyphicon glyph="ok" />
    }
  </td>

export default WatchCellUI;
