import React from 'react'
import { Panel } from 'react-bootstrap'
import './WeekPanel.css'
import { Glyphicon } from 'react-bootstrap'

const WeekPanelUI = ({context, selectedDate, eventList, onDateSelect, onPreviousWeek, onNextWeek}) =>
  <div style={{display: 'flex'}}>
    <div style={{padding: '30px 10px 0 0', cursor: 'pointer'}} onClick={onPreviousWeek}>
    <Glyphicon glyph="backward" className='text-muted' style={{fontSize: '200%'}} />
    </div>

    <ul className='weekCont'>
      {
        eventList.map((item, i) =>
          <DayUI key={i} item={item} selectedDate={selectedDate} onDateSelect={onDateSelect} />
        )
      }
    </ul>
    <div style={{padding: '30px 0 0 10px', cursor: 'pointer'}} onClick={onNextWeek}>
    <Glyphicon glyph="forward" className='text-muted' style={{fontSize: '200%'}} />
    </div>
  </div>

const DayUI = ({item, selectedDate, onDateSelect}) =>
  <li className={selectedDate === item.date ? 'selectedDate' : ''} data-date={item.date} onClick={onDateSelect}>
    {item.formatted_date}<br/><br/>
    <span style={{whiteSpace: 'nowrap'}}>{item.tickers.length} Earnings</span>
  </li>


export default WeekPanelUI;
