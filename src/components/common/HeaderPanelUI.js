import React from 'react';
import { } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Dropdown, OverlayTrigger, Popover, DropdownButton, LinkContainer } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import CustomToggle from './CustomToggle'
import CustomMenu from './CustomMenu'
import WatchlistAnonPopoverUI from '../watchlist/WatchlistAnonPopoverUI'
import {Typeahead, AsyncTypeahead} from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

// assets
import logo from '../../assets/snaptrade-logo.png';
import logowhite from '../../assets/snaptrade-logo-white.png';

const HeaderPanelUI = ({ context, ticker, typedTicker, typed,
  // typeahead search
  searchOptions, onTypeaheadSearch,
  renderMenuItemChildren, onTypeaheadSearchSelected,
  //
  onSearchedTickerChange, onTickerSearch, onWatchListAnon, onHelpClick, resetHelp }) =>
  <Navbar>
    <Navbar.Header>
      <Link className="navbar-brand" to="/"></Link>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {/*
      <form className="navbar-form navbar-right">
        <div className="form-group">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Ticker"
              value={typed ? typedTicker : ticker}
              onChange={onSearchedTickerChange} />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default" onClick={onTickerSearch}>Go</button>
            </span>
          </div>
        </div>
      </form>
      */}

      <div className="navbar-form navbar-right">
        <AsyncTypeahead
           labelKey="ticker"
           onSearch={onTypeaheadSearch}
           options={searchOptions}
           placeholder="Ticker or Company"
           minLength={1}
           renderMenuItemChildren={renderMenuItemChildren}
           filterBy={['ticker', 'company']}
           onChange={onTypeaheadSearchSelected}
        />
      </div>

      <Nav pullRight>

        {
          (context.path !== '/dashboard' || true) &&
          <li className={context.path === '/dashboard' ? 'active' : ''}><Link to='/dashboard' style={{ fontSize: '150%' }}>
            <span className="glyphicon glyphicon-home" aria-hidden="true"></span>
          </Link></li>
        }

        {
          !context.anonymous &&
          <li className={context.path === '/watchlist' ? 'active menu' : 'menu'}>
            <Link to='/watchlist' onClick={resetHelp} className='text-center'>Watch List</Link>
            <span onClick={onHelpClick} className={context.path === '/watchlist' ? 'visible  help glyphicon glyphicon-question-sign' : 'hidden'} aria-hidden="true" title={context.showHelp ? 'Click to hide how-to video' : 'Click to show how-to video'}></span>
          </li>
        }

        {
          context.anonymous &&
          <li><WatchlistAnonPopoverUI /></li>
        }

        <li className={context.path.includes('/scanner') ? 'active menu' : 'menu'}>
          <Link to='/scanner/technology' onClick={resetHelp} className='text-center'>Scanner</Link>
          <span onClick={onHelpClick} className={context.path.includes('/scanner') ? 'visible  help glyphicon glyphicon-question-sign' : 'hidden'} aria-hidden="true" title={context.showHelp ? 'Click to hide how-to video' : 'Click to show how-to video'}></span>
        </li>

        <li className={context.path === '/signals' ? 'active menu' : 'menu'}>
          <Link to='/signals' onClick={resetHelp} className='text-center'>Discovery</Link>
          <span onClick={onHelpClick} className={context.path === '/signals' ? 'visible  help glyphicon glyphicon-question-sign' : 'hidden'} aria-hidden="true" title={context.showHelp ? 'Click to hide how-to video' : 'Click to show how-to video'}></span>
        </li>

        <li className={context.path === '/calendar' ? 'active' : ''}>
          <Link to='/calendar'>Earnings Calendar</Link>
        </li>

        {
          context.theme === 'dark' &&
          <li><a href='#' onClick={context.onLiteThemeClick}>Light Theme</a></li>
        }
        {
          context.theme === 'lite' &&
          <li><a href='#' onClick={context.onDarkThemeClick}>Dark Theme</a></li>
        }

        {
          context.anonymous &&
          <li className={context.path === '/login' ? 'active' : ''}>
            <Link to='/login'>Login</Link>
          </li>
        }

        <li><a href='#'>
          <Dropdown id="dropdown-custom-1">
            <Dropdown.Toggle style={{ fontSize: '150%' }} noCaret>
              <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                !context.anonymous &&
                <MenuItem eventKey="1" componentClass={Link} href="/settings" to="/settings">Settings</MenuItem>
              }
              {/*<MenuItem eventKey="2" componentClass={Link} href="/portfolio" to='/portfolio'>Portfolio</MenuItem>*/}
              <MenuItem eventKey="4" componentClass={Link} href='/blog' to='/blog' target='_blank'>Blog</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </a></li>

      </Nav>
    </Navbar.Collapse>
  </Navbar>

export default withRouter(HeaderPanelUI);
