import React from 'react';
import { Grid, Col, Row, Panel } from 'react-bootstrap';
import TagFilterBoxScanner from './TagFilterBoxScanner.js';
import SectorSelectBoxUI from '../signal/SectorSelectBoxUI.js';
import MarketCapSelectBoxUI from '../signal/MarketCapSelectBoxUI.js';
import PeSelectBoxUI from '../signal/PeSelectBoxUI.js';
import PriceSelectBoxUI from '../signal/PriceSelectBoxUI.js';
import PriceLevelSelectBoxUI from '../signal/PriceLevelSelectBoxUI.js';
import PriceRangeSelectBoxUI from '../signal/PriceRangeSelectBoxUI.js';
import VolumeRangeSelectBoxUI from '../signal/VolumeRangeSelectBoxUI.js';
import ThreeDaysTrendSelectBoxUI from '../signal/ThreeDaysTrendSelectBoxUI.js';
import MainTickerTable from '../widgets/table/MainTickerTable.js';

const TickerScannerPanelUI = ({context, tickerList, runDate, runTime,
    // price filter
    priceRangeList, selectedPriceRangeId, onPriceRangeChange,
    // volume filter
    volumeRangeList, selectedVolumeRangeId, onVolumeRangeChange,
    // sector filter
    sectorList, selectedSectorId, onSectorChange,
    // MarketCap filter
    selectedMarketCapId, onMarketCapChange,
    //PE filter
    selectedPEId, onPEChange,
    //Price filter
    selectedPriceId, onPriceChange,
    //Price Level filter
    selectedPriceLevelId, onPriceLevelChange,
    //3days Trend filter
    selected3daysTrendId, on3daysTrendChange,
    // trend filter
    trend, onTrendChange,
    // rule filter
    ruleList, selectedRuleId, onRuleChange,
    // row actions
    onRowTickerClick, onRowWatchClick, onScrollToSignUp,
    // sort props
    sortColumn, sortOrder, onSort,

    filteringTagObj_scanner, tagObjList_scanner, onFilterByTagClick_scanner,
    }) =>

<div>

    <TagFilterBoxScanner
      filteringTagObj_scanner={filteringTagObj_scanner}
      tagObjList_scanner={tagObjList_scanner}
      onFilterByTagClick_scanner={onFilterByTagClick_scanner}
    />

  <div className='clearfix'></div>

    <ul className="filtersBar">
    <li><PeSelectBoxUI
      selectedPEId={selectedPEId}
      onPEChange={onPEChange} /></li>

    <li><MarketCapSelectBoxUI
      selectedMarketCapId={selectedMarketCapId}
      onMarketCapChange={onMarketCapChange} /></li>

    <li><SectorSelectBoxUI
      sectorList={sectorList}
      selectedSectorId={selectedSectorId}
      onSectorChange={onSectorChange} /></li>

    <li><PriceSelectBoxUI
      selectedPriceId={selectedPriceId}
      onPriceChange={onPriceChange} /></li>

    <li><PriceLevelSelectBoxUI
      selectedPriceLevelId={selectedPriceLevelId}
      onPriceLevelChange={onPriceLevelChange} /></li>

    <li><ThreeDaysTrendSelectBoxUI
      selected3daysTrendId={selected3daysTrendId}
      on3daysTrendChange={on3daysTrendChange} /></li>

    </ul>

   <div className='clearfix'></div>

   <div className='video-wrapper scanner-help-video'>
    <iframe className={context.showHelp ? 'visible' : "hidden"}  data-tag-id="helpVideo" src="https://www.youtube.com/embed/WA67WErlWks" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
   </div>

  <MainTickerTable
    context={context}
    tickerList={tickerList}
    columnList={new Set(['name', 'sector', 'volume', 'volume_chg', '3d_change_pct', 'pe_ratio', 'market_cap'])}
  />

  </div>

export default TickerScannerPanelUI;
