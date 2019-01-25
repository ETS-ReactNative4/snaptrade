import React, { Component } from 'react';
import ChartHeaderPanelUI from './ChartHeaderPanelUI.js';
import tickers from '../../apiclient/tickers/tickers.js';
import signals_tickers from '../../apiclient/signals_tickers.js';
import chart_tickers from '../../apiclient/chart_tickers.js';
import eng_tickers from '../../apiclient/engagement/eng_tickers.js';
import eng_tickers_ratings from '../../apiclient/eng_tickers_ratings.js';
import eng_tickers_comments from '../../apiclient/eng_tickers_comments.js';
import eng_tickers_share from '../../apiclient/engagement/eng_tickers_share.js';

class ChartHeaderPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ticker: this.props.ticker,
      tickerInfo: null,
      tickerError: null,
      signalList: null,
      priceList: null,

      // up vote down vote
      ratingSummary: {},

      // comments
      showComments: false,
      commentSummary: {},
      newComment: '',
      commentList: null,

      // sharing
      showShare: false,
      shareSummary: {},
      recipient: '',
      shareSuccess: null,
      shareError: null,
    };
    this.getTickersCallback = this.getTickersCallback.bind(this);

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
  }

  render() {
    return (
      <div>
        {
          this.state.tickerInfo &&
          <ChartHeaderPanelUI
            context={this.props.context}
            anonymous={this.props.anonymous}
            ticker={this.props.ticker}
            tickerInfo={this.state.tickerInfo}
            signalList={this.state.signalList}
            intraDay={this.props.intraDay}
            onIntraDayClick={this.props.onIntraDayClick}
            onDailyChartClick={this.props.onDailyChartClick}
            indicator={this.props.indicator}
            onShow50dSMAClick={this.props.onShow50dSMAClick}
            onShow100dSMAClick={this.props.onShow100dSMAClick}
            onShow50dEMAClick={this.props.onShow50dEMAClick}
            onShow100dEMAClick={this.props.onShow100dEMAClick}
            onShowMACDClick={this.props.onShowMACDClick}
            onShowRSIClick={this.props.onShowRSIClick}
            onShowCandlestickClick={this.props.onShowCandlestickClick}
          />
        }
      </div>
    );
  }

  componentWillMount() {
    tickers.get(this.getTickersCallback, this.props.ticker);
  }

  componentWillReceiveProps(props) {
    if (props.context.latestSignal) {
      this.setState({ latestSignal: props.context.latestSignal });
    }
  }


  getTickersCallback(json, ticker) {
    if (json.Error) {
      this.setState({
        tickerError: json.Error
      })
      return;
    }

    this.setState({
      isLoading: true,
      tickerError: null,
      tickerInfo: json[0]
    })
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
    this.setState({ signalList: signalList })
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
    this.setState({ signalList: signalList })
  }

  handleThumbsUp(event) {
    event.preventDefault();
    //  let ticker = event.target.getAttribute('data-objectId')
    let ticker = this.props.ticker
    eng_tickers_ratings.post(this.handleThumbsUpCallback, ticker, 'up')

  }

  handleThumbsUpCallback(engagement, ticker) {
    this.setState({ ratingSummary: engagement.rating.summary })
  }

  handleThumbsDown(event) {
    event.preventDefault();
    //let ticker = event.target.getAttribute('data-objectId')
    let ticker = this.props.ticker
    eng_tickers_ratings.post(this.handleThumbsDownCallback, ticker, 'down')
  }

  handleThumbsDownCallback(engagement, ticker) {
    // engagement.rating.summary.up_count++;
    this.setState({ ratingSummary: engagement.rating.summary })
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
      commentList: commentList,
      commentSummary: commentSummary,
      newComment: '',
    })
  }

  handleRecipientChange(e) {
    this.setState({ recipient: e.target.value });
  }

  handleRecipientPost(event) {
    event.preventDefault()
    this.setState({
      shareError: null
    })
    eng_tickers_share.post(this.handleRecipientPostCallback, this.state.ticker,
      this.state.recipient)
  }

  handleRecipientPostCallback(response, ticker) {
    let shareSummary = this.state.shareSummary;

    if (response.success) {
      shareSummary.cnt += 1;
      this.setState({
        recipient: '',
        shareSummary: shareSummary,
        shareSuccess: response.success
      })
    }

    if (response.error) {
      this.setState({
        shareError: response.error
      })
    }
  }

  handleShareClick(e) {
    e.preventDefault()
    this.setState({
      showShare: true,
      showComments: false,
    })
  }

  handleCommentsClick(e) {
    e.preventDefault()
    this.setState({
      showShare: false,
      showComments: true,
    })
  }

}

export default ChartHeaderPanel;
