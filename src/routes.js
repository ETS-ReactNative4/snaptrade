import React from 'react';
import { BrowserRouter } from 'react-router-dom'

/**
 * Import all page components here
 */
import App from './App';
import Chart from './charts/Chart';

/**
 * All routes go here.
 * <IndexRoute component={MainPage} />
 */
export default (
  <Route path="/" component={App}>
    <Route path="/chart" component={Chart} />
  </Route>
);
