import React from 'react';
import { Table, Panel } from 'react-bootstrap';
import Format from '../common/Format.js'
import SpinnerUI from '../widgets/SpinnerUI.js'
import PanelUI from '../widgets/panel/PanelUI.js'

const PriceHistoryPanelUI = ({ collapsed, priceList }) =>
  <PanelUI title='Historical Prices' wide={true}>
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
  </PanelUI>

const PriceTableHeaderUI = () =>
  <tbody>
  <tr>
    <th>Date</th>
    <th className='text-right'>Close</th>
    <th className='text-right'>Chg%</th>
    <th className='text-right'>Vol</th>
    <th className='text-right'>Vol%</th>
    <th className='text-right'>High</th>
    <th className='text-right'>Low</th>
  </tr>
  </tbody>

const PriceTableRowUI = ({price}) =>
  <tr>
    <td className='text-nowrap'>{price.date}</td>
    <td className='text-right'>{price.close !== 0 ? Format.value(price.close) : 'NA'}</td>
    <td className='text-right'>
      <span className={price.price_pct_increase_over_last_day < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(price.price_pct_increase_over_last_day)}
      </span>
    </td>
    <td className='text-right'>{price.volume_formatted}</td>
    <td className='text-right'>
      <span className={price.volume_pct_increase_over_avg < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(price.volume_pct_increase_over_avg)}
      </span>
    </td>
    <td className='text-right'>{Format.value(price.high)}</td>
    <td className='text-right'>{Format.value(price.low)}</td>
    {/*<td>{price.volume !== 0 ? price.volume_formatted: 'NA'}</td>*/}

  </tr>

export default PriceHistoryPanelUI;
