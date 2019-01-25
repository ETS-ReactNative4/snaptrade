import React from 'react';
import { withHighcharts, HighchartsChart, HighchartsStockChart, Chart,
         Title, Subtitle, Legend, XAxis, YAxis, LineSeries, Tooltip,
         RangeSelector, AreaSplineSeries, SplineSeries, Navigator} from 'react-jsx-highstock';
import { DotLoader } from 'react-spinners';

const loaderCont = {
  height : '320px',
  width : '320px',
  padding : '120px',
  margin : 'auto'
}
// line 17-25  after <div> may cause issue if react-spinner not installed

// https://www.npmjs.com/package/react-spinners
// https://api.highcharts.com/highstock/
// https://www.npmjs.com/package/react-jsx-highstock
const HSChartHeaderUI = ({selectedPeriod,
    on1DayClick, on30DayClick, on7DayClick, on1YearClick, onShowChartModal
  }) =>
  <span>
    <button type="button" className="btn btn-default btn-xs" onClick={on1DayClick}
      disabled={selectedPeriod==='1d' ? "disabled" : ''}>1d</button>{' '}
    <button type="button" className="btn btn-default btn-xs" onClick={on7DayClick}
      disabled={selectedPeriod==='7d' ? "disabled" : ''}>7d</button>{' '}
    <button type="button" className="btn btn-default btn-xs" onClick={on30DayClick}
      disabled={selectedPeriod==='30d' ? "disabled" : ''}>30d</button>{' '}
    <button type="button" className="btn btn-default btn-xs" onClick={on1YearClick}
      disabled={selectedPeriod==='1y' ? "disabled" : ''}>1y</button>
    <button type="button" className="btn btn-default btn-xs" onClick={onShowChartModal}
      >Advanced</button>
  </span>
export default HSChartHeaderUI;
