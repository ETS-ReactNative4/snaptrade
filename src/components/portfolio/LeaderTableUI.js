import React from 'react';
import { Glyphicon,Table, OverlayTrigger } from 'react-bootstrap';
import Format from '../common/Format.js'
import ValueChangeCellUI from '../widgets/table/ValueChangeCellUI.js'
import FoldUnfoldCellUI from '../widgets/table/FoldUnfoldCellUI.js'

const LeaderTableUI = ({leaderList, onUserUnfold, onUserFold}) =>
  <Table responsive bordered condensed hover>
    <LeaderTableHeaderUI />
    {
      leaderList.map((leader, i) =>
        <tbody key={i}>
          <LeaderTableRowUI
            leader={leader}
            onUserUnfold={onUserUnfold}
            onUserFold={onUserFold}
          />
          { leader.tickerList &&
            <LeaderTableRowTickerListUI
              tickerList={leader.tickerList}
            />
          }
        </tbody>
      )
    }
  </Table>

const LeaderTableHeaderUI = () =>
  <tbody>
    <tr>
      <th className='text-left' >Leader</th>
      <th className='text-right'>Account Value</th>
      <th className='text-right'>Gain</th>
      <th className='text-right'>Gain%</th>
      <th className='text-right'>Rank</th>
      </tr>
  </tbody>

const LeaderTableRowUI = ({leader, onUserUnfold, onUserFold}) =>
  <tr>
    <FoldUnfoldCellUI
      id={leader.uuid}
      folded={leader.folded}
      children={leader.nickname}
      onUnfold={onUserUnfold}
      onFold={onUserFold}
    />

    <td className='text-right text-nowrap'>
      <span>{leader.account_value}</span>
    </td>

    <td className='text-right text-nowrap'>
      <span>{leader.gain_amount}</span>
    </td>

    <td className='text-right text-nowrap'>
      <span>{/*Format.percent(*/}{leader.gain_percentage}{/*)*/}</span>
    </td>

    <td className='text-right text-nowrap'>
      <span>{leader.contest_rank}</span>
    </td>

  </tr>

const LeaderTableRowTickerListUI = ({ tickerList }) =>
  <tr>
    <td colSpan='13'>
      {
        tickerList.map((ticker, i) =>
          <span key={i}>
            {ticker.ticker}
            <ValueChangeCellUI changePercent={ticker.gain_percentage} />
            <br/>
          </span>
        )
      }
    </td>
  </tr>


export default LeaderTableUI;
