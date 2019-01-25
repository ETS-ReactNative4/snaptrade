import React from 'react';
import {DotLoader} from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import {Link} from "react-router-dom";
import {OverlayTrigger} from 'react-bootstrap'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

const AnalystsPanelUI = ({options, noData}) =>
    <div>
        <a name="AnalystRatings"/>
        <PanelUI title='Analysts' wide={true}>
            {
                !noData &&
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            }
            {
                noData &&
                <span>No analyst ratings available for this stock</span>
            }

            {/*
      ratings &&
      <span>
      Strong buy: {ratings.analyst_rating_strong_buys}<br/>
      Buy: {ratings.analyst_rating_strong_buys}<br/>
      Hold: {ratings.analyst_rating_holds}<br/>
      Sell: {ratings.analyst_rating_sells}<br/>
      Strong sell: {ratings.analyst_rating_strong_sells}<br/>
      </span>
    */}
        </PanelUI>
    </div>

export default AnalystsPanelUI;
