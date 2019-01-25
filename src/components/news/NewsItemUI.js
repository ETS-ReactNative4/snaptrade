import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Constants from '../common/Constants.js';
import ValueChangeUI from '../widgets/ValueChangeUI.js'
import NewsItemLeftUI from './NewsItemLeftUI'
import NewsItemSnippetUI from './NewsItemSnippetUI'

const NewsItemUI = ({item, showTicker, smallImage}) =>
  <div className="row" style={{marginBottom: '10px'}}>
    <NewsItemLeftUI item={item} showTicker={showTicker} smallImage={smallImage} />
    <div className="col-sm-9">
      <NewsItemSnippetUI item={item} />
    </div>
  </div>

export default NewsItemUI;
