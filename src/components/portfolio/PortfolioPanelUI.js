import React from 'react';
import SpinnerUI from '../widgets/SpinnerUI.js';
import PanelUI from '../widgets/panel/PanelUI.js';
//import TradingBox from './TradingBox.js';
import LeaderPanelUI from './LeaderPanelUI.js';
import PortfolioTableUI from './PortfolioTableUI.js';
import Format from '../common/Format.js';
import {Grid, Row, Col, Panel} from 'react-bootstrap';

const PortfolioPanelUI = ({context, isLoading, summary, tickerList, onPortfolioChange,
    contestPostion, onContestPositionChange,
    onTickerFold, onTickerUnfold}) =>
  <div>
    {
      summary &&
      <PanelUI title='SnapTrade Community Powered Portfolio'>
        <div className="portfolioTbl">
          <Row className="show-grid">
              <Col xs={12} md={12}>
                <Row className="show-grid">
                    <Col xs={12} md={6}>
                      <h4>Account Value:<br/><span>${summary.account_value}</span></h4>
                    </Col>
                    <Col xs={12} md={6}>
                      <h4>Change:<br/>
                      <span>${summary.account_gain} (
                        {summary.account_gain_percentage})
                      </span></h4>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} md={6}>
                      <h4>Portfolio Value:<br/><span> ${summary.portfolio_value}</span></h4>
                    </Col>
                    <Col xs={12} md={6}>
                      <h4>Buying Power Remaining:<br/><span> ${summary.amount_available}</span></h4>
                    </Col>
                </Row>
              </Col>
          </Row>

          <Row className="show-grid">
          <br/>
            <Col xs={12} md={12}>
              <PortfolioTableUI
                tickerList={tickerList}
                onTickerFold={onTickerFold}
                onTickerUnfold={onTickerUnfold}
              />
            </Col>
          </Row>
        </div>

        {/*
          (context.userName === 'ben@snaltrade.us' || context.userName === 'bengoswami') &&
          <div className="panel-footer">
              <TradingBox onPortfolioChange={onPortfolioChange} />
          </div>
        */}
      </PanelUI>
    }
  </div>

export default PortfolioPanelUI;
