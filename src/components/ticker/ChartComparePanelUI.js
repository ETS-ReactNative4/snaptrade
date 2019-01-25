import React from 'react';
import { DotLoader } from 'react-spinners';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';
import PanelUI from '../widgets/panel/PanelUI.js'

const ChartComparePanelUI = ({isLoading, options}) =>
  <PanelUI title='Compare with Peers and Dow Jones' wide={true}>
    {
      !isLoading &&
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    }
    {
      isLoading &&
      <div style={loaderCont}>
        <DotLoader
          color='#64b5f6'
          loading={isLoading}
        />
      </div>
    }
  </PanelUI>

const loaderCont = {
  height : '420px',
  width : '100%',
  padding : '120px 0 120px 300px',
  margin : 'auto'
}

export default ChartComparePanelUI;
