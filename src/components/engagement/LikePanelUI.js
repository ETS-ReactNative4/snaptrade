import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const LikePanelUI = ({anonymous, objectId,
  ratingSummary, onThumbsUp, onThumbsDown}) =>

  <div style={{textAlign: 'center', display: 'inline-block'}}>
    {
      ! anonymous &&
      <div style={{display: 'inline-block'}}>
        <div style={{display: 'inline-block', marginRight: '20px'}}>
          <a href='#up' onClick={onThumbsUp}>
          {
            <Glyphicon glyph="thumbs-up" data-objectId={objectId} />
          }
          </a>
          <span style={{verticalAlign: "top", fontSize: "larger"}}>{' '}{ratingSummary.up_count}{' '}</span>
          <span className='text-muted small'>{ratingSummary.up_friends}</span>
        </div>
        <div style={{display: 'inline-block'}}>
          <a href='#down' onClick={onThumbsDown}>
          {
            <Glyphicon glyph="thumbs-down" data-objectId={objectId} />
          }
          </a>
          <span style={{verticalAlign: "top", fontSize: "larger"}}>
          {' '}{ratingSummary.down_count}{' '}
          </span>
          <span className='text-muted small' style={{verticalAlign: "top"}}>
          {ratingSummary.down_friends}
          </span>
        </div>
      </div>
    }
  </div>

export default LikePanelUI;
