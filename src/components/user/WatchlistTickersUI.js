import React from 'react';
import { Panel, Button,FormGroup,FormControl,ControlLabel,Alert } from 'react-bootstrap';
// import Multiselect from 'react-bootstrap-multiselect' ;

const WatchlistTickersUI = ({signUpMessage, successMessage, errorMessage, sectorList, tickers, onTickerChange, onSectorIdChange, onWatchTickersClick}) =>
  <Panel header='Add Tickers to Your Watchlist' id="watch">
    <form>
      {
        signUpMessage &&
        <div className='col-xs-12 col-sm-6 alert alert-success'>
        <h5>
        <div dangerouslySetInnerHTML={{ __html: signUpMessage }}/><br/>
        </h5>
        </div>
      }
      <div className='col-xs-12 col-sm-6'>
        { successMessage &&
          <Alert bsStyle="success">{successMessage}
          </Alert>
        }
        { errorMessage &&
          <Alert bsStyle="danger">{errorMessage}
          </Alert>
        }
        <FormGroup controlId="formTicker">
          {/*validationState={this.getValidationState()}*/}
          <FormControl
            placeholder="MSFT, DIS, AAPL"
            type="text"
            onChange={onTickerChange}
            value={tickers}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>Choose Sectors</ControlLabel>
          <select multiple className='form-control' onChange={onSectorIdChange}>
          {
            sectorList.map((sector, i) =>
              <option key={i} value={sector.id}>{sector.name}</option>
            )
          }
          </select>
        </FormGroup>
        <FormGroup>
    	    <Button bsStyle="primary" className='pull-right' onClick={onWatchTickersClick}>Add To Watchlist</Button>
    	  </FormGroup>
      </div>

      <div className='clearfix'></div>

    </form>
  </Panel>

export default WatchlistTickersUI;
