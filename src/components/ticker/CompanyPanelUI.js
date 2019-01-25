import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger } from 'react-bootstrap'
import ToolTipUI from '../widgets/ToolTipUI.js'

const CompanyPanelUI = ({tickerInfo}) =>
  <PanelUI title={tickerInfo ? tickerInfo.company_name : ''} wide={true}>
  {
    tickerInfo &&
    <div>
      <table>
        <RowUI label='Sector'>{tickerInfo.sector}</RowUI>
        <RowUI label='Industry'>{tickerInfo.industry}</RowUI>
        <RowUI label='Country'>{tickerInfo.address_country}</RowUI>
        <RowUI label='Is in S&P 500?'>{tickerInfo.is_sp_500 === 'N' ? 'No': 'Yes'}</RowUI>
        <RowUI label='Earnings Transcript'><a href={tickerInfo.earnings_transcript_url}>Link</a></RowUI>
        <RowUI label='Stock Exchange'>{tickerInfo.stock_exchange}</RowUI>
        <RowUI label='Employees'>{tickerInfo.employee_count}</RowUI>
        <RowUI label='CEO'>{tickerInfo.ceo}</RowUI>
        <RowUI label='Website'><a href={tickerInfo.company_url}>{tickerInfo.company_url}</a></RowUI>
      </table><br/>



      {tickerInfo.short_desc}
    </div>
  }
  </PanelUI>

  const RowUI = ({label, tooltipId, tooltip, children}) =>
    <tbody>
      <tr>
        <td className="text-right text-nowrap" style={{verticalAlign: 'top'}}>
          {label}
          {
            tooltip &&
            <span>{' '}
              <ToolTipUI tooltipId='tooltipId' tooltip={tooltip} />
            </span>
          }
        </td>
        <td style={{width:'15px'}}></td>
        <td>{children}</td>
      </tr>
    </tbody>

export default CompanyPanelUI;
