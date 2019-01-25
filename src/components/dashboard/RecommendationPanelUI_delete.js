import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import ValueChangeCellUI from '../widgets/table/ValueChangeCellUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger } from 'react-bootstrap'
import Constants from '../common/Constants.js';
import TickerCellPopoverUI from '../widgets/table/TickerCellPopoverUI.js'

const RecommendationPanelUI = ({title, signalList, value}) =>
  <PanelUI title={title} cssClass="stock-widget">

  {
    value &&
    <a href={value} className="panel-more-btn">&raquo; More</a>
  }

    <table style={{width: '100%'}}>
      {
        signalList.map((item, i) =>
          <tbody key={i}>
            <SignalListTableRowUI
              item={item}
            />
          </tbody>
        )
      }
    </table>

  </PanelUI>

const popoverClass = {
  width: '600px'
};

const SignalListTableRowUI = ({item}) =>
  <tr>
    <TickerCellPopoverUI ticker={item.ticker} />
    <td className='text-right'>
      {item.close}
    </td>
    <ValueChangeCellUI changePercent={item.pct_increase} />
  </tr>

export default RecommendationPanelUI;
