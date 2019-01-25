import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";

const TickerTagsPanelUI = ({tickerTagList}) =>
  <div style={{marginBottom: 10}}>
  {
    tickerTagList &&
    <div className='tag-container'>
      {
        tickerTagList.map((tickerTag, i) =>
          <div key={i} className='tag'>
            <Link to={tickerTag.scanner_link.replace('l/w','l%2Fw')}>{tickerTag.tag_display}</Link>
          </div>
        )
      }
    </div>
  }
  </div>

export default TickerTagsPanelUI;
