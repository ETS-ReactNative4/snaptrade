import React from 'react';
import WatchListPanel from '../components/watchlist/WatchListPanel.js'

const WatchListPageUI = props =>
  <div>
    <div className="container">
      {
        ! props.embeddableTagUuid && false &&
          <h3 className="panelTitle">Watchlist - Track with insights</h3>
      }

      {/*
      <SectorSelectBoxUI
        sectorList={props.sectorList}
        sectorId={props.sectorId}
        onSectorChange={props.onSectorChange} />
      <TickerSearchBoxUI
        ticker={props.ticker}
        onTickerChange={props.onTickerChange} />
      <div className='clearfix'><br/><br/></div>
      */}
      <WatchListPanel
        context={props.context}
        anonymous={props.anonymous}
        ticker={props.ticker}
        sectorId={props.sectorId}
        runTime={props.runTime}
        embeddableTagUuid={props.embeddableTagUuid}
      />
    </div>
  </div>

export default WatchListPageUI;
