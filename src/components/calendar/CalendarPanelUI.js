import React from 'react'
import { Panel } from 'react-bootstrap'
import EarningStocksPanel from './EarningStocksPanel'
import EarningsNewsPanelUI from './EarningsNewsPanelUI'
import WeekPanelUI from './WeekPanelUI'
import SummaryPanel from '../ticker/SummaryPanel'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import SpinnerUI from '../widgets/SpinnerUI.js'
import MainTickerTable from '../widgets/table/MainTickerTable.js';
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const CalendarPanelUI = ({context, eventList, groupedEventList, selectedDate, onDateSelect, tickerList,
    onPreviousWeek, onNextWeek,
    // news
    newsList, onRelevanceClick, onDateClick, relevance,
    onNavigate, onView, onDrillDown, onRangeChange, onSelectSlot, onSelectEvent, onDoubleClickEvent, onSelecting,
    ticker, onWatchListFilterClick
}) =>
  <div className="row">
    <div className="col-xs-7">
      <WeekPanelUI
        eventList={groupedEventList}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        onNextWeek={onNextWeek}
        onPreviousWeek={onPreviousWeek}
      />

      {
        !context.anonymous &&
        <div className="checkbox text-center">
          <div style={{display: 'inline-block', padding: 5, backgroundColor: '#1997c6', borderRadius: 4}}>
            <label>
              <input type="checkbox" value="" onChange={onWatchListFilterClick} />
                In Watch List
            </label>
          </div>
        </div>
      }

      <MainTickerTable
        context={context}
        tickerList={tickerList}
        columnList={new Set(['name', 'sector'])}
        narrow='chartOnly'
      />
    </div>
    <div className="col-xs-5">
      {
        newsList &&
        <EarningsNewsPanelUI context={context} newsList={newsList}
          onRelevanceClick={onRelevanceClick}
          onDateClick={onDateClick}
          relevance={relevance}
        />
      }
      { !newsList && <SpinnerUI /> }
    </div>
  </div>

export default CalendarPanelUI;
