import React from 'react';
import SignUpSignInRef from '../components/user/SignUpSignInRef.js';
import WatchlistTickers from '../components/user/WatchlistTickers.js';
import GainPanel from '../components/signal/GainPanel.js';
import AlertPanel from '../components/signal/AlertPanel.js';
import AnnouncePanel from '../components/contest/AnnouncePanel.js';
import TickerSearchBoxUI from '../components/signal/TickerSearchBoxUI.js';
import SectorSelectBoxUI from '../components/signal/SectorSelectBoxUI.js';
import OthersTickersPanel from '../components/watchlist/OthersTickersPanel.js';
import PriceRangeSelectBoxUI from '../components/signal/PriceRangeSelectBoxUI.js';
import VolumeRangeSelectBoxUI from '../components/signal/VolumeRangeSelectBoxUI.js';

const SignalsPageUI = props =>
  <div className="container">
    {/*<OthersTickersPanel
      context={props.context}
    />*/}

    <GainPanel
      context={props.context}
      anonymous={props.anonymous}
      runDate={props.runDate}
      runTime={props.runTime}
      ticker={props.ticker}

      filtersUpdated={props.gainsFiltersUpdated}
      minPrice={props.minPrice}
      maxPrice={props.maxPrice}
      minVolume={props.minVolume}
      maxVolume={props.maxVolume}
      maxAge={props.maxAge}
      sectorId={props.sectorId}
      selectedAgeRangeId={props.selectedAgeRangeId}
      // price filter
      priceRangeList={props.priceRangeList}
      selectedPriceRangeId={props.selectedPriceRangeId}
      onPriceRangeChange={props.onPriceRangeChange}
      // volume filter
      volumeRangeList={props.volumeRangeList}
      selectedVolumeRangeId={props.selectedVolumeRangeId}
      onVolumeRangeChange={props.onVolumeRangeChange}
      // sector filter
      sectorList={props.sectorList}
      selectedSectorId={props.selectedSectorId}
      onSectorChange={props.onSectorChange}
      //
      ageRangeList={props.ageRangeList}
      onAgeRangeChange={props.onAgeRangeChange}
      onScrollToSignUp={props.onScrollToSignUp}
    />
    
    {
      props.justSignedUp &&
      <WatchlistTickers
        accessToken={props.accessToken}
        sectorList={props.sectorList}
      />
    }
  </div>

export default SignalsPageUI;
