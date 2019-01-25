// libraries
import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderPanel from './components/common/HeaderPanel.js';
import FooterUI from './components/common/FooterUI.js';
import HomePanel from './components/user/HomePanel.js';
import HomePageUI from './pages/HomePageUI.js';
import SignalsPage from './pages/SignalsPage.js';
import WatchListPage from './pages/WatchListPage.js';
import ContestPage from './pages/ContestPage.js'
import PortfolioGamePage from './pages/PortfolioGamePage.js'
import TickerScannerPage from './pages/TickerScannerPage.js'
import DashboardPageUI from './pages/DashboardPageUI'
import SettingsPage from './pages/SettingsPage.js'
import BatchJobsPage from './pages/BatchJobsPage.js'
import TestPage from './pages/TestPage.js'
import TickerPage from './pages/TickerPage.js'
import ChartPage from './pages/ChartPage.js'
import PrivacyStatement from './pages/PrivacyStatement.js'
import TermsOfUse from './pages/TermsOfUse'
import DemoPage from './pages/DemoPage.js'
import HeaderRef from './components/common/HeaderRef.js'
import FeedbackModal from './components/user/FeedbackModal.js';
import SecondPage from './components/user/SecondPage.js';
import TutorialModalUI from './components/content/TutorialModalUI.js'
import SignInSignUpPage from './pages/SignInSignUpPage.js'
import CalendarPage from './pages/CalendarPage.js'
import FAQs from './pages/FAQs';
import './assets/App.css';

// https://stackoverflow.com/questions/43469071/react-react-router-dom-pass-props-to-component
const AppUI = ({context, anonymous, justLoggedOut, justSignedUp,
                sectorList, clickedTicker, accessToken,
                onSignOutLinkClick,
                onSearchedTickerChange, onTickerSearch,
                showFeedbackModal, onShowFeedbackModal, onHideFeedbackModal,
                runDate, runTime, showTutorial, onShowTutorial, onHideTutorial,
              }) =>
  <div>

    <Switch>
      <Route exact path='/watchlist/tag/:tag'
        render={() =>
          <span />
        }
      />
      <Route exact path='/ticker/:ticker'
        render={() =>
          <HeaderPanel
            context={context}
            onSearchedTickerChange={onSearchedTickerChange}
            onTickerSearch={onTickerSearch}
          />
        }
      />
      <Route path='/'
        render={() =>
          <HeaderPanel
            context={context}
            onSearchedTickerChange={onSearchedTickerChange}
            onTickerSearch={onTickerSearch}
          />
        }
      />
    </Switch>

    <div className='text-center'>
      <div className='alert alert-info visible-xs-inline-block'>
        Site is not optimized for mobile or small screens
      </div>
    </div>


      <div className="feedback-btn">
        <a href='#feedback' className='label label-warning' onClick={onShowFeedbackModal}>Feedback</a>
      </div>
      <FeedbackModal
        showFeedbackModal={showFeedbackModal}
        onHideFeedbackModal={onHideFeedbackModal}
      />

      <TutorialModalUI
        showTutorial={showTutorial}
        onHideTutorial={onHideTutorial}
      />


    <Switch>
      <Route exact path='/signals'
        render={() =>
          <SignalsPage
            context={context}
            anonymous={anonymous}
            justLoggedOut={justLoggedOut}
            justSignedUp={justSignedUp}
            accessToken={accessToken}
            sectorList={sectorList}
            clickedTicker={clickedTicker}
            runDate={runDate}
            runTime={runTime}
          />
        }
      />

      <Route exact path='/login'
        render={() =>
          <SignInSignUpPage context={context} />
        }
      />

      <Route exact path='/secondpage'
        render={() =>
          <SecondPage
          />
        }
      />

      <Route exact path='/demo'
        render={() =>
          <DemoPage
          />
        }
      />

      <Route exact path='/ticker/:ticker'
        render={() =>
          <TickerPage
            context={context}
            anonymous={anonymous}
            justLoggedOut={justLoggedOut}
            justSignedUp={justSignedUp}
            accessToken={accessToken}
            sectorList={sectorList}
            clickedTicker={clickedTicker}
          />
        }
      />
      <Route exact path='/chart/:ticker'
        render={() =>
          <ChartPage
            anonymous={anonymous}
            justLoggedOut={justLoggedOut}
            justSignedUp={justSignedUp}
            accessToken={accessToken}
            sectorList={sectorList}
            clickedTicker={clickedTicker}
          />
        }
      />

      <Route exact path='/privacy-statement'
        render={() =>
          <PrivacyStatement
            anonymous={anonymous}
            clickedTicker={clickedTicker}
          />
        }
      />

      <Route exact path='/terms-of-use'
        render={() =>
          <TermsOfUse
            anonymous={anonymous}
            clickedTicker={clickedTicker}
          />
        }
      />
      <Route exact path='/faq'
        render={() =>
          <FAQs
            anonymous={anonymous}
            clickedTicker={clickedTicker}
          />
        }
      />
      <Route exact path='/blog'
        component={() => window.location = 'https://blog.snaptrade.us'}
      />
      <Route exact path='/watchlist'
        render={() =>
          <WatchListPage
            context={context}
            anonymous={anonymous}
          />
        }
      />
      <Route exact path='/watchlist/tag/:tag'
        render={() =>
          <WatchListPage
            context={context}
            anonymous={anonymous}
          />
        }
      />

      <Route path='/contest'
        render={() =>
          <ContestPage
            anonymous={anonymous}
            justLoggedOut={justLoggedOut}
            justSignedUp={justSignedUp}
            accessToken={accessToken}
            sectorList={sectorList}
            clickedTicker={clickedTicker}
          />
        }
      />
      <Route path='/portfolio'
        render={() =>
          <PortfolioGamePage
            context={context}
            anonymous={anonymous}
          />
        }
      />
      <Route exact path='/scanner'
        render={() =>
          <TickerScannerPage
            context={context}
            anonymous={anonymous}
            justLoggedOut={justLoggedOut}
            justSignedUp={justSignedUp}
            accessToken={accessToken}
            sectorList={sectorList}
            clickedTicker={clickedTicker}
          />
        }
      />
      <Route exact path='/scanner/:tag'
        render={() =>
          <TickerScannerPage
            context={context}
            anonymous={anonymous}
            justLoggedOut={justLoggedOut}
            justSignedUp={justSignedUp}
            accessToken={accessToken}
            sectorList={sectorList}
            clickedTicker={clickedTicker}
          />
        }
      />
      <Route exact path='/'
        render={() =>
          <HomePageUI
            context={context}
          />
        }
      />
      <Route exact path='/dashboard'
        render={() =>
          <DashboardPageUI
            context={context}
            justLoggedOut={justLoggedOut}
            justSignedUp={justSignedUp}
            accessToken={accessToken}
            sectorList={sectorList}
            clickedTicker={clickedTicker}
          />
        }
      />
      <Route exact path='/settings'
        render={() =>
          <SettingsPage
            context={context} />
        }
      />
      <Route exact path='/calendar'
        render={() =>
          <CalendarPage
            context={context} />
        }
      />
      <Route exact path='/intra/batchjobs'
        render={() =>
          <BatchJobsPage
            context={context} />
        }
      />
      <Route exact path='/test'
        render={() =>
          <TestPage />
        }
      />
    </Switch>

    <Switch>
      <Route exact path='/watchlist/tag/:tag'
        render={() =>
          <span />
        }
      />
      <Route path='/'
        render={() =>
          <FooterUI />
        }
      />
    </Switch>

  </div>



export default withRouter(AppUI);
