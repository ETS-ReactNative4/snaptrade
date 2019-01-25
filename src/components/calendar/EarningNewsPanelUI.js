import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import NewsItemUI from '../news/NewsItemUI.js'

const EarningNewsPanelUI = ({ticker, newsList, relevance, onRelevanceClick, onDateClick}) =>
  <div style={{marginTop: 20}}>
    {
      newsList &&
      <div>
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
    }
    {
      newsList && newsList.length === 0 &&
      <div style={{marginTop: '100px'}}>
      No news available
      </div>
    }
  </div>

export default EarningNewsPanelUI;
