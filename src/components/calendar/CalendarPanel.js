import React, { Component } from 'react'
import moment from 'moment'
import CalendarPanelUI from './CalendarPanelUI.js';
import earnings_calendar from '../../apiclient/earnings/earnings_calendar.js';
import news from '../../apiclient/news/news.js';
import tickers_list from '../../apiclient/tickers/tickers_list.js';

class CalendarPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      eventList : [],
      selectedDate : null,
      groupedEventList : [],
      ticker_list: null, // stores ticker symbols only
      ticker: null,
      newsList: null,
      allTickerList: null, // stores ticker objects from server
      tickerList: null, // stores ticker objects filtered by watchlist if filtered
      relevance : 1,
    };
    this.getCalendarCallback = this.getCalendarCallback.bind(this);
    this.getGroupedCalendarCallback = this.getGroupedCalendarCallback.bind(this);
    this.getTickerListCallback = this.getTickerListCallback.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this)
    this.handlePreviousWeek = this.handlePreviousWeek.bind(this)
    this.handleNextWeek = this.handleNextWeek.bind(this)
    // news
    this.getNewsCallback = this.getNewsCallback.bind(this);
    this.handleRelevanceClick = this.handleRelevanceClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    //
    this.onNavigate = this.onNavigate.bind(this);
    this.onView = this.onView.bind(this);
    this.onDrillDown = this.onDrillDown.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onDoubleClickEvent = this.onDoubleClickEvent.bind(this);
    this.onSelecting = this.onSelecting.bind(this);
    //
    this.handleWatchListFilterClick = this.handleWatchListFilterClick.bind(this);
  }

  render() {
    return (
      <CalendarPanelUI
        context={this.props.context}
        isLoading={this.state.isLoading}
        eventList={this.state.eventList}
        groupedEventList={this.state.groupedEventList}
        selectedDate={this.state.selectedDate}
        onDateSelect={this.handleDateSelect}
        tickerList={this.state.tickerList}
        onPreviousWeek={this.handlePreviousWeek}
        onNextWeek={this.handleNextWeek}
        // news
        newsList={this.state.newsList}
        onRelevanceClick={this.handleRelevanceClick}
        onDateClick={this.handleDateClick}
        relevance={this.state.relevance}
        // event handlers
        onNavigate={this.onNavigate}
        onView={this.onView}
        onDrillDown={this.onDrillDown}
        onRangeChange={this.onRangeChange}
        onSelectSlot={this.onSelectSlot}
        onSelectEvent={this.onSelectEvent}
        onDoubleClickEvent={this.onDoubleClickEvent}
        onSelecting={this.onSelecting}
        //
        ticker={this.state.ticker}
        //
        onWatchListFilterClick={this.handleWatchListFilterClick}
      />
    );
  }

  componentWillMount() {
    // earnings_calendar.get(this.getCalendarCallback);
    let d = moment (new Date ()).format("YYYY-MM-DD")
    // d = '2018-11-09'
    earnings_calendar.get(this.getGroupedCalendarCallback, d);
  }

  getCalendarCallback(json) {
    let eventList = json.map(event => ({
      title:  event.comp_name + ' (' + event.ticker + ')',
      allDay: true,
      start: moment(event.earnings_date),
      end: moment(event.earnings_date),
      origDate: event.earnings_date,
    }))
    console.log(eventList);
    this.setState({eventList: eventList})
  }

  getGroupedCalendarCallback(json, date) {
    this.setState({selectedDate: date, groupedEventList: json})

    let dayEvents = json.filter(dayEvents => dayEvents.date === date)
    console.log(dayEvents[0]);
    let ticker_list = dayEvents[0].tickers.map(ticker => ticker.ticker).join()
    console.log(ticker_list);
    this.setState({ticker_list: ticker_list})

    if (ticker_list.length > 0) {
      news.get(this.getNewsCallback, { ticker_list: ticker_list, relevance: 1, earnings_date: date })
      tickers_list.get(this.getTickerListCallback, ticker_list);
    }
    else {
      this.setState({
        tickerList: [],
        allTickerList: [],
        newsList: []
      });
    }
  }

  getTickerListCallback(json, tickerListStr) {
    let tickerList = json
    if ('watchList' in this.props.context) {
      let watchList = this.props.context.watchList
      tickerList.map((ticker) => {
        watchList && watchList.map((watch) => {
          if (watch.ticker === ticker.ticker)
            ticker.is_in_watchlist = true
        })
      })
    }
    console.log('earnings', tickerList);
    this.setState({
      tickerList: tickerList,
      allTickerList: tickerList,
    });
    // setTimeout(this.reload, 5000*60)
  }

  handleDateSelect(event) {
    let date = event.target.getAttribute('data-date')
    console.log(date);
    if (this.state.selectedDate === date)
      return
    this.setState({selectedDate: date, newsList: null})

    earnings_calendar.get(this.getGroupedCalendarCallback, date);
  }

  handlePreviousWeek(event) {
    let new_date = moment(this.state.selectedDate, "YYYY-MM-DD").subtract(7, 'days').format("YYYY-MM-DD")
    console.log(new_date)
    earnings_calendar.get(this.getGroupedCalendarCallback, new_date);
    this.setState({newsList: null, tickerList: null})
  }

  handleNextWeek(event) {
    let new_date = moment(this.state.selectedDate, "YYYY-MM-DD").add(7, 'days').format("YYYY-MM-DD")
    console.log(new_date)
    earnings_calendar.get(this.getGroupedCalendarCallback, new_date);
    this.setState({newsList: null, tickerList: null})
  }

  getNewsCallback(newsList) {
    console.log(newsList);
    this.setState({newsList: newsList,});
  }

  onNavigate({ date }) {
    console.log('onNavigate', date);
  }

  onView({ activeStartDate, view }) {
    console.log('onView', activeStartDate, view);
  }

  onDrillDown({ event }) {
    console.log('onDrillDown', event);
  }

  onRangeChange() {
    console.log('onRangeChange');
  }

  onSelectSlot() {
    console.log('onSelectSlot');

  }

  onSelectEvent(event, e) {
    // returns event when event clicked
    console.log('onSelectEvent', event.desc);
    let ticker = event.desc
    this.setState({ticker: ticker})
  }



  onDoubleClickEvent() {
    console.log('onDoubleClickEvent');

  }

  onSelecting() {
    console.log('onSelecting');

  }

  handleRelevanceClick(e) {
    e.preventDefault();
    this.setState({relevance: 1});
    news.get(this.getNewsCallback, { ticker_list: this.state.ticker_list, relevance: 1 })
  }

  handleDateClick(e) {
    e.preventDefault();
    this.setState({relevance: 0});
    news.get(this.getNewsCallback, { ticker_list: this.state.ticker_list, relevance: 0 })
  }

  handleWatchListFilterClick(e) {
    console.log(e.target.checked);
    let checked = e.target.checked

    if (checked) {
      let watchlistTickerSymbols =
        'watchList' in this.props.context ?
          this.props.context.watchList.map(ticker => ticker.ticker) : []
      console.log('watchlistTickerSymbols', watchlistTickerSymbols);
      console.log('allTickerList', this.state.allTickerList);
      let filteredTickerList = this.state.allTickerList.filter(ticker => watchlistTickerSymbols.includes(ticker.ticker))
      console.log(filteredTickerList);
      this.setState({tickerList: filteredTickerList})
    }
    else {
      this.setState({tickerList: this.state.allTickerList})
    }
  }
}

export default CalendarPanel;
