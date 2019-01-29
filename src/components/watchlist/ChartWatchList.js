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
       console.warn(this.props.tagId);
        return (
            <ChartPanelUI
                isLoading={this.state.isLoading}
                options={options}
            />
        );
    }

    componentWillMount() {
        console.log('perf', 'calling 1yr', new Date());
        watchlist_portfolio.get(this.getTickerChartCallback, this.props.tagId);
    }

    test = (ticker, selectedPeriod, priceList) => {
        console.warn(ticker, selectedPeriod, priceList)
    };

    getOptionsSeries() {
        let s = [
            {
                data: [],
                onSeries: 'dataseries',
                shape: 'circlepin',
                events: {
                    mouseOut: (e) => {
                        let chart = e.target.chart;
                        if (!chart.lbl) {
                            chart.lbl = chart.renderer.label('')
                                .attr({
                                    translateY:23
                                })
                                .css({
                                    color: '#FFFFFF',

                                })
                                .add();
                        }
                        chart.lbl
                            .show()
                            .attr({
                                y:60,
                                text: '<p style="font-size:30px">' + '$' + e.target.data[0].y + "</p>" + "<br/>" + '<p style="font-size:10px; color:#1a1c20">' + '$' + '</p>' + "<br/>" + (e.target.data[0].portfoliogai > 0 ? '<p style="font-size:10px; color:#6c9;">' : '<p style="font-size:10px; color:#e44;">') + "$" + e.target.data[0].portfoliogain + "(" + e.target.data[0].portfoliogainpct.toFixed(1) + "%" + ")" + "</p>"
                            });
                    }
                },
                point: {
                    events: {
                        mouseOver: (e) => {
                            let chart = e.target.series.chart;
                            if (!chart.lbl) {
                                console.warn(chart.renderer)
                                chart.lbl = chart.renderer.label('')
                                    .attr({
                                        translateY:23
                                    })
                                    .css({
                                        color: '#FFFFFF',
                                    })
                                    .add();
                            }
                            chart.lbl
                                .show()
                                .attr({
                                    y:60,
                                    text: '<p style="font-size:30px">' + '$' + e.target.y + "</p>" + "<br/>" + '<p style="font-size:10px; color:#1a1c20">' + '$' + '</p>' + "<br/>" + (e.target.portfoliogai > 0 ? '<p style="font-size:10px; color:#6c9;">' : '<p style="font-size:10px; color:#e44;">') + "$" + e.target.portfoliogain + "(" + e.target.portfoliogainpct.toFixed(1) + "%" + ")" + "</p>"
                                });
                        },

                    }
                },
                tooltip: {
                    pointFormat: '<div>portfolio gain: {point.portfoliogain}<br/> portfolio gain pct: {point.portfoliogainpct}</div>'
                },
            },
        ];
        return s
    }

    // getOptionsRangeSelector() {
    //     let s = {
    //         buttons: [
    //             {
    //                 type: 'month',
    //                 count: 1,
    //                 text: '1m'
    //             }, {
    //                 type: 'month',
    //                 count: 3,
    //                 text: '3m'
    //             }, {
    //                 type: 'month',
    //                 count: 6,
    //                 text: '6m'
    //             }, {
    //                 type: 'ytd',
    //                 count: 1,
    //                 text: 'YTD'
    //             }, {
    //                 type: 'year',
    //                 count: 1,
    //                 text: '1y'
    //             }, {
    //                 type: 'all',
    //                 count: 1,
    //                 text: '5y'
    //             }
    //         ],
    //         selected: 4,
    //         inputEnabled:false
    //     }
    //     return s
    // }
    //



    // https://www.highcharts.com/docs/chart-and-series-types/technical-indicator-series
    getTickerChartCallback(priceList) {
        console.log('perf', 'received', new Date());

        let priceListAsc = priceList.slice();
        console.warn(priceListAsc[0])
        let newArray = priceListAsc.map(price => ({
            "x": Date.parse(price.date),
            y: Number.parseFloat(price.portfolio_value),
            portfoliogain: price.portfolio_gain,
            portfoliogainpct: price.portfolio_pct_gain
        }));

        options.yAxis = [{title: {text: ''}}];
        options.series = this.getOptionsSeries();
        // options.rangeSelector = this.getOptionsRangeSelector();
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
        height: '300px'
    },
    exporting: {
        enabled: false
    },
}

export default ChartWatchList;
