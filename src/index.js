import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import './custom.css';
import './assets/css/default.css'; // define global font, color in default.css
import './assets/css/page.css';
import './assets/css/navbar.css';
import './assets/css/panel.css';
import './assets/css/tag.css';
import './assets/css/form.css';
import './assets/css/chart.css';
import './assets/css/table.css';
import './assets/css/modal.css';
import './assets/css/calendar.css';
import './assets/css/comp_news.css';
import './assets/css/comp_ticker.css';
import './assets/css/comp_topnews.css';
import './assets/css/comp_stories.css';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
