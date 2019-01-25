import React from 'react';
import { withHighcharts, HighchartsChart, HighchartsStockChart, Chart,
         Title, Subtitle, Legend, XAxis, YAxis, LineSeries, Tooltip,
         RangeSelector, AreaSplineSeries, SplineSeries, Navigator} from 'react-jsx-highstock';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'

const loaderCont = {
  height : '320px',
  width : '320px',
  padding : '120px',
  margin : 'auto'
}
//  after <div> may cause issue if react-spinner not installed

// https://www.npmjs.com/package/react-spinners
// https://api.highcharts.com/highstock/
// https://www.npmjs.com/package/react-jsx-highstock
const AverageAccountChartUI1 = ({isLoading, accountValueList}) =>
  <PanelUI title='Average Account Performance'>
    {
      isLoading &&
      <div style={loaderCont}>
        <DotLoader
          color='#64b5f6'
          loading={isLoading}
        />
      </div>
    }

    {
      ! isLoading &&
      <HighchartsStockChart>
        <Chart isLoading={isLoading} />
        <Tooltip dateTimeLabelFormats='%A, %b %e, %H:%M'/>
        <XAxis type="datetime" />

        <YAxis id="price">
          <LineSeries id="account_value" name="Account Value" data={accountValueList} />
        </YAxis>
      </HighchartsStockChart>
    }

  </PanelUI>
export default AverageAccountChartUI1;
