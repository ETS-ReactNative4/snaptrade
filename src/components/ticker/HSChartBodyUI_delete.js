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
const HSChartBodyUI = ({isLoading, ticker, tickerInfo, selectedPeriod,
  intraDay, hsStockData, on1DayClick, on30DayClick, on1YearClick}) =>
  <div>
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
    <Chart onClick={this.handleClick} zoomType="x" isLoading={isLoading} />

      {/*
      <Title>Highstocks Example</Title>
      */}

      {/*
      <Legend>
        <Legend.Title>Key</Legend.Title>
      </Legend>
      */}

      {/*}
      <RangeSelector>
        { intraDay &&
          <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button> }
        { intraDay &&
        <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
        }
        { !intraDay &&
          <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button> }
        { !intraDay &&
          <RangeSelector.Button type="all">1y</RangeSelector.Button> }
        {/*<RangeSelector.Input boxBorderColor="#7cb5ec" />* /}
      </RangeSelector>
      */}

      <Tooltip />

     <XAxis>
      {/*
     breaks: [{ // Nights
                from: Date.UTC(2011, 9, 6, 16),
                to: Date.UTC(2011, 9, 7, 8),
                repeat: 24 * 36e5
            }, { // Weekends
                from: Date.UTC(2011, 9, 7, 16),
                to: Date.UTC(2011, 9, 10, 8),
                repeat: 7 * 24 * 36e5
            }]
       <XAxis.Title>Time</XAxis.Title>
       */}
     </XAxis>

     <YAxis id="price">
       {/* <YAxis.Title>Price</YAxis.Title> */}
       <LineSeries id="profit" name="Price" data={hsStockData} />
     </YAxis>

     {/*
     <YAxis id="social" opposite>
       <YAxis.Title>Social Buzz</YAxis.Title>
       <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
     </YAxis>
     */}

     {/*
     <Navigator>
       <Navigator.Series seriesId="profit" />
       <Navigator.Series seriesId="twitter" />
     </Navigator>
     */}
     </HighchartsStockChart>
  }

  </div>
export default HSChartBodyUI;
