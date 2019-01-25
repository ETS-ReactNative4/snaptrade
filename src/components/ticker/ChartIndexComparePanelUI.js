import React from 'react';
/* https://www.npmjs.com/package/highcharts-react-official */
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

const ChartIndexComparePanelUI = ({isLoading, options}) =>
  <div style={{'margin': '20px 0'}}>
    Compare with Dow Jones
    {
      !isLoading &&
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    }
  </div>

export default ChartIndexComparePanelUI;
