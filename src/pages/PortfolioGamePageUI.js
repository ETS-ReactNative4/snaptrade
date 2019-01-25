import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import LiveChartPanel from '../components/portfolio/LiveChartPanel.js'
import PortfolioPanel from '../components/portfolio/PortfolioPanel.js'
import VotedTickersPanel from '../components/portfolio/VotedTickersPanel.js'
import TradingBox from '../components/portfolio/TradingBox.js';
import PanelUI from '../components/widgets/panel/PanelUI.js'

const PortfolioGamePageUI = ({context, anonymous, contestPostion, onContestPositionChange}) =>

<Grid>
  <h3>SnapTrade Community Powered Portfolio</h3>
  Vote your stock, benefit from the best stock picks through crowdsourcing ideas.{' '}
  {
    context.anonymous &&
    <a href='/login'>Login to vote</a>
  }
  <br/><br/>
  {/*
  We use the ideas from the SnapTrade community coupled with technical+fundamental analysis to add stocks to the portfolio.
  Our goal is to help our users by surfacing best ideas from the community. If you have a potential winning stock,
  use our voting feature on this page to surface the stock. Let the best ideas to make money for all!!
   <br/><b>We track this to a paper portfolio (left) and a real portfolio at Robinhood (right)</b>
  */}

  <Row className="show-grid">
    <Col xs={12} md={6}>
      <LiveChartPanel />
      <PortfolioPanel context={context} />
    </Col>
    <Col xs={12} md={6}>
      <PanelUI title='Real $ Portfolio (Robinhood)'>
        <p className='text-right'>
          <a href='https://s3.amazonaws.com/snaptrade-portfolio/community_portfolio_detail.png' target='_blank'>Details</a>
        </p>
        <img src='https://s3.amazonaws.com/snaptrade-portfolio/community_portfolio' alt='' style={{width: '100%'}} />
      </PanelUI>
      <VotedTickersPanel anonymous={anonymous} />
      {
        (context.userName === 'ben@snaptrade.us' || context.userName === 'bengoswami') &&
        <TradingBox />
      }
    </Col>
  </Row>
</Grid>

export default PortfolioGamePageUI;
