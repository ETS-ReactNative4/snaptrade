import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger } from 'react-bootstrap'
import Constants from '../common/Constants.js';
import NewsItemUI from '../news/NewsItemUI.js'
import NewsItemGroupedUI from '../news/NewsItemGroupedUI.js'

const NewsPanelUI = ({context, newsList, selected, onFilter,
  isToday, isGroupedNews, onTodayCheckedChange,
  typedTicker, onSearchedTickerChange, onTickerSearch, onMoreLessClick}) =>
  <div>
    <div className="tag-container">
      {
        !context.anonymous && context.watchList && context.watchList.length > 0 &&
        <div className={selected=='category=watchlist'?'tag selected':'tag'}>
          <a href='#' data-q='category=watchlist' onClick={onFilter}>Watch List</a>
        </div>
      }
      <div className={selected==null?'tag selected':'tag'}><a href='#' data-q='' onClick={onFilter}>Top News</a></div>
      {/*<div className={selected=='category=latest'?'tag selected':'tag'}><a href='#' data-q='category=latest' onClick={onFilter}>Latest</a></div>*/}
      <div className={selected=='sector_id=1'?'tag selected':'tag'}><a href='#' data-q='sector_id=1' onClick={onFilter}>Tech</a></div>
      <div className={selected=='sector_id=3'?'tag selected':'tag'}><a href='#' data-q='sector_id=3' onClick={onFilter}>Healthcare</a></div>
      <div className={selected=='category=high_gainers'?'tag selected':'tag'}><a href='#' data-q='category=high_gainers' onClick={onFilter}>High Gainers</a></div>
    </div>

    <div className="checkbox" style={{display: 'inline-block'}}>
      <label>
        <input type="checkbox"
          onChange={onTodayCheckedChange}
          checked={isToday} />
        Today&#39;s News Only
      </label>
    </div>

    <div className='pull-right' style={{width: '240px', marginTop: '5px'}}>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Ticker"
          value={typedTicker}
          onChange={onSearchedTickerChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-default" onClick={onTickerSearch}>Search News</button>
        </span>
      </div>
    </div>

    <div className='clearfix'></div>

    <div className="dashboardnews1" style={{marginTop: 10}}>
    {
      newsList != null && !isGroupedNews &&
      newsList.filter(item => !isToday || isToday && item.is_news_today).map((item, i) =>
        <NewsItemUI item={item} key={i} showTicker='true' />
      )
    }
    {
      newsList != null && isGroupedNews &&
      newsList.filter(item => !isToday || isToday && item.is_news_today).map((item, i) =>
        <NewsItemGroupedUI item={item} key={i} onMoreLessClick={onMoreLessClick} />
      )
    }
    {
      newsList != null &&
      newsList.filter(item => !isToday || isToday && item.is_news_today).length === 0 &&
      <div style={{marginTop: 100}} className='text-center'>
        No news today
      </div>
    }
    {
      newsList != null &&
      newsList.length == 0 &&
      <div style={{marginTop: 100}} className='text-center'>
        No recent news
      </div>
    }
    </div>
  </div>

export default NewsPanelUI;
