import React from 'react';
import { Panel } from 'react-bootstrap';
import EmailUpdateUI from './EmailUpdateUI.js'
import PasswordUpdateUI from './PasswordUpdateUI.js'

const SettingsPanelUI = ({userInfo,
    isEmailEdit, onEmailEdit, onEmailUpdate, onEmailUpdateSubmit,
    isPasswordEdit, onPasswordEdit, onPasswordUpdate, onPasswordUpdateSubmit,
  }) =>
  <Panel>
    <EmailUpdateUI
      email={userInfo.email}
      isEmailEdit={isEmailEdit}
      onEmailEdit={onEmailEdit}
      onEmailUpdate={onEmailUpdate}
      onEmailUpdateSubmit={onEmailUpdateSubmit}
    />
    <PasswordUpdateUI
      password={userInfo.password}
      isPasswordEdit={isPasswordEdit}
      onPasswordEdit={onPasswordEdit}
      onPasswordUpdate={onPasswordUpdate}
      onPasswordUpdateSubmit={onPasswordUpdateSubmit}
    />
  </Panel>

export default SettingsPanelUI;
