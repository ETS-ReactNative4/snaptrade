import React, {Component} from 'react';
import ChartPanelUI from './ChartWatchListUI.js';
import chart_tickers from '../../apiclient/chart_tickers.js';
import watchlist_portfolio from '../../apiclient/watchlist/watchlist_portfolio.js';

class ChartWatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            eventArray: null,
            data: null,
            ohlcData: null,
            fiveYrLoaded: false,
            title: {}
        };

        this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
    }

    render() {
        console.warn(options)
        return (
            <ChartPanelUI
                title={"123"}
                isLoading={this.state.isLoading}
                options={options}
            />
        );
    }

    componentWillMount() {
        console.log('perf', 'calling 1yr', new Date());
        watchlist_portfolio.get(this.getTickerChartCallback);
    }

    test = (ticker, selectedPeriod, priceList) => {
        console.warn(ticker, selectedPeriod, priceList)
    };

    getOptionsSeries(eventArray) {
        let s = [
            {
                data: eventArray,
                onSeries: 'dataseries',
                shape: 'circlepin',
                point: {
                    events: {
                        mouseOver: (e) => {
                            let chart = e.target.series.chart;
                            if (!chart.lbl) {
                                chart.lbl = chart.renderer.label('')
                                    .attr({
                                        padding: 10,
                                        r: 10,
                                    })
                                    .css({
                                        color: '#FFFFFF',
                                        fontSize: 20,
                                    })
                                    .add();
                            }
                            chart.lbl
                                .show()
                                .attr({
                                    text: '$' + e.target.y + "<br/>" + "$" + e.target.portfoliogain + "(" + e.target.portfoliogainpct.toFixed(1) + "%" + ")"
                                });
                        }
                    }
                },
                tooltip: {
                    pointFormat: '<div>portfolio gain: {point.portfoliogain}<br/> portfolio gain pct: {point.portfoliogainpct}</div>'
                },
            },
        ];
        return s
    }

    text = (e) => {
        // options.title({
        //     text: 'Subtitle'
        // })
    };

    // https://www.highcharts.com/docs/chart-and-series-types/technical-indicator-series
    getTickerChartCallback(priceList) {
        console.warn(priceList)
        console.log('perf', 'received', new Date());

        let priceListAsc = priceList.slice();
        console.warn(priceListAsc);
        let newArray = priceListAsc.map(price => ({
            x: Date.parse(price.date),
            y: price.portfolio_value,
            portfoliogain: price.portfolio_gain,
            portfoliogainpct: price.portfolio_pct_gain
        }))

        options.yAxis = [{title: {text: ''}}];
        options.series = this.getOptionsSeries();
        options.rangeSelector = false;
        options.series[0].data = newArray;
        options.colors = ['#0081f2']

        console.log('perf', 'draw', new Date());

        this.setState({
            isLoading: false,
            fiveYrLoaded: true
        });
    }

}

const options = {
    navigator: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    chart: {
        height: '200px'
    },
    exporting: {
        enabled: false
    },
}

export default ChartWatchList;
