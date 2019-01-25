import React from 'react';
import { Glyphicon,Table, OverlayTrigger } from 'react-bootstrap';
import TickerPanel from '../tickerfolded/TickerPanel.js';
import Format from '../common/Format.js'

const ShareTableUI = ({shareeList, onDeleteShareeSubmit}) =>
  <div>
    <h4>Shared With</h4>
    {
      shareeList.map((share, i) =>
        <div key={i}>
          <ShareTableRowUI
            item={share}
            onDeleteShareeSubmit={onDeleteShareeSubmit}
          />
        </div>
      )
    }
  </div>

const ShareTableRowUI = ({item, onDeleteShareeSubmit}) =>
  <div>
      {item.friend_email}{' '}

      <a href='#remove' onClick={onDeleteShareeSubmit}>
      <Glyphicon glyph="remove" data-user_id={item.friend_userid} /></a>
  </div>

export default ShareTableUI;
