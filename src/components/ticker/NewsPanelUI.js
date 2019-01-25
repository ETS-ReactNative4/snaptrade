import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import Constants from '../common/Constants.js';
import NewsItemUI from '../news/NewsItemUI.js'

const NewsPanelUI = ({newsList, relevance, onRelevanceClick, onDateClick}) =>
  <div>
    <a name="news"></a>
    <h3>News</h3>

    <div className='text-right'>
    { relevance === 1 && <span>Relevance</span> }
    { relevance === 0 && <a href='#relevance' onClick={onRelevanceClick}>Relevance</a> }
    {' '} | {' '}
    { relevance === 0 && <span>Date</span> }
    { relevance === 1 && <a href='#date' onClick={onDateClick}>Date</a> }
    </div>

    {
      newsList.map((item, i) =>
        <NewsItemUI item={item} key={i} showTicker={false} />
      )
    }
  </div>

export default NewsPanelUI;
