import React from 'react';
import MainTickerTable from '../widgets/table/MainTickerTable.js';
import PanelUI from '../widgets/panel/PanelUI.js'

const SimilarStocksPanelUI = ({context, tickerList}) =>
    <div>
        <a name="CategoryRankbyMarketCap"/>
        <PanelUI title='Similar Stocks' wide={true}>
            <MainTickerTable
                context={context}
                tickerList={tickerList}
                columnList={new Set(['pe_ratio', 'market_cap', 'off_52wk_high'])}
                narrow='chartOnly'
            />
        </PanelUI>
    </div>;

export default SimilarStocksPanelUI;
