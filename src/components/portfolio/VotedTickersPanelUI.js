import React from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import { Link } from "react-router-dom";
import PanelUI from '../widgets/panel/PanelUI.js'
import DataCellUI from '../widgets/table/DataCellUI.js'
import TickerCellPopoverUI from '../widgets/table/TickerCellPopoverUI.js'
import ValueChangeCellUI from '../widgets/table/ValueChangeCellUI.js'

const VotedTickersPanelUI = ({anonymous, tickerList, newTickers, onAddTickersEdit, onAddTickersSubmit, addTickersSuccess, addTickersError}) =>
  <PanelUI title='Vote your Stock'>
    <table style={{width: '100%'}}>
      {
        tickerList.map((ticker, i) =>
          <tbody key={i}>
            <VotedTickersTableRowUI
              item={ticker}
            />
          </tbody>
        )
      }
    </table>

    {
      !anonymous &&
      <div style={{ 'textAlign' : 'center'}}>
        <form className="form-inline" style={{display: 'inline-block', margin : '15px 0 10px 0'}}>
          <div className="form-group">
            <input type="text" id="add_tickers_wl"
              className="form-control"
              placeholder="Ticker"
              value={newTickers}
              onChange={onAddTickersEdit} />
          </div>{' '}
          <button type="submit" className="btn btn-primary" onClick={onAddTickersSubmit}>
            Vote
          </button>
        </form>
        {
          addTickersSuccess &&
          <p className='text-success'>{addTickersSuccess}</p>
        }
        {
          addTickersError &&
          <p className='text-danger'>{addTickersError}</p>
        }
      </div>
    }

    {
      anonymous &&
      <p className='text-center'>
        <br/>
        <Link to='/login'>Login or sign up</Link> to vote your favorite stock
      </p>
    }
  </PanelUI>

const VotedTickersTableRowUI = ({item}) =>
  <tr>
    <TickerCellPopoverUI ticker={item.ticker} />
    <DataCellUI value={item.company_name} />
    <ValueChangeCellUI value={item.close_formatted} />
    <ValueChangeCellUI changePercent={item.price_pct_increase_over_last_day} />
    <td width='20%' className='text-right'>
      {item.vote_counts}
    </td>
  </tr>

export default VotedTickersPanelUI;
