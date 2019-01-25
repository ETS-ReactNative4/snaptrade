import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import ValueChangeCellUI from '../widgets/table/ValueChangeCellUI.js'
import { Link } from "react-router-dom";

const SignalsUI = ({signalList}) =>
  <PanelUI title='Hot Stocks'>
    <table class="table">
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

const SignalListTableRowUI = ({item}) =>
  <tr>
    <td>
      <Link to={'/ticker/' + item.ticker}>{item.ticker}</Link>
    </td>
    <td>
      {item.close_formatted}
    </td>
    <ValueChangeCellUI changePercent={item.price_gain_percentage} />
  </tr>

export default SignalsUI;
