import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import PortfolioPanel from '../components/portfolio/PortfolioPanel.js'
import LeaderPanel from '../components/contest/LeaderPanel.js'
import ContestInfoPanel from '../components/contest/ContestInfoPanel.js'
import ContestRulesPanelUI from '../components/contest/ContestRulesPanelUI.js'
import WatchlistTickers from '../components/user/WatchlistTickers.js';
import AverageAccountChart from '../components/contest/AverageAccountChart.js';

const ContestPageUI = ({anonymous, contestPostion, onContestPositionChange,
  justLoggedOut, clickedTicker, onSignUp, justSignedUp, accessToken,
  sectorList}) =>

<Grid>
  <h1>Portfolio Contest</h1>
  <ContestInfoPanel contestPostion={contestPostion} />
  <Row className="show-grid">
    {
      ! anonymous &&
      <Col xs={12} md={7}>
          <PortfolioPanel onContestPositionChange={onContestPositionChange}/>
      </Col>
    }
    <Col xs={12} md={5}>
        <LeaderPanel />
        <AverageAccountChart />
    </Col>
  </Row>

  <ContestRulesPanelUI />

  {
    justSignedUp &&
    <WatchlistTickers
      accessToken={accessToken}
      sectorList={sectorList}
    />
  }

</Grid>

export default ContestPageUI;
