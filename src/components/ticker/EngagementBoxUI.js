import React from 'react';
import Format from '../common/Format.js'
import LikePanelUI from '../engagement/LikePanelUI.js';
import { Glyphicon } from 'react-bootstrap';

const EngagementBoxUI = ({ anonymous,
  // ratings
  ticker, ratingSummary, onThumbsUp, onThumbsDown,
  // share and comments
  onShareClick, onCommentsClick

}) =>
  
  <div className="engagementToolbar">
    <ul>
    


       <li>
        <LikePanelUI
          anonymous={anonymous}
          objectId={ticker}
          ratingSummary={ratingSummary}
          onThumbsUp={onThumbsUp}
          onThumbsDown={onThumbsDown}
        /></li> 
     

        <li>
          <a href="#" onClick={onCommentsClick}>
          <Glyphicon glyph="comment" className='text-muted' onClick={onCommentsClick}/> Comment</a>
        </li>
        <li><a href="#" onClick={onShareClick}><Glyphicon glyph="share-alt" className='text-muted' onClick={onShareClick}/> Share </a>
        </li>
        <div className="clearfix"></div>
    </ul>

  </div>

export default EngagementBoxUI;
