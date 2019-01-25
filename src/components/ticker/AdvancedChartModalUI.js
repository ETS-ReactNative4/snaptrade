import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger, Modal } from 'react-bootstrap'
/* https://www.npmjs.com/package/highcharts-react-official */
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

const AdvancedChartModalUI = ({isLoading, ticker, showChartModal, onHideChartModal, options
  }) =>
  <Modal show={showChartModal} onHide={onHideChartModal} style={{marginTop:"80px"}}>
    <Modal.Header closeButton>
      <Modal.Title>{ticker}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div>
    {
      !isLoading &&
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    }
    </div>
    </Modal.Body>
  </Modal>

export default AdvancedChartModalUI;
