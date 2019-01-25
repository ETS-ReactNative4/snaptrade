import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Constants from '../common/Constants.js';
import ValueChangeUI from '../widgets/ValueChangeUI.js'

const NewsItemSnippetUI = ({item, noSnippet}) =>
  <div>
    <h4>
      <a href={item.link} target='_blank'>
        <span dangerouslySetInnerHTML={{__html: item.title}}></span>{' '} {' '}
        <span className="small text-muted glyphicon glyphicon-new-window"></span>
      </a>
    </h4>
    <p className='small text-muted' style={{margin: '5px 0'}}>{/*{item.source} - */}{item.pub_time_days_ago}</p>
    {
      !noSnippet &&
      <span dangerouslySetInnerHTML={{__html: item.news_clip}}></span>
    }
  </div>


export default NewsItemSnippetUI;
