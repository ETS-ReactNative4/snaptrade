import React from 'react';
import { Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap';

// deprecated, use FoldUnfoldCellUI
const TickerCellUI = ({ticker, id, signalList, onRowTickerClick,
  is_recently_added_to_watchlist, has_signal_today,
  is_price_alert, is_earnings_close, earnings_date
  }) =>
  <td className='text-left'>
    <span className='text-nowrap'>
    <strong>
      <a href='#ticker' className="tickerExpand" onClick={onRowTickerClick}>
        {
          signalList &&
          <Glyphicon glyph="triangle-bottom" data-ticker={ticker} data-id={id} />
        }
        {
          ! signalList &&
          <Glyphicon glyph="triangle-right" data-ticker={ticker} data-id={id} />
        }
        {' '}
        <span data-ticker={ticker} data-id={id}>{ticker}</span>
      </a>
    </strong>
    {
      (is_recently_added_to_watchlist) &&
      <span className="newtag">{' '}new</span>
    }
    {
      has_signal_today &&
      <span>{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay=
          {<Popover id="remove"><span>Technical signal raised today</span></Popover>}
          >
          <span className='glyphicon glyphicon-asterisk'></span>
        </OverlayTrigger>
      </span>
    }
    {
      is_price_alert &&
      <span>{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay=
          {<Popover id="remove"><span>Price alert hit</span></Popover>}
          >
          <Glyphicon glyph="flash" />
        </OverlayTrigger>
      </span>
    }
    {
      is_earnings_close &&
      <span>{' '}
      <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay=
        {<Popover id="remove"><span>Earnings date is near ({earnings_date})</span></Popover>}
        >
        <Glyphicon glyph="usd" />
      </OverlayTrigger>
      </span>
    }
    </span>
  </td>

export default TickerCellUI;
