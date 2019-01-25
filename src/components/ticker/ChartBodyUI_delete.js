import React from 'react';
// import { Panel } from 'react-bootstrap';
import AnyChart from 'anychart-react'
import ChartIntervalBoxUI from './ChartIntervalBoxUI.js'
import { DotLoader } from 'react-spinners';

const loaderCont = {
  height : '320px',
  width : '320px',
  padding : '120px',
  margin : 'auto'
}
// line 17-25  after <div> may cause issue if react-spinner not installed

// https://www.npmjs.com/package/react-spinners
const ChartBodyUI = ({isLoading, ticker, tickerInfo, selectedPeriod, stockData, on1DayClick, on30DayClick, on1YearClick}) =>
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
      !isLoading &&
      <AnyChart
        height={300}
        instance={stockData}
      />
    }
    {
      !isLoading &&
      <ChartIntervalBoxUI
        selectedPeriod={selectedPeriod}
        on1DayClick={on1DayClick}
        on30DayClick={on30DayClick}
        on1YearClick={on1YearClick}
      />
    }
  </div>
export default ChartBodyUI;
