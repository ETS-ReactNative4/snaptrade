import React from 'react';
import PageUI from '../components/widgets/PageUI.js';
import SettingsPanel from '../components/settings/SettingsPanel.js'

const SettingsPageUI = ({context}) =>
<PageUI title='Settings'>
  <button
    type='button'
    className='pull-right btn btn-primary'
    style={{marginTop: '-50px', minWidth: '80px'}}
    onClick={context.onSignOutLinkClick}>
    Logout
  </button>
  <SettingsPanel />
</PageUI>

export default SettingsPageUI;
