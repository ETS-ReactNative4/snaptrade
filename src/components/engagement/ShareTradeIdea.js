import React, { Component } from 'react';
import ShareTradeIdeaUI from './ShareTradeIdeaUI.js';
import Trade from './Trade.js';

class ShareTradeIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: '',
      isChecked: '',
      ticker: '',
      buyprice: '',
      sellprice: '',
      tradetype: '',
      errorMessage: '',
      isLoading: '',
      successMessage: ''
    };

    this.handletoggleChange = this.handletoggleChange.bind(this);
    this.handleBuyPrice = this.handleBuyPrice.bind(this);
    this.handleSellPrice = this.handleSellPrice.bind(this);
    this.handleTradeType = this.handleTradeType.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.publishCallBack = this.publishCallBack.bind(this);
  }

  render() {
   
    return (
      <ShareTradeIdeaUI
        anonymous={this.props.anonymous}
        toggleChange={this.handletoggleChange}
        isChecked={this.state.isChecked}      
        onBuyPriceEdit={this.handleBuyPrice}
        onSellPriceEdit={this.handleSellPrice}
        onTradeTypeEdit={this.handleTradeType}
        onPublish={this.handlePublish}
        errorMessage={this.state.errorMessage}
        successMessage={this.state.successMessage}
        tickerInfo={this.props.tickerInfo}
       />
    );
  }

  componentWillReceiveProps(props) {
    console.log(props.ticker);
    this.setState({ticker: props.ticker});     
  }

 
 handleBuyPrice(e) {
    console.log(e.target.value)
    this.setState({ buyprice: e.target.value });
  }

  handleSellPrice(e) {
  	console.log(e.target.value)
    this.setState({ sellprice: e.target.value });
  }

  handleTradeType(e){
  	console.log(e.target.value)
    this.setState({ tradetype: e.target.value });
  }

  handletoggleChange(e){
  	this.setState({ isChecked: !this.state.isChecked });
  	
  	if(this.state.isChecked=='' || this.state.isChecked==false)
  	{
  		this.state.check='1';
  	}
  	else
  	{
  		this.state.check='0';
  	}  		

  	console.log(this.state.check);
  }

  handlePublish(e) {
    e.preventDefault()
    let errors = this.getErrors()
    if (errors) {
      this.setState({errorMessage: errors})
      return;
    }
    
    console.log(e.target.value);
    this.setState({errorMessage: '', isLoading: true});
    Trade.post(this.publishCallBack, this.state.ticker, this.state.buyprice, this.state.sellprice, this.state.tradetype, this.state.check);
  }

 publishCallBack(response){
  console.log(response);
  this.setState({successMessage: response.success, errorMessage: response.error})
 }

  getErrors() {
    if (!this.state.buyprice && !this.state.sellprice)
      return "BuyPrice and SellPrice are required"
    if (!this.state.buyprice )
      return "BuyPrice is Required"
    if (!this.state.sellprice)
      return "SellPrice is required"
    // if (!Validate.email(this.state.email))
    //   return "Email is invalid"
  }


}



export default ShareTradeIdea;