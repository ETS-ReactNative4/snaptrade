import React from 'react';
/* https://www.npmjs.com/package/highcharts-react-official */
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

const ChartPeerComparePanelUI = ({isLoading, options}) =>
  <div style={{'margin': '20px 0'}}>
    Compare with Peers
    {
      !isLoading &&
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    }
  </div>

export default ChartPeerComparePanelUI;
