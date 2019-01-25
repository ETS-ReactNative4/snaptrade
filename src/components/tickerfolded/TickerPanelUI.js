import React, {Component} from 'react';

import {Tabs, Tab} from 'react-bootstrap';
import LikePanelUI from '../engagement/LikePanelUI.js';
import EngagementBoxUI from '../ticker/EngagementBoxUI.js';
import SignalTableUI from '../ticker/SignalTableUI.js';
import PriceTableUI from '../ticker/PriceTableUI.js';
import CommentsPanelUI from '../engagement/CommentsPanelUI.js';
import SharePanelUI from '../engagement/SharePanelUI.js';
import ShareTradeIdeaUI from '../engagement/ShareTradeIdeaUI.js';
import ShareTradeIdea from '../engagement/ShareTradeIdea.js';
import ChartPanel from '../ticker/ChartPanel.js';
import SummaryPanel from '../ticker/SummaryPanel.js';
import TickerPanelShortInfo from './TickerPanelShortInfo';
import tickers from "../../apiclient/tickers/tickers";

class TickerPanelUI extends Component {
    render() {
        const {
            context, anonymous, isLoading, collapsed, narrow,
            ticker, onWatchClick,
            priceList, stockData, tickerInfo, tickerError,
            signalList, onSignalExpand, onSignalCollapse,
            // chart
            hsStockData, selectedPeriod, intraDay, on1DayClick, on7DayClick, on30DayClick, on1YearClick,
            // like panel
            ratingSummary, onThumbsUp, onThumbsDown,
            // comments panel
            showComments, onCommentsClick, commentSummary, newComment, commentList, onCommentChange, onCommentPost,
            // share panel
            showShare, onShareClick, shareSummary, recipient, shareSuccess, shareError, onNewShareeEdit, onNewShareeSubmit,
        } = this.props
        return (
            <div>
                {
                    !tickerError &&
                    <div>
                        <div className="row" style={{marginTop: 10, marginBottom: 20}}>

                            <div className={narrow === 'chartOnly' ? "col-xs-12" : "col-xs-6"}>
                                {tickerInfo && <h4>{tickerInfo.company_name}</h4>}
                                <ChartPanel anonymous={anonymous} ticker={ticker} foldable={true}/>
                            </div>

                            <div className={narrow === 'chartOnly' ? "col-xs-12" : "hide"}>
                                <a href={'/ticker/' + ticker} className="btn btn-primary">View More Details</a>
                            </div>

                            <div className={narrow === 'chartOnly' ? "hide" : "col-xs-6"}>
                                <div>
                                    <SummaryPanel context={context} ticker={ticker} narrow={narrow}/>
                                </div>

                                <div style={{marginTop: 10}}>
                                    <a href={'/ticker/' + ticker} className="btn btn-primary">View More Details</a>
                                </div>

                                <div>
                                    <TickerPanelShortInfo ticker={ticker}/>
                                </div>

                                {/*
            <EngagementBoxUI
            // share and comments panel
            onShareClick={onShareClick}
            onCommentsClick={onCommentsClick}
            // like LikePanelUI
            anonymous={anonymous}
            objectId={ticker}
            ratingSummary={ratingSummary}
            onThumbsUp={onThumbsUp}
            onThumbsDown={onThumbsDown}
            />
            */}

                            </div>

                        </div>
                        {
                            showComments &&
                            <CommentsPanelUI
                                anonymous={anonymous}
                                objectId={ticker}
                                commentSummary={commentSummary}
                                newComment={newComment}
                                commentList={commentList}
                                collapsed={collapsed}
                                onCommentChange={onCommentChange}
                                onCommentPost={onCommentPost}
                            />
                        }

                        {
                            !anonymous && showShare &&
                            <SharePanelUI
                                anonymous={anonymous}
                                objectId={ticker}
                                shareSummary={shareSummary}
                                recipient={recipient}
                                shareSuccess={shareSuccess}
                                shareError={shareError}
                                onNewShareeEdit={onNewShareeEdit}
                                onNewShareeSubmit={onNewShareeSubmit}
                            />
                        }
                    </div>
                }

                {
                    tickerError &&
                    <div style={{'padding': '200px 0'}}>
                        {ticker}<br/><br/>
                        {tickerError}
                    </div>
                }

            </div>
        );
    }
}

export default TickerPanelUI;
