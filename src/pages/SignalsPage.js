import React, { Component } from 'react';
import SignalsPageUI from './SignalsPageUI.js';
import signals_price_filters from '../apiclient/signals_price_filters.js';
import signals_volume_filters from '../apiclient/signals_volume_filters.js';
import signals_rule_filters from '../apiclient/signals_rule_filters.js';
import gains_age_filters from '../apiclient/gains_age_filters.js';
// import contest_info from '../apiclient/portfolio/contest_info.js';
import sectors from '../apiclient/sectors.js';

class SignalsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp : true,
      ticker : '',
      gainsFiltersUpdated : false,
      signalFiltersUpdated : false,
      // values passed to apis
      minPrice : null,
      maxPrice : null,
      minVolume : null,
      maxVolume : null,
      maxAge : null,
      sectorId : null,
      ruleId : null,
      // values in ui
      selectedPriceRangeId : -1,
      selectedVolumeRangeId : -1,
      selectedAgeRangeId : -1,
      selectedSectorId : -1,
      selectedRuleId : -1,
      // list of values
      sectorList : [],
      priceRangeList : [],
      volumeRangeList : [],
      ruleList : [],
      ageRangeList : [],
      priceRangeListTemp : [],
      volumeRangeListTemp : [],
      ruleListTemp : [],
      ageRangeListTemp : [],
      // contest info
      // contestInfo : null,
    };
    // api callbacks
    this.getSignalsPriceRangeListCallback = this.getSignalsPriceRangeListCallback.bind(this);
    this.getSignalsVolumeRangeListCallback = this.getSignalsVolumeRangeListCallback.bind(this);
    this.getSignalsRuleListCallback = this.getSignalsRuleListCallback.bind(this);
    this.getGainsAgeRangeListCallback = this.getGainsAgeRangeListCallback.bind(this);
    this.getSectorsCallback = this.getSectorsCallback.bind(this);

    // ui event handlers
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleSectorChange = this.handleSectorChange.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handleVolumeRangeChange = this.handleVolumeRangeChange.bind(this);
    this.handleRuleChange = this.handleRuleChange.bind(this);
    this.handleAgeRangeChange = this.handleAgeRangeChange.bind(this);

    // contest info
    // this.getContestInfoCallback = this.getContestInfoCallback.bind(this);
  }

  render() {
    return (
      <SignalsPageUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        justLoggedOut={this.props.justLoggedOut}
        justSignedUp={this.props.justSignedUp}
        sectorList={this.state.sectorList}
        accessToken={this.props.accessToken}

        runDate={this.props.runDate}
        runTime={this.props.runTime}
        ticker={this.state.ticker}
        clickedTicker={this.props.clickedTicker}

        gainsFiltersUpdated={this.state.gainsFiltersUpdated}
        signalFiltersUpdated={this.state.signalFiltersUpdated}
        // values passed to apis
        minPrice={this.state.minPrice}
        maxPrice={this.state.maxPrice}
        minVolume={this.state.minVolume}
        maxVolume={this.state.maxVolume}
        maxAge={this.state.maxAge}
        sectorId={this.state.sectorId}
        ruleId={this.state.ruleId}
        // values in ui
        selectedPriceRangeId={this.state.selectedPriceRangeId}
        selectedVolumeRangeId={this.state.selectedVolumeRangeId}
        selectedAgeRangeId={this.state.selectedAgeRangeId}
        selectedSectorId={this.state.selectedSectorId}
        selectedRuleId={this.state.selectedRuleId}
        // list of values
        priceRangeList={this.state.priceRangeList}
        volumeRangeList={this.state.volumeRangeList}
        ruleList={this.state.ruleList}
        ageRangeList={this.state.ageRangeList}

        onSectorChange={this.handleSectorChange}
        onTickerChange={this.handleTickerChange}
        onPriceRangeChange={this.handlePriceRangeChange}
        onVolumeRangeChange={this.handleVolumeRangeChange}
        onRuleChange={this.handleRuleChange}
        onAgeRangeChange={this.handleAgeRangeChange}
        onScrollToSignUp={this.props.onScrollToSignUp}

        // contest info
        // contestInfo={this.state.contestInfo}
      />
    );
  }

  componentWillMount() {
    sectors.get(this.getSectorsCallback);
    // contest_info.get(this.getContestInfoCallback)
    signals_price_filters.get(this.getSignalsPriceRangeListCallback)
  }

  getSignalsPriceRangeListCallback(priceRangeList) {
    this.setState({priceRangeListTemp : priceRangeList})
    signals_rule_filters.get(this.getSignalsRuleListCallback)
  }

  getSignalsRuleListCallback(ruleList) {
    this.setState({ruleListTemp : ruleList})
    signals_volume_filters.get(this.getSignalsVolumeRangeListCallback)
  }

  getSignalsVolumeRangeListCallback(volumeRangeList) {
    this.setState({volumeRangeListTemp : volumeRangeList})
    gains_age_filters.get(this.getGainsAgeRangeListCallback)
  }

  getGainsAgeRangeListCallback(ageRangeList) {
    this.setState({ageRangeListTemp : ageRangeList})

    let minPrice = null, maxPrice = null, selectedPriceRangeId = -1;
    for (var priceRangeTemp of this.state.priceRangeListTemp) {
      if (priceRangeTemp.default) {
        minPrice = priceRangeTemp.min_price;
        maxPrice = priceRangeTemp.max_price;
        selectedPriceRangeId = priceRangeTemp.id;
        break;
      }
    }
    let minVolume = null, maxVolume = null, selectedVolumeRangeId = -1;
    for (var volumeRangeTemp of this.state.volumeRangeListTemp) {
      if (volumeRangeTemp.default) {
        minVolume = volumeRangeTemp.min_volume;
        maxVolume = volumeRangeTemp.max_volume;
        selectedVolumeRangeId = volumeRangeTemp.id;
        break;
      }
    }
    let maxAge = null, selectedAgeRangeId = -1;
    for (var ageRangeTemp of this.state.ageRangeListTemp) {
      if (ageRangeTemp.default) {
        maxAge = ageRangeTemp.max_age;
        selectedAgeRangeId = ageRangeTemp.id;
        break;
      }
    }

    this.setState({
      gainsFiltersUpdated: true,
      signalFiltersUpdated:true,
      // values passed to apis
      minPrice: minPrice,
      maxPrice: maxPrice,
      minVolume: minVolume,
      maxVolume: maxVolume,
      maxAge: maxAge,
      // values in ui
      selectedPriceRangeId: selectedPriceRangeId,
      selectedVolumeRangeId: selectedVolumeRangeId,
      selectedAgeRangeId: selectedAgeRangeId,
      // list of values
      priceRangeList: this.state.priceRangeListTemp,
      volumeRangeList: this.state.volumeRangeListTemp,
      ruleList: this.state.ruleListTemp,
      ageRangeList: this.state.ageRangeListTemp,
    })
  }

  handleTickerChange(event) {
    event.preventDefault();
    console.log('selected ticker=' + event.target.value)
    this.setState({
      ticker: event.target.value,
      minPrice: null,
      maxPrice: null,
      minVolume: null,
      maxVolume: null,
      sectorId : null,
      selectedPriceRangeId: -1,
      selectedVolumeRangeId: -1,
      selectedSectorId: -1,
      gainsFiltersUpdated: true,
      signalFiltersUpdated: true
    });
  }

  handleSectorChange(event) {
    event.preventDefault();
    console.log('selectedSectorId', event.target.value)
    let sectorId = event.target.value === '-1' ? null : event.target.value;

    this.setState({
      sectorId : sectorId,
      selectedSectorId: event.target.value,
      ticker: '',
      gainsFiltersUpdated: true,
      signalFiltersUpdated:true
    });
  }

  handlePriceRangeChange(event) {
    event.preventDefault();
    console.log('selectedPriceRangeId', event.target.value)
    this.setState({
      selectedPriceRangeId: event.target.value,
      minPrice: event.target.selectedOptions[0].getAttribute('data-min-price'),
      maxPrice: event.target.selectedOptions[0].getAttribute('data-max-price'),
      ticker: '',
      gainsFiltersUpdated: true,
      signalFiltersUpdated:true
    });
  }

  handleVolumeRangeChange(event) {
    event.preventDefault();
    console.log('selectedVolumeRangeId', event.target.value)
    this.setState({
      selectedVolumeRangeId: event.target.value,
      minVolume: event.target.selectedOptions[0].getAttribute('data-min-volume'),
      maxVolume: event.target.selectedOptions[0].getAttribute('data-max-volume'),
      ticker: '',
      gainsFiltersUpdated: true,
      signalFiltersUpdated:true
    });
  }

  handleRuleChange(event) {
    event.preventDefault();
    console.log('selectedRuleId', event.target.value)
    let ruleId = event.target.value === '-1' ? null : event.target.value;
    console.log(ruleId);

    this.setState({
      ruleId : ruleId,
      selectedRuleId: event.target.value,
      ticker: '',
      gainsFiltersUpdated: false,
      signalFiltersUpdated:true
    });
  }

  handleAgeRangeChange(event) {
    event.preventDefault()
    console.log('selectedAgeRangeId', event.target.value)
    this.setState({
      selectedAgeRangeId: event.target.value,
      maxAge: event.target.selectedOptions[0].getAttribute('data-max-age'),
      gainsFiltersUpdated: true,
      signalFiltersUpdated:false
    });
  }

  /*
  getContestInfoCallback(response) {
    this.setState({
      contestInfo : response,
    })
  }
  */

  getSectorsCallback(sectorList) {
    this.setState({sectorList: sectorList});
  }
}

export default SignalsPage;
