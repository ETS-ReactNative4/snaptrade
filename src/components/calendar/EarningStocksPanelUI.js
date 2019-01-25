import React from 'react';
import MainTickerTable from '../widgets/table/MainTickerTable.js';
import PanelUI from '../widgets/panel/PanelUI.js'

const EarningStocksPanelUI = ({context, tickerList}) =>
  <PanelUI title='Earning Stocks' wide={true}>
    <MainTickerTable
      context={context}
      tickerList={tickerList}
      columnList={new Set(['pe_ratio', 'market_cap', 'off_52wk_high'])}
      narrow='chartOnly'
    />
  </PanelUI>

export default EarningStocksPanelUI;
