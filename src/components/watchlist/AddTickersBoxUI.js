import React from 'react';

const AddTickersBoxUI = ({newTickers, addTickersSuccess, addTickersError,
    onAddTickersEdit, onAddTickersSubmit,style}) =>
  <div style={{'display':'inline-block',...style}} className="addtickers-block">
    <form className="form-inline">
      <div className="form-group">
        <div className="input-group">
          <input type="text" id="add_tickers_wl" className="form-control" placeholder="MSFT,DIS,AAPL" value={newTickers} onChange={onAddTickersEdit} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default" onClick={onAddTickersSubmit}>Add Tickers</button>
          </span>
        </div>
      </div>
    </form>
    {
      addTickersSuccess &&
      <p className='text-success'>{addTickersSuccess}</p>
    }
    {
      addTickersError &&
      <p className='text-danger'>{addTickersError}</p>
    }
  </div>

export default AddTickersBoxUI;
