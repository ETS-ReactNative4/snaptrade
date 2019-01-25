import React from 'react';
import SignUpSignIn from '../components/user/SignUpSignIn.js';
import SignUpSignInRef from '../components/user/SignUpSignInRef.js';
import ChartPanel from '../components/stock/ChartPanel.js';
import WatchlistTickers from '../components/user/WatchlistTickers.js';

const StockPageUI = ({anonymous, justLoggedOut, justSignedUp, accessToken,
    sectorList, clickedTicker, ticker}) =>
  <div>
    <div className="container">
      <ChartPanel anonymous={anonymous} ticker={ticker} />
      {
        anonymous &&
        <SignUpSignIn
          justLoggedOut={justLoggedOut}
          sectorList={sectorList}
          clickedTicker={clickedTicker}
          onLogin={onLogin}
          onSignUp={onSignUp}
        />
      }

      {
        justSignedUp &&
        <WatchlistTickers
          accessToken={accessToken}
          sectorList={sectorList}
        />
      }
    </div>
  </div>

export default StockPageUI;
