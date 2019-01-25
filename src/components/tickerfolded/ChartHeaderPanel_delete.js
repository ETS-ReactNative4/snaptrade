import React, { Component } from 'react';
import ChartHeaderPanelUI from './ChartHeaderPanelUI.js';
import tickers from '../../apiclient/tickers/tickers.js';
import signals_tickers from '../../apiclient/signals_tickers.js';
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';
import chart_tickers from '../../apiclient/chart_tickers.js';
import eng_tickers from '../../apiclient/engagement/eng_tickers.js';
import eng_tickers_ratings from '../../apiclient/eng_tickers_ratings.js';
import eng_tickers_comments from '../../apiclient/eng_tickers_comments.js';
import eng_tickers_share from '../../apiclient/engagement/eng_tickers_share.js';

class ChartHeaderPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      ticker : this.props.ticker,
      tickerInfo : null,
      tickerError : null,
      signalList : null,
      priceList : null,

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
    this.handleSignalExpand = this.handleSignalExpand.bind(this);
    this.handleSignalCollapse = this.handleSignalCollapse.bind(this);

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
    return (
      <div>
      {
        this.state.tickerInfo &&
        <ChartHeaderPanelUI
          anonymous={this.state.anonymous}
          ticker={this.props.ticker}
          tickerInfo={this.state.tickerInfo}
          onWatchClick={this.handleWatchClick}
        />
      }
      </div>
    );
  }

  componentWillMount() {
    tickers.get(this.getTickersCallback, this.props.ticker);
  }

  getTickersCallback(json, ticker) {
    if (json.Error) {
      this.setState({
        tickerError : json.Error
      })
      return;
    }

    this.setState({
      isLoading : true,
      tickerError : null,
      tickerInfo : json[0]
    })
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

export default ChartHeaderPanel;
