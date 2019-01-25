import React from 'react';
import { withHighcharts, HighchartsChart, HighchartsStockChart, Chart,
         Title, Subtitle, Legend, XAxis, YAxis, LineSeries, Tooltip,
         RangeSelector, AreaSplineSeries, SplineSeries, Navigator} from 'react-jsx-highstock';
import Highcharts from 'highcharts/highstock';

// https://www.npmjs.com/package/react-jsx-highcharts
// https://www.npmjs.com/package/react-jsx-highstock
const TestPageUI = ({ data1, data2 }) =>
  <HighchartsStockChart>
    <Chart onClick={this.handleClick} zoomType="x" />

      <Title>Highstocks Example</Title>

      <Legend>
        <Legend.Title>Key</Legend.Title>
      </Legend>

      <RangeSelector>
        <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
        <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
        <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
        <RangeSelector.Button type="all">All</RangeSelector.Button>
        <RangeSelector.Input boxBorderColor="#7cb5ec" />
      </RangeSelector>

      <Tooltip />

     <XAxis>
       <XAxis.Title>Time</XAxis.Title>
     </XAxis>

     <YAxis id="price">
       <YAxis.Title>Price</YAxis.Title>
       <AreaSplineSeries id="profit" name="Profit" data={data1} />
     </YAxis>

     <YAxis id="social" opposite>
       <YAxis.Title>Social Buzz</YAxis.Title>
       <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
     </YAxis>

     <Navigator>
       <Navigator.Series seriesId="profit" />
       <Navigator.Series seriesId="twitter" />
     </Navigator>
  </HighchartsStockChart>

const TestPageUI1 = () =>
    <HighchartsChart>
      <Chart />

      <Title>Solar Employment Growth by Sector, 2010-2016</Title>

      <Subtitle>Source: thesolarfoundation.com</Subtitle>

      <Legend layout="vertical" align="right" verticalAlign="middle" />

      <XAxis>
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis id="number">
        <YAxis.Title>Number of employees</YAxis.Title>
        <LineSeries id="installation" name="Installation" data={[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]} />
        <LineSeries id="manufacturing" name="Manufacturing" data={[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]} />
        <LineSeries id="sales-distribution" name="Sales & Distribution" data={[11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]} />
        <LineSeries id="project-development" name="Project Development" data={[null, null, 7988, 12169, 15112, 22452, 34400, 34227]} />
        <LineSeries id="other" name="Other" data={[12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]} />
      </YAxis>
    </HighchartsChart>

    // export default withHighcharts(TestPageUI, Highcharts);
    export default TestPageUI;
