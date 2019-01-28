import React, {Component} from 'react';
import ChartPanelUI from './ChartWatchListUI.js';
import watchlist_portfolio from '../../apiclient/watchlist/watchlist_portfolio';

class ChartWatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            eventArray: null,
            data: null,
            ohlcData: null,
            title: {}
        };

        this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
    }

    render() {
        return (
            <ChartPanelUI
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
                                    text: '<p style="font-size:30px;">' + '$' + e.target.y + "</p>" + "<br/>" + (e.target.portfoliogai > 0 ? '<p style="font-size:10px; color:#6c9;">' : '<p style="font-size:10px; color:#e44;">') + "$" + e.target.portfoliogain + "(" + e.target.portfoliogainpct.toFixed(1) + "%" + ")" + "</p>"
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


    // https://www.highcharts.com/docs/chart-and-series-types/technical-indicator-series
    getTickerChartCallback(priceList) {
        console.log('perf', 'received', new Date());

        let priceListAsc = priceList.slice();
            let newArray = priceListAsc.map(price => ({
            x: Date.parse(price.date),
            y: Number.parseFloat(price.portfolio_value),
            portfoliogain: price.portfolio_gain,
            portfoliogainpct: price.portfolio_pct_gain
        }));

        options.yAxis = [{title: {text: ''}}];
        options.series = this.getOptionsSeries();
        options.rangeSelector = false;
        console.warn(newArray)
        options.series[0].data = newArray;
        options.colors = ['#0081f2'];

        console.log('perf', 'draw', new Date());

        this.setState({
            isLoading: false,
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
