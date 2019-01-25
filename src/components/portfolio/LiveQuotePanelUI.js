import React from 'react';
import { Glyphicon,Table, OverlayTrigger } from 'react-bootstrap';
import Format from '../common/Format.js'
import FoldUnfoldCellUI from '../widgets/table/FoldUnfoldCellUI.js'
import PanelUI from '../widgets/panel/PanelUI.js'

const LiveQuotePanelUI = ({tickerList, folded, onTickerFold, onTickerUnfold}) =>
  <PanelUI title='Live Quote'>
  <Table bordered>
    <LiveQuotePanelHeaderUI />
    {
      tickerList.map((ticker, i) =>
        <tbody key={i}>
          <LiveQuotePanelRowUI
            ticker={ticker}
            folded={folded}
            onTickerFold={onTickerFold}
            onTickerUnfold={onTickerUnfold}
          />
          {
            ! ticker.folded &&
            <LiveQuotePanelRowTxnsUI
              txnList={ticker.txnList}
            />
          }
        </tbody>
      )
    }
  </Table>
  </PanelUI>

const LiveQuotePanelHeaderUI = () =>
  <tbody>
    <tr>
      <th className='text-left'>Ticker</th>
      <th className='text-right'>Quantity</th>
      <th className='text-right'>Current Price</th>
      <th className='text-right'>Market Value</th>
    </tr>
  </tbody>

const LiveQuotePanelRowUI = ({ticker, folded, onTickerFold, onTickerUnfold}) =>
  <tr>
    <FoldUnfoldCellUI
      id={ticker.ticker}
      folded={ticker.folded}
      children={ticker.ticker}
      onUnfold={onTickerUnfold}
      onFold={onTickerFold}
    />

    <td className='text-right text-nowrap'>
      <span>{ticker.quantity}</span>
    </td>
    <td className='text-right text-nowrap'>
      <span>${ticker.price}</span>
    </td>
    <td className='text-right text-nowrap'>
      <span>${ticker.current_value}</span>
    </td>
    { /* <td className='text-left text-nowrap'>
      <span>${ticker.cost}</span>
    </td>

      <td className='text-left text-nowrap'>
          <span className={ticker.gain_percentage < 0 ? 'text-danger' : 'text-success'}>
          ${ticker.gain}, ({ticker.gain_percentage}%)
        </span>
      </td>
    */}
  </tr>

const LiveQuotePanelRowTxnsUI = ({ txnList }) =>
  <tr>
    <td colSpan='13'>
      <Table responsive bordered condensed hover>
      <tr>
      <th>Date</th>
      <th>Buy/Sell</th>
      <th className='text-right'>Quantity</th>
      <th className='text-right'>Price</th>
      <th className='text-right'>Total</th>
      </tr>
      {
        txnList.map((txn, i) =>
          <tr key={i}>
          <td>{txn.txn_date}</td>
          <td>{txn.action}</td>
          <td className='text-right'>{txn.quantity}</td>
          <td className='text-right'>{txn.price}</td>
          <td className='text-right'>{txn.total_paid}</td>
          </tr>
        )
      }
      </Table>
    </td>
  </tr>

export default LiveQuotePanelUI;
