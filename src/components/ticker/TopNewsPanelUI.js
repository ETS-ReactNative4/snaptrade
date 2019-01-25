import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Constants from '../common/Constants.js';

const TopNewsPanelUI = ({newsList, relevance, onRelevanceClick, onDateClick}) =>
  <PanelUI title='Top News' wide={true}>
  <div className="panel-more-btn">
  { relevance === 1 && <span>Relevance</span> }
  { relevance === 0 && <a href='#relevance' onClick={onRelevanceClick}>Relevance</a> }
  {' '} | {' '}
  { relevance === 0 && <span>Date</span> }
  { relevance === 1 && <a href='#date' onClick={onDateClick}>Date</a> }
  </div>

  <ul className="topnews">
  {
    newsList.map((item, i) =>
      <li key={i}>
        <NewsListTableRowUI
          item={item}
        />
      </li>
    )
  }
  </ul>
  {
    newsList.length === 0 &&
    <span>No news available for this stock</span>
  }
  {
    newsList.length > 0 &&
    <a href='#news'>More news</a>
  }
  </PanelUI>

const NewsListTableRowUI = ({item}) =>
  <span>
    <a href={item.link} target='_blank'><strong>
      <span dangerouslySetInnerHTML={{__html: item.title}}></span>
    </strong></a><br/>
    <span className='text-muted'>{item.pub_time_days_ago}</span>:{' '}
    <span className='text-muted' dangerouslySetInnerHTML={{__html: item.news_clip_very_short}}>
    </span>
  </span>

export default TopNewsPanelUI;
