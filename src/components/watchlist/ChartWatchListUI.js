import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import {Glyphicon, OverlayTrigger, Popover} from 'react-bootstrap'
/* https://www.npmjs.com/package/highcharts-react-official */
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';
import HeaderCellSortUI from "../widgets/table/MainTickerTableUI";

const ChartWatchListUI = ({tooltip,isLoading, options}) =>
    <div>
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
    </div>

const loaderCont = {
    height : '200px',
    width : '100%',
    padding : '120px 0 120px 300px',
    margin : 'auto'
}

export default ChartWatchListUI;
