import React from 'react';
import { Table, Panel } from 'react-bootstrap';
import Format from '../common/Format.js'
import SpinnerUI from '../widgets/SpinnerUI.js'

const PriceTableUI = ({ collapsed, priceList }) =>
  <div>
    <h3>Historical Prices</h3>
    <div className="panel panel-default">
      <div className="panel-body">
        { !priceList && <SpinnerUI /> }
        {
          priceList &&
          <Table responsive>
            <PriceTableHeaderUI />
            {
              priceList.map((price, i) =>
                i < 30 &&
                <tbody key={i}>
                  <PriceTableRowUI rownum={i} price={price} />
                </tbody>
              )
            }
          </Table>
        }
      </div>
    </div>
  </div>

const PriceTableHeaderUI = () =>
  <tbody>
  <tr>
    <th>Date</th>
    <th>Open</th>
    <th>High</th>
    <th>Close</th>
    <th>Chg%</th>
    <th>Vol</th>
    <th>Vol Chg% (Over 30d Avg)</th>
  </tr>
  </tbody>

const PriceTableRowUI = ({price}) =>
  <tr>
    <td>{price.date}</td>
    <td>{price.open}</td>
    <td>{price.high}</td>
    <td>{price.close !== 0 ? price.close: 'NA'}</td>
    <td>
      <span className={price.price_pct_increase_over_last_day < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(price.price_pct_increase_over_last_day)}
      </span>
    </td>
    <td>{price.volume !== 0 ? price.volume_formatted: 'NA'}</td>
    <td>
      <span className={price.gain_volume_percentage < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(price.gain_volume_percentage)}
      </span>
    </td>

  </tr>

export default PriceTableUI;
