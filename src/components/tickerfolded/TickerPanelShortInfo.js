import React, {Component} from 'react';
import tickers from "../../apiclient/tickers/tickers";
import stories from "../../apiclient/tickers/ticker_stories";


class TickerPanelShortInfo extends Component {
    state = {
        showDesc: false,
        showStories: false,
        shortDesc: [],
        stories: []
    };

    onChange = (name, data) => {
        this.setState({[name]: data})
    };

    componentDidMount() {
        stories.get(this.getStoriesCallback, this.props.ticker);
        tickers.get(this.getTickersCallback, this.props.ticker);

    }

    getTickersCallback = (json) => {
        this.onChange("shortDesc", json[0].short_desc,)
    };
    getStoriesCallback = (json) => {
        this.onChange("stories", json,)
    };

    StoriesList = (data) => {
        return data.map((value, index) => {
            return (
                <div style={{marginTop: 5}} key={index}>{value.label_name}: {value.label_details}</div>
            )
        })
    };

    More = (name,data) =>{
        return(
            <u style={{cursor: "pointer", userSelect: 'none'}}
               onClick={() => this.onChange(name, !data)}>{!data ? "Read more" : "Hide"}
            </u>
        )
    }


    render() {
        const {shortDesc, showDesc,showStories,stories} = this.state;
        return (
            shortDesc.length !== 0 && (
                <div>
                    <div style={{marginTop: 10}}>
                        <h3 className="panel-title">About</h3>
                        <div style={{marginTop: 5}}>
                            {!showDesc ? shortDesc.slice(0, 170) + "..." : shortDesc}
                            {' '}
                            {this.More("showDesc",showDesc)}
                          </div>
                    </div>

                    <div style={{marginTop: 10}}>
                        <h3 className="panel-title">Quick Summary</h3>
                        {this.StoriesList(!showStories ? stories.slice(0, 3)  : stories)}
                        {this.More("showStories",showStories)}
                    </div>
                </div>
            )
        );
    }
}

export default TickerPanelShortInfo;
