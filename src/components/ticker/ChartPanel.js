import React, {Component} from 'react';
import ChartPanelUI from './ChartPanelUI.js';
import chart_tickers from '../../apiclient/chart_tickers.js';

class ChartPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            indicator: this.props.indicator,
            ticker: this.props.ticker,
            eventArray: null,
            data: null,
            ohlcData: null,
            fiveYrLoaded: false
        };

        this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
        this.drawIndicator = this.drawIndicator.bind(this);
    }

    render() {
        return (
            <ChartPanelUI
                isLoading={this.state.isLoading}
                ticker={this.props.ticker}
                options={options}
            />
        );
    }

    componentWillMount() {
        console.log('perf', 'calling 1yr', new Date());
        chart_tickers.get(this.getTickerChartCallback, this.props.ticker, '1y_a');
    }

    componentWillReceiveProps(props) {
        if (props.indicator !== this.state.indicator) {
            this.setState({indicator: props.indicator, isLoading: true})
            setTimeout(this.drawIndicator, 1)
        }
    }

    //options.colors = ['#0081f2', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
    //'#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']

    drawIndicator() {
        let eventArray = this.state.eventArray;
        options.series = this.getOptionsSeries(eventArray);
        // options.rangeSelector = this.getOptionsRangeSelector();

        options.series[0].data = this.state.data;
        options.chart.height = '420px'
        console.log(this.state.indicator);
        if (this.state.indicator === '50dsma') {
            options.yAxis = this.getYAxis()
            options.plotOptions = {
                sma: {color: '#8bbc21'}
            }
            options.series.push(
                {
                    type: 'sma',
                    linkedTo: 'dataseries',
                    params: {
                        period: 50
                    }
                }
            )
        }
        if (this.state.indicator === '100dsma') {
            options.yAxis = this.getYAxis()
            options.plotOptions = {
                sma: {color: '#8bbc21'}
            }
            options.series.push(
                {
                    type: 'sma',
                    linkedTo: 'dataseries',
                    params: {
                        period: 150
                    }
                }
            )
        }
        if (this.state.indicator === '50dema') {
            options.yAxis = this.getYAxis()
            options.plotOptions = {
                ema: {color: '#8bbc21'}
            }
            options.series.push(
                {
                    type: 'ema',
                    linkedTo: 'dataseries',
                    params: {
                        period: 50
                    }
                }
            )
        }
        if (this.state.indicator === '100dema') {
            options.yAxis = this.getYAxis()
            options.plotOptions = {
                ema: {color: '#8bbc21'}
            }
            options.series.push(
                {
                    type: 'ema',
                    linkedTo: 'dataseries',
                    params: {
                        period: 100
                    }
                }
            )
        }
        if (this.state.indicator === 'macd') {
            options.yAxis = this.getYAxisMACD()
            options.series.push(
                {
                    type: 'macd',
                    linkedTo: 'dataseries',
                    yAxis: 1,
                }
            )
            options.chart.height = '560px'
        }
        if (this.state.indicator === 'rsi') {
            options.yAxis = this.getYAxisRSI()
            options.series.push(
                {
                    type: 'rsi',
                    linkedTo: 'dataseries',
                    yAxis: 1,
                }
            )
        }
        if (this.state.indicator === 'candlestick') {
            options.yAxis = this.getYAxis()
            options.series[0].data = this.state.ohlcData;
            console.log(options.series[0].data);
            options.series[0].type = 'candlestick';
            options.plotOptions = {
                candlestick: {
                    color: '#f44',
                    upColor: '#4f4',
                    upLineColor: '#888'
                }
            }
        }
        console.log(options);
        this.setState({isLoading: false, options: options})
    }

    getOptionsSeries(eventArray) {
        let s = [
            {
                name: this.state.ticker,
                data: [],
                // tooltip: {
                //     valueDecimals: 2
                // },
                id: 'dataseries'
            },
            {
                type: 'flags',
                data: eventArray,
                onSeries: 'dataseries',
                shape: 'circlepin',
                width: 12
            },
        ];
        return s
    }

    getOptionsRangeSelector() {
        let s = {
            buttons: [
                {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'ytd',
                    count: 1,
                    text: 'YTD'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    count: 1,
                    text: '5y'
                }
            ],
            selected: 4,
            inputEnabled: false
        }
        return s
    }

    getYAxis() {
        let s = [
            {
                title: {text: ''},
            },
        ]
        return s
    }

    getYAxisMACD() {
        let s = [
            {
                height: '75%',
                resize: {
                    enabled: true
                },
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: ''
                }
            }, {
                top: '75%',
                height: '25%',
                labels: {
                    align: 'right',
                    x: -3
                },
                offset: 0,
                title: {
                    text: 'MACD'
                }
            }
        ]
        return s
    }

    getYAxisRSI() {
        let s =
            [
                {
                    height: '52%'
                }, {
                height: '48%',
                top: '52%',
                title: {
                    text: 'RSI'
                }
            }
            ]
        return s
    }

    // https://www.highcharts.com/docs/chart-and-series-types/technical-indicator-series
    getTickerChartCallback(ticker, selectedPeriod, priceList) {
        console.log('perf', 'received', new Date());

        let priceListAsc = priceList.slice();
        // let newArray = priceListAsc.filter(price => price.date).map(price => ([Date.parse(price.date), price.close]))
        let newArray = priceListAsc.map(price => ([Date.parse(price.date), price.close]))
        let newOhlcArray = priceListAsc.map(price => (
            [Date.parse(price.date), price.open, price.high, price.low, price.close])
        )


        options.yAxis = this.getYAxis()

        // somehow options.series becomes null after first call in watchlist
        let eventArray = priceListAsc.filter(v => v.event_category !== null).map(price =>
            ({
                'x': Date.parse(price.date),
                'text': price.event_name,
                'title': price.event_category === 'earnings' ? 'E' :
                    price.event_category === 'dividend' ? 'D' :
                        price.event_category === 'news' ? 'N' :
                            '$'
            })
        )
        options.series = this.getOptionsSeries(eventArray);
        options.rangeSelector = this.getOptionsRangeSelector();
        options.series[0].data = newArray;
        // let theme = this.props.context.theme;
        // this switch is not working; #0081f2 is always shown
        // options.colors = (theme == 'lite') ? ['#0081f2'] : ['#2f7ed8']
        options.colors = ['#0081f2']



        console.log('perf', 'draw', new Date());

        this.setState({eventArray: eventArray, data: newArray, ohlcData: newOhlcArray})

        if (!this.state.fiveYrLoaded) {
            console.log('perf', 'calling 5yr', new Date());
            chart_tickers.get(this.getTickerChartCallback, this.props.ticker, '5y_a');
        }

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
        height: '420px'
    },
    exporting: {
        enabled: false
    },
}

export default ChartPanel;
