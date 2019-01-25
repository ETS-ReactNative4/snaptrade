import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const LikePanelUI = ({anonymous, objectId, ratingSummary, onThumbsUp, onThumbsDown}) =>
  <div style={{textAlign: 'center', display: 'inline-block'}}>
    {
      ! anonymous &&
      <div style={{display: 'inline-block'}}>
        <div style={{display: 'inline-block', fontSize: "larger"}}>
          <a href='#up' onClick={onThumbsUp}>
            <Glyphicon glyph="thumbs-up" data-objectId={objectId} />
          </a>
          <span style={{verticalAlign: "top"}}>{' '}{ratingSummary.up_count}{' '}</span>
        </div>
        <div style={{display: 'inline-block', marginLeft: '20px', fontSize: "larger"}}>
          <a href='#down' onClick={onThumbsDown}>
            <Glyphicon glyph="thumbs-down" data-objectId={objectId} />
          </a>
          <span style={{verticalAlign: "top"}}>{' '}{ratingSummary.down_count}{' '}</span>
        </div>
      </div>
    }
    {
      anonymous &&
      <div style={{display: 'inline-block'}}>
        <div style={{display: 'inline-block', fontSize: "larger"}}>
          <Glyphicon glyph="thumbs-up" data-objectId={objectId} />
          <span style={{verticalAlign: "top"}}>{' '}{ratingSummary.up_count}{' '}</span>
        </div>
        <div style={{display: 'inline-block', marginLeft: '20px', fontSize: "larger"}}>
          <Glyphicon glyph="thumbs-down" data-objectId={objectId} />
          <span style={{verticalAlign: "top"}}>{' '}{ratingSummary.down_count}{' '}</span>
        </div>
      </div>
    }
  </div>

export default LikePanelUI;
