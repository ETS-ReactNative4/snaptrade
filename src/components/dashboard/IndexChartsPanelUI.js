import React from 'react';
import { DotLoader } from 'react-spinners';
import Constants from '../common/Constants.js';
import ValueChangeUI from '../widgets/ValueChangeUI.js';

const IndexChartsPanelUI = ({indexList}) =>
  <div style={{display: 'inline-block', margin: 'auto'}}>
  {
    indexList.map((item, i) =>
        <IndexItemUI key={i}
          item={item}
        />
    )
  }
  </div>

const IndexItemUI = ({item}) =>
  <div className='index-item'>
    {/* <img src={'http://s3.amazonaws.com/' + item.chart_url} width={120} />
    <br/> */}
    {item.company_name}{': '}
    <ValueChangeUI
      value={item.close_formatted}
      change={item.price_increase_over_last_day}
      changePercent={item.price_pct_increase_over_last_day}
    />
  </div>

export default IndexChartsPanelUI;
