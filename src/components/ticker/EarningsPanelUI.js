import React from 'react';
import {DotLoader} from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import {Link} from "react-router-dom";
import {OverlayTrigger} from 'react-bootstrap'
/* https://www.npmjs.com/package/highcharts-react-official */
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

const EarningsPanelUI = ({options, noData}) =>
    <div>
        <a name="Earnings"/>
        <PanelUI title='Earnings' wide={true}>
            {
                !noData &&
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            }
            {
                noData &&
                <span>No earnings data available for this stock</span>
            }
        </PanelUI>
    </div>

export default EarningsPanelUI;
