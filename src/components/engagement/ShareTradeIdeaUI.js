import React from 'react';
import {Button} from 'react-bootstrap';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const tooltips = {
     status: (<Popover id="trade_status"><span>Share with others?</span></Popover>),
    };

const ShareTradeIdeaUI = props =>


  <form className="form-inline tradeidea">

      {
      props.anonymous &&
      <legend>Trade Idea:<small>(need to be logged in)</small></legend>
      }

      {
      !props.anonymous &&
      <legend>Trade Idea:</legend>
      }


      <div className="form-group">
        <span><b>Buy Price:</b></span>{' '}
        <span>
        {!props.anonymous &&
        <input type="text" size="12" className="form-control" onChange={props.onBuyPriceEdit} value={props.tickerInfo.buy_price}/>
        }
        {props.anonymous &&
        <input type="text" size="12" className="form-control" onChange={props.onBuyPriceEdit} />
        }
        </span>

      </div>{' '}

      <div className="form-group">
        <span><b>Sell Price:</b></span>{' '}
        <span>
        {!props.anonymous &&
        <input type="text" size="12" className="form-control" onChange={props.onSellPriceEdit} value={props.tickerInfo.sell_price}/>
        }
        {props.anonymous &&
        <input type="text" size="12" className="form-control" onChange={props.onSellPriceEdit} />
        }
        </span>
      </div>

      <div><br/></div>

      <div className="form-group">
        <span><b>Trade type:</b></span>{' '}
        <select className='form-control' onChange={props.onTradeTypeEdit} value={!props.anonymous && props.tickerInfo.trade_type}>
          <option value="long term">long term</option>
          <option value="swing">swing</option>
          <option value="day trade">day trade</option>
        </select>
      </div>

      <div><br/></div>


      <div className="form-group">
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.status}>

        <span>
         {
         !props.anonymous && props.tickerInfo.is_shared_public == 1 &&
         <input type="checkbox" checked={props.isChecked} onChange={props.toggleChange} checked/>
        }
        {
         !props.anonymous && props.tickerInfo.is_shared_public == null &&
         <input type="checkbox" checked={props.isChecked} onChange={props.toggleChange} />
        }

        {
        props.anonymous &&
        <input type="checkbox" checked={props.isChecked} onChange={props.toggleChange} />
        }
        </span>


        </OverlayTrigger>
        {' '} Share it with others {' '}
        <Button bsStyle="primary" onClick={props.onPublish}>Save</Button>
      </div>

    {
      props.successMessage &&
      <span className='text-success'><br/>{props.successMessage}</span>
    }
    {
      props.errorMessage &&
      <span className='text-danger'><br/>{props.errorMessage}</span>
    }
  </form>



export default ShareTradeIdeaUI;
