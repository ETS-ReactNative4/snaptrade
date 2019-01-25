import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { OverlayTrigger } from 'react-bootstrap'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

const LiveChartPanelUI = ({isLoading, options}) =>
  <PanelUI title='Paper $ Portfolio'>
  {
    !isLoading &&
    <HighchartsReact
      highcharts={Highcharts}
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
    height : '320px',
    width : '100%',
    padding : '120px 0 120px 300px',
    margin : 'auto'
  }

export default LiveChartPanelUI;
