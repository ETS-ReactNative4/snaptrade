// libraries
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AppUI from './AppUI.js';
import signals_run_date from './apiclient/signals_run_date.js';
import watchlist_tickers from './apiclient/watchlist/watchlist_tickers.js';
import './assets/App.css';
import './assets/bootstrap-multiselect.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
      anonymous: true,
      justLoggedOut: false,
      justSignedUp: false,
      userName: null,
      runTime : '',
      runDate : '',
      clickedTicker: '',
      showFeedbackModal : false,
      accessToken : null,
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignOutLinkClick = this.handleSignOutLinkClick.bind(this);
    this.handleShowFeedbackModal = this.handleShowFeedbackModal.bind(this);
    this.handleHideFeedbackModal = this.handleHideFeedbackModal.bind(this);
    this.getSignalsRunDateCallback = this.getSignalsRunDateCallback.bind(this);
    this.handleDarkThemeClick = this.handleDarkThemeClick.bind(this)
    this.handleLiteThemeClick = this.handleLiteThemeClick.bind(this)
    //
    this.getWatchListTickersCallback = this.getWatchListTickersCallback.bind(this)
    this.handleDeleteWatchListTickerSubmit = this.handleDeleteWatchListTickerSubmit.bind(this)
    this.deleteWatchListTickerCallback = this.deleteWatchListTickerCallback.bind(this)
    this.handleAddWatchListTickerSubmit = this.handleAddWatchListTickerSubmit.bind(this)
    this.addWatchListTickerCallback = this.addWatchListTickerCallback.bind(this)
  }

  // https://stackoverflow.com/questions/43469071/react-react-router-dom-pass-props-to-component
  render() {
    console.log('-- render');
    return (
      <AppUI
        context={this.state.context}
        anonymous={this.state.anonymous}
        userName={this.state.userName}
        justLoggedOut={this.state.justLoggedOut}
        justSignedUp={this.state.justSignedUp}
        sectorList={[]}
        clickedTicker={this.state.clickedTicker}
        accessToken={this.state.accessToken}
        onTickerSearch={this.handleTickerSearch}
        // feedback
        showFeedbackModal={this.state.showFeedbackModal}
        onShowFeedbackModal={this.handleShowFeedbackModal}
        onHideFeedbackModal={this.handleHideFeedbackModal}
        // run Date
        runDate={this.state.runDate}
        runTime={this.state.runTime}
      />
    )
  }

  componentWillMount() {
    console.log('-- componentWillMount');

    let userName = localStorage.getItem("userName");
    let accessToken = localStorage.getItem("accessToken");
    let theme = localStorage.getItem("theme");
    let context = this.state.context;

    if (userName) {
      this.setState({userName: userName})
      context.userName = userName;
    }

    if (accessToken) {
      this.setState({anonymous: false})
      context.anonymous = false;
    }
    else {
      this.setState({anonymous: true})
      context.anonymous = true;
    }

    context.theme = theme ? theme : 'dark'
    document.body.classList.remove('dark')
    document.body.classList.remove('lite')
    document.body.classList.add(context.theme)

    context.showHelp = "0"
    context.path=this.props.location.pathname
    context.onSignOutLinkClick=this.handleSignOutLinkClick
    context.onDarkThemeClick=this.handleDarkThemeClick
    context.onLiteThemeClick=this.handleLiteThemeClick
    context.onSignIn=this.handleSignIn
    context.onSignUp=this.handleSignUp
    context.onRemoveTicker=this.handleDeleteWatchListTickerSubmit
    context.onWatchTicker=this.handleAddWatchListTickerSubmit
    context.onContextChange = this.onContextChange.bind(this)


    this.setState({context: context})

    if (!context.anonymous) {
      watchlist_tickers.get(this.getWatchListTickersCallback, null, 'small')
    }
    signals_run_date.get(this.getSignalsRunDateCallback);
  }

  componentWillReceiveProps(props) {
    let context = this.state.context
    context.path=props.location.pathname
    this.setState({context: context})
  }

  getWatchListTickersCallback(json, tagUuid, tagId) {
    let context = this.state.context;
    context.watchList = json
    this.setState({
      context: context,
    });
  }

  handleAddWatchListTickerSubmit(event) {
    event.preventDefault()
    event.stopPropagation();
    console.log(event.target)
    let ticker = event.target.getAttribute('data-ticker')
    console.log(ticker)
    watchlist_tickers.post(this.addWatchListTickerCallback, ticker)
  }

  addWatchListTickerCallback() {
    watchlist_tickers.get(this.getWatchListTickersCallback, null, 'small')
  }

  handleDeleteWatchListTickerSubmit(event) {
    event.preventDefault()
    event.stopPropagation();
    console.log(event.target)
    let ticker = event.target.getAttribute('data-ticker')
    console.log(ticker)
    watchlist_tickers.delete(ticker, this.deleteWatchListTickerCallback)
  }

  deleteWatchListTickerCallback() {
    watchlist_tickers.get(this.getWatchListTickersCallback, null, 'small')
  }

  getSignalsRunDateCallback(json) {
    let context = this.state.context;
    context.runDate = json.latest_run_date
    context.runTime = json.latest_run_time
    this.setState({
      context: context,
      gainsFiltersUpdated: false,
      signalFiltersUpdated: false,
      runDate: json.latest_run_date,
      runTime: json.latest_run_time
    });
  }

  handleSignOutLinkClick() {
    this.handleLogout()
  }


  handleSignIn(userName, accessToken) {
    console.log('handleSignIn');
    let context = this.state.context;
    context.anonymous = false;
    context.userName = userName;
    this.setState({
      context: context,
      anonymous: false,
      userName: userName
    });
    localStorage.setItem("userName", userName);
    localStorage.setItem("accessToken", accessToken);
    this.props.history.push("/dashboard");
    watchlist_tickers.get(this.getWatchListTickersCallback, null, 'small')
  }

  handleSignUp(userName, accessToken) {
    console.log('handleSignUp');
    let context = this.state.context;
    context.anonymous = false;
    context.userName = userName;

    this.setState({
      context: context,
      anonymous: false,
      justSignedUp : true,
      accessToken : accessToken,
      userName: userName
    });
    localStorage.setItem("userName", userName);
    localStorage.setItem("accessToken", accessToken);
    this.props.history.push("/dashboard");
    watchlist_tickers.get(this.getWatchListTickersCallback, null, 'small')
  }

  handleLogout() {
    let context = this.state.context;
    context.anonymous = true;
    context.userName = null;
    delete context.watchList;

    this.setState({
      context: context,
      anonymous: true,
      justLoggedOut: true
    });
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    this.props.history.push("/");
  }

  handleShowFeedbackModal(event) {
    event.preventDefault()
    let page = event.target.getAttribute('data-page')
    this.setState({
      showFeedbackModal : true,
      page : page
    })
  }

  handleHideFeedbackModal() {
    this.setState({showFeedbackModal : false})
  }

  handleDarkThemeClick(e) {
    e.preventDefault()
    document.body.classList.remove('lite')
    document.body.classList.add('dark')
    localStorage.setItem("theme", 'dark');
    let context = this.state.context
    context.theme = 'dark'
    this.setState(context : context)
  }

  handleLiteThemeClick(e) {
    console.log('here');
    e.preventDefault()
    document.body.classList.remove('dark')
    document.body.classList.add('lite')
    localStorage.setItem("theme", 'lite');
    let context = this.state.context
    context.theme = 'lite'
    this.setState(context : context)
  }
  
  onContextChange(context) {
    this.setState({context: context})
  }
}

export default withRouter(App);
