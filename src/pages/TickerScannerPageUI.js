import React from 'react';
import PageUI from '../components/widgets/PageUI.js'
import TickerScannerPanel from '../components/scanner/TickerScannerPanel.js'

const TickerScannerPageUI = props =>
  <PageUI>
  {
     <TickerScannerPanel
      context={props.context}
      tag={props.tag}
      sectorList={props.sectorList}
    />

  }

  </PageUI>

export default TickerScannerPageUI;
