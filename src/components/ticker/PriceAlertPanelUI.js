import React from 'react';
import {Button} from 'react-bootstrap';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import PanelUI from '../widgets/panel/PanelUI.js'
import PanelTickerTable from '../widgets/panel/PanelTickerTable.js';

const tooltips = {
     status: (<Popover id="trade_status"><span>Share with others?</span></Popover>),
    };

const PriceAlertPanelUI = props =>
  <PanelUI title='Price Alert' wide={true}>
    <form className="form-inline">
      <div className="form-group" style={{'marginRight' : '12px'}}>
        <label>Low &nbsp;</label>{' '}
        <input type="text" size="8" className="form-control"
        onChange={props.onBuyPriceEdit} />
      </div>

      <div className="form-group" style={{'marginRight' : '12px'}}>
        <label>High &nbsp;</label>{' '}
        <input type="text" size="8" className="form-control"
        onChange={props.onSellPriceEdit} />
      </div>{' '}

      <div className="form-group">
        <Button bsStyle="primary" onClick={props.onPublish}>Save</Button>
      </div>

      {
        props.successMessage &&
        <span className='text-success'><br/>{props.successMessage}</span>
      }
      {
        props.errorMessage &&
        <span className='text-danger'><br/>{props.errorMessage}</span>
      }
    </form>

    {
      /* props.alertList && props.alertList.length > 0 && */
      <div style={{marginTop: 30}}>
        <PanelTickerTable
          context={props.context}
          title='All Alerts'
          noDataMsg='No alert to display'
          tickerList={props.alertList}
          wide={true}
          popoverPlacement='left'
          columnList={new Set(['buy_price', 'sell_price'])}
          onRemoveTicker={props.onRemoveAlert}
          anonymousMsg={<h4><a href='/login'>Login or sign up to setup alerts</a></h4>}
        />
      </div>
    }
  </PanelUI>

  // onRemoveTicker={this.handleRemoveTicker}


const PriceAlertTableUI1 = ({alertList}) =>
  <div>
    {
      alertList && alertList.length > 0 &&
      <table className="table table-hover" style={{marginTop: 40}}>
        <tbody>
          <tr>
            <th></th>
            <th>Close</th>
            <th>Chg%</th>
            <th>Low Alert</th>
            <th>High Alert</th>
          </tr>
        </tbody>

        {
          alertList.map((alert, i) =>
            <tbody>
              <tr>
                <td>{alert.ticker}</td>
                <td>{alert.close_formatted}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          )
        }
      </table>
    }
  </div>




export default PriceAlertPanelUI;
