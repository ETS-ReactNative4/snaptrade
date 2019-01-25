import React, { Component } from 'react';
import TickerPanelUI from './TickerPanelUI.js';
import tickers from '../../apiclient/tickers/tickers.js';
import signals_tickers from '../../apiclient/signals_tickers.js';
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';
import chart_tickers from '../../apiclient/chart_tickers.js';
import eng_tickers from '../../apiclient/engagement/eng_tickers.js';
import eng_tickers_ratings from '../../apiclient/eng_tickers_ratings.js';
import eng_tickers_comments from '../../apiclient/eng_tickers_comments.js';
import eng_tickers_share from '../../apiclient/engagement/eng_tickers_share.js';

class TickerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      ticker : '',
      tickerInfo : null,
      tickerError : null,
      signalList : null,
      priceList : null,

      // chart
      selectedPeriod : null,
      stockData : null,
      hsStockData : null,

      // up vote down vote
      ratingSummary : {},

      // comments
      showComments:false,
      commentSummary : {},
      newComment : '',
      commentList : null,

      // sharing
      showShare:false,
      shareSummary : {},
      recipient : '',
      shareSuccess : null,
      shareError : null,

      // chart modal
      showChartModal : false,
    };
    this.getTickersCallback = this.getTickersCallback.bind(this);
    this.handleWatchClick = this.handleWatchClick.bind(this);
    this.handleWatchClickCallback = this.handleWatchClickCallback.bind(this);

    // signalList
    this.getTickerSignalsCallback = this.getTickerSignalsCallback.bind(this);
    this.handleSignalExpand = this.handleSignalExpand.bind(this);
    this.handleSignalCollapse = this.handleSignalCollapse.bind(this);

    // chart
    this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
    this.handle1DayClick = this.handle1DayClick.bind(this);
    this.handle7DayClick = this.handle7DayClick.bind(this);
    this.handle30DayClick = this.handle30DayClick.bind(this);
    this.handle1YearClick = this.handle1YearClick.bind(this);

    this.getEngagementCallback = this.getEngagementCallback.bind(this);

    // up vote down vote
    // this.getRatingsCallback = this.getRatingsCallback.bind(this);
    this.handleThumbsUp = this.handleThumbsUp.bind(this);
    this.handleThumbsDown = this.handleThumbsDown.bind(this);
    this.handleThumbsUpCallback = this.handleThumbsUpCallback.bind(this);
    this.handleThumbsDownCallback = this.handleThumbsDownCallback.bind(this);

    // discussions
    // this.getCommentsCallback = this.getCommentsCallback.bind(this);
    this.handleCommentsClick = this.handleCommentsClick.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentPost = this.handleCommentPost.bind(this);
    this.handleCommentPostCallback = this.handleCommentPostCallback.bind(this);

    // sharing
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleRecipientChange = this.handleRecipientChange.bind(this);
    this.handleRecipientPost = this.handleRecipientPost.bind(this);
    this.handleRecipientPostCallback = this.handleRecipientPostCallback.bind(this);

    // chart modal
    this.handleShowChartModal = this.handleShowChartModal.bind(this);
    this.handleHideChartModal = this.handleHideChartModal.bind(this);
  }

  render() {
    let ticker = this.props.ticker
    // following check is needed otherwise there is infinite loop in ticker page
    if (!this.state.ticker || this.state.ticker !== ticker) {
        tickers.get(this.getTickersCallback, ticker);
    }

    return (
      <TickerPanelUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        isLoading={this.state.isLoading}
        collapsed={this.props.collapsed}
        narrow={this.props.narrow}
        ticker={this.props.ticker}
        comp_name={this.props.comp_name}
        tickerError={this.state.tickerError}

        tickerInfo={this.state.tickerInfo}
        priceList={this.state.priceList}
        onWatchClick={this.handleWatchClick}

        // signals
        signalList={this.state.signalList}
        onSignalExpand={this.handleSignalExpand}
        onSignalCollapse={this.handleSignalCollapse}

        // chart
        stockData={this.state.stockData}
        hsStockData={this.state.hsStockData}
        on1DayClick={this.handle1DayClick}
        on7DayClick={this.handle7DayClick}
        on30DayClick={this.handle30DayClick}
        on1YearClick={this.handle1YearClick}
        selectedPeriod={this.state.selectedPeriod}

        // up vote down vote
        ratingSummary = {this.state.ratingSummary}
        onThumbsUp={this.handleThumbsUp}
        onThumbsDown={this.handleThumbsDown}

        // discussions
        showComments={this.state.showComments}
        onCommentsClick={this.handleCommentsClick}
        commentSummary={this.state.commentSummary}
        newComment={this.state.newComment}
        commentList={this.state.commentList}
        onCommentChange={this.handleCommentChange}
        onCommentPost={this.handleCommentPost}

        // sharing
        showShare={this.state.showShare}
        onShareClick={this.handleShareClick}
        shareSummary={this.state.shareSummary}
        recipient={this.state.recipient}
        shareSuccess={this.state.shareSuccess}
        shareError={this.state.shareError}
        onNewShareeEdit={this.handleRecipientChange}
        onNewShareeSubmit={this.handleRecipientPost}

        // chart modal
        showChartModal={this.state.showChartModal}
        onShowChartModal={this.handleShowChartModal}
        onHideChartModal={this.handleHideChartModal}
      />
    );
  }

  getTickersCallback(json, ticker) {
    if (json.Error) {
      this.setState({
        ticker : ticker,
        tickerError : json.Error
      })
      return;
    }

    this.setState({
      isLoading : true,
      ticker : ticker,
      tickerError : null,
      tickerInfo : json[0]
    })
    // chart_tickers.get(this.getTickerChartCallback, ticker, '1y');
    eng_tickers.get(this.getEngagementCallback, ticker);
    signals_tickers.get(this.getTickerSignalsCallback, ticker)
  }

  getTickerSignalsCallback(signalList, ticker) {
    var i=0;
    this.setState({
      signalList : signalList
    })
    console.log(signalList);
  }

  getEngagementCallback(engagement, ticker) {
    console.log(ticker);
    this.setState({
      ratingSummary : engagement.rating.summary,
      commentSummary : engagement.comments.summary,
      commentList : engagement.comments.detail,
      shareSummary : engagement.share.summary,
    })
  }

  getTickerChartCallback(ticker, selectedPeriod, priceList) {
    let priceListAsc = priceList.slice();
    if (selectedPeriod === '1y')
      priceListAsc = priceList.slice().reverse();
    let newArray = priceListAsc.map(price => ([Date.parse(price.date), price.close]))
    console.log(newArray);

    this.setState({
      isLoading : false,
      hsStockData : newArray,
      priceList : priceList,
      selectedPeriod : selectedPeriod,
    });
  }

  handleWatchClick(event) {
    let ticker = event.target.getAttribute('data-ticker')
    console.log(ticker)
    watchlist_tickers.post(this.handleWatchClickCallback, ticker)
  }

  handleWatchClickCallback(ticker) {
    let tickerInfo = this.state.tickerInfo;
    // tickerInfo.is_in_watchlist = 1
    this.setState({tickerInfo : tickerInfo});
  }

  handle1DayClick(event) {
    this.setState({isLoading: true});
    chart_tickers.get(this.getTickerChartCallback, this.state.ticker, '1d');
  }

  handle7DayClick(event) {
    this.setState({isLoading: true});
    chart_tickers.get(this.getTickerChartCallback, this.state.ticker, '7d');
  }

  handle30DayClick(event) {
    this.setState({isLoading: true});
    chart_tickers.get(this.getTickerChartCallback, this.state.ticker, '30d');
  }

  handle1YearClick(event) {
    this.setState({isLoading: true});
    chart_tickers.get(this.getTickerChartCallback, this.state.ticker, '1y');
  }

  handleSignalExpand(event) {
    event.preventDefault();
    let signalId = event.target.getAttribute('data-signal_id');
    console.log(signalId);
    let signalList = this.state.signalList;
    signalList.forEach((signal) => {
      if (signal.id == signalId) {
        signal.expanded = true;
      }
    })
    this.setState({signalList : signalList})
  }

  handleSignalCollapse(event) {
    event.preventDefault();
    let signalId = event.target.getAttribute('data-signal_id');
    let signalList = this.state.signalList;
    signalList.forEach((signal) => {
      if (signal.id == signalId) {
        signal.expanded = false;
      }
    })
    this.setState({signalList : signalList})
  }

  handleThumbsUp(event) {
    event.preventDefault();
  //  let ticker = event.target.getAttribute('data-objectId')
    let ticker = this.props.ticker
    eng_tickers_ratings.post(this.handleThumbsUpCallback, ticker, 'up')

  }

  handleThumbsUpCallback(engagement, ticker) {
    this.setState({ratingSummary: engagement.rating.summary})
  }

  handleThumbsDown(event) {
    event.preventDefault();
    //let ticker = event.target.getAttribute('data-objectId')
    let ticker = this.props.ticker
    eng_tickers_ratings.post(this.handleThumbsDownCallback, ticker, 'down')
  }

  handleThumbsDownCallback(engagement, ticker) {
   // engagement.rating.summary.up_count++;
    this.setState({ratingSummary: engagement.rating.summary})
  }

  handleCommentChange(e) {
    this.setState({ newComment: e.target.value });
  }

  handleCommentPost(event) {
    event.preventDefault()
    let newComment = this.state.newComment.trim();
    if (!newComment)
      return;
    eng_tickers_comments.post(this.handleCommentPostCallback, this.state.ticker,
    newComment)
  }

  handleCommentPostCallback(lastComment, ticker) {
    let commentList = this.state.commentList;
    let commentSummary = this.state.commentSummary;
    commentSummary.cnt += 1;
    commentList.push(lastComment);
    this.setState({
      commentList : commentList,
      commentSummary : commentSummary,
      newComment : '',
    })
  }

  handleRecipientChange(e)  {
    this.setState({ recipient: e.target.value });
  }

  handleRecipientPost(event) {
    event.preventDefault()
    this.setState({
      shareError : null
    })
    eng_tickers_share.post(this.handleRecipientPostCallback, this.state.ticker,
    this.state.recipient)
  }

  handleRecipientPostCallback(response, ticker) {
    let shareSummary = this.state.shareSummary;

    if (response.success) {
      shareSummary.cnt += 1;
      this.setState({
        recipient : '',
        shareSummary : shareSummary,
        shareSuccess : response.success
      })
    }

    if (response.error) {
      this.setState({
        shareError : response.error
      })
    }
  }

  handleShareClick(e) {
    e.preventDefault()
    this.setState({
      showShare:true,
      showComments:false,
    })
  }

  handleCommentsClick(e) {
    e.preventDefault()
    this.setState({
      showShare:false,
      showComments:true,
    })
  }

  handleShowChartModal(e) {
    e.preventDefault()
    this.setState({showChartModal : true})
  }

  handleHideChartModal(e) {
    if (e)
      e.preventDefault()
    this.setState({showChartModal : false})
  }
}

export default TickerPanel;
