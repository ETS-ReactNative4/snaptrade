import React from 'react';
import SpinnerUI from '../widgets/SpinnerUI.js'
import LeaderTableUI from './LeaderTableUI.js';

const LeaderPanelUI = ({isLoading, leaderList, onUserUnfold, onUserFold}) =>
  <div>
    <div className="panel panel-default">
      <div className="panel-body">
      <h3 className="panelTitle">Leader Board</h3>
        {/*
          isLoading && <SpinnerUI />
        */}
        {
          /*! isLoading &&*/
          <LeaderTableUI
            leaderList={leaderList}
            onUserUnfold={onUserUnfold}
            onUserFold={onUserFold}
          />
        }
    </div>
  </div>
</div>

export default LeaderPanelUI;
