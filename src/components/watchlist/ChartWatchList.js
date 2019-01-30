import React, {Component} from 'react';
import ChartWatchListUI from './ChartWatchListUI.js';
import watchlist_portfolio from '../../apiclient/watchlist/watchlist_portfolio';
import ChartPanelUI from "../ticker/ChartPanel";



class ChartWatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
        };

        this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
    }

    render() {
        return (
            <ChartWatchListUI
                isLoading={this.state.isLoading}
                options={options}
            />
        );
    }

    componentWillMount() {
        setInterval(()=> {
            watchlist_portfolio.get(this.getTickerChartCallback, this.props.tagId, "1y_a");
        }, 120000);
        console.log('perf', 'calling 1yr', new Date());

        watchlist_portfolio.get(this.getTickerChartCallback, this.props.tagId, "1y_a");
    }


    getOptionsSeries = (newArray) => {
        return [
            {
                data: newArray,
                events: {
                    mouseOut: (e) => {
                        let chart = e.target.chart;
                            if (!chart.lbl) {
                                chart.lbl = chart.renderer.label('')
                                    .attr({
                                        translateY: 23
                                    })
                                    .css({
                                        color: '#FFFFFF',

                                    })
                                    .add();
                            }
                        chart.lbl
                            .show()
                            .attr({
                                x:10,
                                y: 55,
                                text: '<p style="font-size:30px">' + '$' + e.target.data[0].y + "</p>" + "<br/>" + '<p style="font-size:10px; color:#1a1c20">' + '$' + '</p>' + "<br/>" + (e.target.data[0].portfoliogain > 0 ? '<p style="font-size:12px; color:#6c9;">' : '<p style="font-size:12px; color:#e44;">') + "$" + e.target.data[0].portfoliogain + "(" + e.target.data[0].portfoliogainpct.toFixed(1) + "%" + ")" + "</p>"
                            });
                    }
                },
                point: {
                    events: {
                        mouseOver: (e) => {
                            let chart = e.target.series.chart;
                            if (!chart.lbl) {
                                chart.lbl = chart.renderer.label('')
                                    .attr({
                                        translateY: 23
                                    })
                                    .css({
                                        color: '#FFFFFF',
                                    })
                                    .add();
                            }
                            chart.lbl
                                .show()
                                .attr({
                                    x:10,
                                    y: 55,
                                    text: '<p style="font-size:30px">' + '$' + e.target.y + "</p>" + "<br/>" + '<p style="font-size:10px; color:#1a1c20">' + '$' + '</p>' + "<br/>" + (e.target.portfoliogain > 0 ? '<p style="font-size:12px; color:#6c9;">' : '<p style="font-size:12px; color:#e44;">') + "$" + e.target.portfoliogain + "(" + e.target.portfoliogainpct.toFixed(1) + "%" + ")" + "</p>"
                                });
                        },

                    }
                },
                tooltip: {
                    valueDecimals: 2,
                    pointFormat: '<div>portfolio gain: {point.portfoliogain}<br/> portfolio gain pct: {point.portfoliogainpct}</div>'
                },
            },
        ];
    }

    getOptionsRangeSelector = () => {
        return {
            buttons: [
                {
                    type: 'day',
                    count: 7,
                    text: '7d'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'all',
                    count: 1,
                    text: '1y'
                }
            ],
            selected: 3,
            inputEnabled: false
        };
    };

    getYAxis = () => {
        return [
            {
                title: {text: ''},
            },
        ]
    }


    // https://www.highcharts.com/docs/chart-and-series-types/technical-indicator-series
    getTickerChartCallback(priceList) {


        let priceListAsc = priceList.slice();

        let newArray = priceListAsc.reverse().map((price, index) => ({
            x: Date.parse(price.date),
            y: price.portfolio_value,
            portfoliogain: price.portfolio_gain,
            portfoliogainpct: price.portfolio_pct_gain
        }));
        options.yAxis = this.getYAxis()
        options.series = this.getOptionsSeries([])
        options.series[0].data = newArray;
        options.rangeSelector = this.getOptionsRangeSelector();


        options.colors = ['#0081f2'];

        this.setState({data: newArray})

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
    series: [],
    chart: {
        height: '300px'
    },
    exporting: {
        enabled: false
    },
}

export default ChartWatchList;
