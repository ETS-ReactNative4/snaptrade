import React from 'react';
import {OverlayTrigger, Panel, Popover, Glyphicon} from 'react-bootstrap';
import SectorSelectBoxUI from './SectorSelectBoxUI.js';
import PriceRangeSelectBoxUI from './PriceRangeSelectBoxUI.js';
import VolumeRangeSelectBoxUI from './VolumeRangeSelectBoxUI.js';
import DaysPassedSelectBoxUI from './DaysPassedSelectBoxUI.js';
import MainTickerTable from '../widgets/table/MainTickerTable.js';

//- Top gainers of stocks that were flagged by technical scan in the last 21 days

const GainPanelUI = ({
                         context, runDate, runTime, gainList,
                         // price filter
                         priceRangeList, selectedPriceRangeId, onPriceRangeChange,
                         // volume filter
                         volumeRangeList, selectedVolumeRangeId, onVolumeRangeChange,
                         // sector filter
                         sectorList, selectedSectorId, onSectorChange,
                         ageRangeList, selectedAgeRangeId, onAgeRangeChange,
                         onRowSignalClick, onRowWatchClick, onScrollToSignUp,
                         sortColumn, sortOrder, onSort
                     }) =>
    <div className="tmargin20">

        <h3 className="panelTitle">
            Discover new potential winning stocks &nbsp;
            <OverlayTrigger trigger={['hover', 'focus']} placement="top"
                            overlay={<Popover id="signal_strength">Portfolio is based on $10k paper money is used to buy
                                each stock when it was added to the watchlist</Popover>}>
                <Glyphicon glyph="info-sign" className='text-muted'/>
            </OverlayTrigger>
        </h3>

        <ul className="filtersBar">
            <li><SectorSelectBoxUI
                sectorList={sectorList}
                selectedSectorId={selectedSectorId}
                onSectorChange={onSectorChange}/></li>
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
        <div className="clearfix"/>
        <MainTickerTable
            context={context}
            tickerList={gainList}
            columnList={new Set(['name', , 'sector', 'volume', 'volume_chg', '3d_change_pct', '14d_change_pct'])}
        />

        <strong>*Price and Volume data may not show or show incorrectly due to the following factors</strong>
        <ul className="starpoints">
            <li>The data may not be available for stocks are Canada listed [ex: T.LEAF].</li>
            <li>For weekends change columns show up as zero.</li>
            <li>Stock splits may cause high fluctuations for price and volume columns.</li>
        </ul>

    </div>

export default GainPanelUI;
