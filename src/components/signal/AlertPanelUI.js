import React from 'react';
import { Panel } from 'react-bootstrap';
// import AlertTable from './AlertTable.js';
import RuleSelectBoxUI from './RuleSelectBoxUI.js';
import SectorSelectBoxUI from './SectorSelectBoxUI.js';
import PriceRangeSelectBoxUI from './PriceRangeSelectBoxUI.js';
import VolumeRangeSelectBoxUI from './VolumeRangeSelectBoxUI.js';
import BullishBearishSelectBoxUI from './BullishBearishSelectBoxUI.js';
import MainTickerTable from '../widgets/table/MainTickerTable.js';

const AlertPanelUI = ({context, signalList, runDate, runTime,
    // price filter
    priceRangeList, selectedPriceRangeId, onPriceRangeChange,
    // volume filter
    volumeRangeList, selectedVolumeRangeId, onVolumeRangeChange,
    // sector filter
    sectorList, selectedSectorId, onSectorChange,
    // trend filter
    trend, onTrendChange,
    // rule filter
    ruleList, selectedRuleId, onRuleChange}) =>
  <div>
  <h3 className="panelTitle" style={{display: 'inline-block'}}>Discover New Stocks {/*<span className='text-muted small'>{runDate}</span>*/}</h3>

  <div className='pull-right'>
    <a href='https://www.youtube.com/watch?v=EIF4tDkaOc0&t=2s' target='_blank'>
    Watch Video <span className="glyphicon glyphicon-facetime-video"></span>
    </a>
  </div>

  <div className='clearfix'></div>


<ul className="filtersBar">
    <li><RuleSelectBoxUI
      trend={trend}
      ruleList={ruleList}
      selectedRuleId={selectedRuleId}
      onRuleChange={onRuleChange}
    /></li>
    <li><BullishBearishSelectBoxUI
      trend={trend}
      onTrendChange={onTrendChange}
    /></li>
    <li><SectorSelectBoxUI
      sectorList={sectorList}
      selectedSectorId={selectedSectorId}
      onSectorChange={onSectorChange} /></li>
    <li><VolumeRangeSelectBoxUI
      volumeRangeList={volumeRangeList}
      selectedVolumeRangeId={selectedVolumeRangeId}
      onVolumeRangeChange={onVolumeRangeChange}
    /></li>
    <li><PriceRangeSelectBoxUI
      priceRangeList={priceRangeList}
      selectedPriceRangeId={selectedPriceRangeId}
      onPriceRangeChange={onPriceRangeChange}
    /></li>
</ul>

    <div className='clearfix'></div>

    <div className='video-wrapper discovery-help-video'>
    <iframe  className={context.showHelp ? 'visible' : "hidden"}  data-tag-id="helpVideo" src="https://www.youtube.com/embed/EIF4tDkaOc0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

    <MainTickerTable
      context={context}
      tickerList={signalList}
      columnList={new Set(['name', 'volume', 'volume_chg', 'signal_strength', 'signal_name', '3d_change_pct', '14d_change_pct'])}
    />
  </div>

export default AlertPanelUI;
