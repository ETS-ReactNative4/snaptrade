import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import ChartHeaderPanel from '../components/ticker/ChartHeaderPanel.js';
import SummaryPanel from '../components/ticker/SummaryPanel.js';
import ChartPanel from '../components/ticker/ChartPanel.js';
import ChartIntraDayPanel from '../components/ticker/ChartIntraDayPanel.js';
import ChartComparePanel from '../components/ticker/ChartComparePanel.js';
import NewsPanel from '../components/ticker/NewsPanel.js';
import TopNewsPanel from '../components/ticker/TopNewsPanel.js';
import PriceAlertPanel from '../components/ticker/PriceAlertPanel.js';
import SimilarStocksPanel from '../components/ticker/SimilarStocksPanel.js';
import EarningsPanel from '../components/ticker/EarningsPanel.js';
import AnalystsPanel from '../components/ticker/AnalystsPanel.js';
import CompanyPanel from '../components/ticker/CompanyPanel';
import StoriesPanel from '../components/ticker/StoriesPanel.js';
import SignalPanel from '../components/ticker/SignalPanel.js';
import AdvancedChartModal from '../components/ticker/AdvancedChartModal.js';
import PriceHistoryPanel from '../components/ticker/PriceHistoryPanel.js';
import TickerTagsPanel from '../components/ticker/TickerTagsPanel.js';
import RecentlyViewedPanel from '../components/dashboard/RecentlyViewedPanel.js';
import PanelUI from '../components/widgets/panel/PanelUI.js'

const TickerPageUI = ({context, anonymous, justLoggedOut, justSignedUp, accessToken,
    sectorList, clickedTicker, ticker,
    showChartModal, onShowChartModal, onHideChartModal,
    intraDay, onIntraDayClick, onDailyChartClick,
    indicator, onShow50dSMAClick, onShow100dSMAClick, onShow50dEMAClick, onShow100dEMAClick,
    onShowMACDClick, onShowRSIClick, onShowCandlestickClick}) =>
    <Grid className='ticker-page'>
      <Row>
        <Col xs={12} md={7}>
          <SummaryPanel context={context} ticker={ticker} />
          <div style={{marginTop: 30}}></div>

          <TickerTagsPanel context={context} ticker={ticker} />

          <PanelUI>
          <ChartHeaderPanel
            anonymous={anonymous}
            context={context}
            ticker={ticker}
            intraDay={intraDay}
            indicator={indicator}
            onShowChartModal={onShowChartModal}
            onIntraDayClick={onIntraDayClick}
            onDailyChartClick={onDailyChartClick}
            onShow50dSMAClick={onShow50dSMAClick}
            onShow100dSMAClick={onShow100dSMAClick}
            onShow50dEMAClick={onShow50dEMAClick}
            onShow100dEMAClick={onShow100dEMAClick}
            onShowMACDClick={onShowMACDClick}
            onShowRSIClick={onShowRSIClick}
            onShowCandlestickClick={onShowCandlestickClick}
          />
          {
            ! intraDay &&
            <ChartPanel
              context={context}
              ticker={ticker}
              intraDay={intraDay}
              indicator={indicator}
            />
          }
          {
            intraDay &&
            <ChartIntraDayPanel anonymous={anonymous} ticker={ticker}
            />
          }
          </PanelUI>

          <ChartComparePanel ticker={ticker} />
          <SimilarStocksPanel context={context} ticker={ticker} />
          <NewsPanel ticker={ticker} />
        </Col>
        <Col xs={12} md={5}>
          <StoriesPanel ticker={ticker}/>
          <TopNewsPanel ticker={ticker} />
          <PriceAlertPanel context={context} ticker={ticker} />
          <RecentlyViewedPanel context={context} wide={true} />
          <EarningsPanel ticker={ticker} />
          <AnalystsPanel ticker={ticker} />
          <SignalPanel context={context} ticker={ticker} />
          <CompanyPanel ticker={ticker} />
          <PriceHistoryPanel ticker={ticker} />
        </Col>
      </Row>

      <AdvancedChartModal
        showChartModal={showChartModal}
        onHideChartModal={onHideChartModal}
        ticker={ticker}
      />

    </Grid>


export default TickerPageUI;
