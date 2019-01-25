import React from 'react';
import MainTickerTable from '../widgets/table/MainTickerTable.js';
import SpinnerUI from '../widgets/SpinnerUI.js'

const OthersTickersPanelUI = ({context, othersTickerList}) =>
  <div>
    <h3 className="panelTitle">Swing Trades from members</h3>
    <MainTickerTable
      context={context}
      tickerList={othersTickerList}
      columnList={new Set(['trade_status', 'comments', '3d_change_pct', 'target_buy_price', 'buy_price', 'buy_date', 'sale_price', 'gain_pct', 'like'])}
    />
  </div>


export default OthersTickersPanelUI;
