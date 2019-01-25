import React from 'react';
import PageUI from '../components/widgets/PageUI.js';
import WatchList from '../components/dashboard/WatchList.js';
import RecentlyViewedPanel from '../components/dashboard/RecentlyViewedPanel.js';
import IndexChartsPanel from '../components/dashboard/IndexChartsPanel.js';
import NewsPanel from '../components/dashboard/NewsPanel.js';
import RecommendationPanel from '../components/dashboard/RecommendationPanel.js';
import MegaphonePanel from '../components/common/MegaphonePanel.js';

const DashboardPageUI = ({context,
  justLoggedOut, clickedTicker, onSignUp, justSignedUp, accessToken,
  sectorList}) =>

<PageUI cssClass='dashboard'>
  <div style={{textAlign: 'center'}}>
    <MegaphonePanel
      page='homepage'
    />
  </div>

  <div style={{textAlign: 'center'}}>
  <IndexChartsPanel />
  </div>

  <div style={{marginTop: '20px', marginLeft: '-15px', marginRight: '-15px'}}>
  <div className="content left col-sm-8                 col-md-6 col-md-push-3">
    <NewsPanel context={context} />
  </div>
  <aside className="side1 left col-sm-4                 col-md-3 col-md-pull-6">
    <RecommendationPanel context={context} />
  </aside>
  <aside className="side2 left col-sm-4 col-sm-offset-8 col-md-3 col-md-offset-0">
    <RecentlyViewedPanel context={context} />
    <WatchList context={context} />
  </aside>
  </div>

{/*
  <div className='row' style={{marginTop: '20px'}}>

    <div className='left col-xs-12 col-sm-push-4 main'>
      <NewsPanel context={context} />
    </div>

    <div className='left col-xs-12 col-sm-pull-8'>
      <RecommendationPanel context={context} />
    </div>

    <div className='col-xs-12 col-sm-12'>
      <RecentlyViewedPanel context={context} />
      {
        ! context.anonymous &&
        <WatchList context={context} />
      }
    </div>
  </div>
  */}
</PageUI>

export default DashboardPageUI;
