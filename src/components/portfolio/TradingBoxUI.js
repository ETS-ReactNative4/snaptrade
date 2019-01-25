import React from 'react';
import PanelUI from '../widgets/panel/PanelUI.js'

const TradingBoxUI = ({ticker, quantity,
    onTickerEdit, onQuantityEdit,
    tradingSuccess, tradingError,
    onBuySubmit, onSellSubmit}) =>
  <PanelUI>
    <form className="form-inline">

      <div className="form-group">
        <input type="text" size='12' className="form-control" placeholder="Ticker"
          value={ticker} onChange={onTickerEdit} />
      </div>{' '}

      <div className="form-group">
        <input type="text" size='12' className="form-control" placeholder="Quantity"
          value={quantity} onChange={onQuantityEdit} />
      </div>{' '}

      <button type="submit" className="btn btn-primary" onClick={onBuySubmit}>
        Buy
      </button>{' '}

      <button type="submit" className="btn btn-warning" onClick={onSellSubmit}
        style={{'fontSize':'16px','borderRadius':'18px','fontWeight':'700','padding':'5px 25px'}}
      >
        Sell
      </button>
    </form>
    {
      tradingSuccess &&
      <p className='text-success'>{tradingSuccess}</p>
    }
    {
      tradingError &&
      <p className='text-danger'>{tradingError}</p>
    }
    <br/>
    <span className='text-muted'>
    Buy and sell stocks anytime 24 hours.
    During trading hours realtime price will be applied
    and during off hours, market close price will be applied
    </span>
  </PanelUI>

export default TradingBoxUI;
