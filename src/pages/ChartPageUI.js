import React from 'react';
import Chart2Panel from '../components/ticker/Chart2Panel.js';

const ChartPageUI = ({context, anonymous, ticker}) =>
    <Chart2Panel anonymous={anonymous} ticker={ticker} />

export default ChartPageUI;
