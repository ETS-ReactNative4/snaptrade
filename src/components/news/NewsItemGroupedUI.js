import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Constants from '../common/Constants.js';
import ValueChangeUI from '../widgets/ValueChangeUI.js'
import NewsItemLeftUI from './NewsItemLeftUI'
import NewsItemSnippetUI from './NewsItemSnippetUI'

const NewsItemGroupedUI = ({item, onMoreLessClick}) =>
  <div className="row" style={{marginBottom: '10px'}}>
    <NewsItemLeftUI item={item} showTicker={true} />
    <div className="col-sm-9">
      {
        item.news.map((innerItem, i) =>
          <span key={i}>
            {
              i === 2 &&
              <div style={{marginTop: 10, textAlign: 'right'}}>
                {
                  !item.expanded &&
                  <Link to='#more' data-ticker={item.ticker} onClick={onMoreLessClick}>more {item.ticker} news</Link>
                }
                {
                  item.expanded &&
                  <Link to='#less' data-ticker={item.ticker} onClick={onMoreLessClick}>less</Link>
                }
              </div>
            }
            {
              !innerItem.hide &&
              <NewsItemSnippetUI
                item={innerItem}
                noSnippet={i>0}
              />
            }
          </span>
        )
      }
    </div>
  </div>

export default NewsItemGroupedUI;
