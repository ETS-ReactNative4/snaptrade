import React from 'react';
import Constants from '../common/Constants.js';
import { OverlayTrigger, Table, Popover } from 'react-bootstrap'
import { Link } from "react-router-dom";

const WatchlistAnonPopoverUI = () =>
  <OverlayTrigger
    trigger={['hover', 'focus']}
    placement='bottom'
    overlay={
      <Popover id='watchlist' title='Login or Sign Up' bsClass='ticker popover'>
        Please login or sign up to view and manage your watchlist
      </Popover>
    }
    >
    <Link to='/login'>Watch List</Link>
  </OverlayTrigger>

export default WatchlistAnonPopoverUI;
