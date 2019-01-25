import React from 'react';
import PanelUI from '../widgets/panel/PanelUI.js'

const AnnouncePanelUI = ({email, promoCode, successMessage,
    errorMessage, onEmailEdit, onPromoCodeEdit,
    onEquityClick, onCryptoClick, onEmailSubmit,
    contestInfo, waitlistCount,
    inviteEmailFrom, inviteEmailTo, inviteSuccess, inviteError,
    onInviteEmailFromEdit, onInviteEmailToEdit, onInviteFormSubmit
    }) =>
  <PanelUI>
    <AnnounceTopUI
      contestInfo={contestInfo}
      waitlistCount={waitlistCount}
    />
    <br/>

    <center>
    <InviteEmailFormUI
      inviteEmailFrom={inviteEmailFrom}
      inviteEmailTo={inviteEmailTo}
      inviteSuccess={inviteSuccess}
      inviteError={inviteError}
      onInviteEmailFromEdit={onInviteEmailFromEdit}
      onInviteEmailToEdit={onInviteEmailToEdit}
      onInviteFormSubmit={onInviteFormSubmit}
    />
    </center>
  </PanelUI>

const AnnounceTopUI = ({contestInfo, waitlistCount}) =>
  <center>
    <h4>
    <a href='/contest'>Paper Trading Contest</a>{' '}
    - Weekly cash/crypto prizes - Sign up and start playing. 
    </h4>
    {
      contestInfo &&
      <h5>
        Contest ends {contestInfo.end_date}.{' '}
        {contestInfo.participant_count} participants.{' '}
        Currently leading: {contestInfo.nickname}
      </h5>
    }
  </center>

const InviteEmailFormUI = ({
    inviteEmailFrom, inviteEmailTo, inviteSuccess, inviteError,
    onInviteEmailFromEdit, onInviteEmailToEdit, onInviteFormSubmit
  }) =>
  <div>
    <form className="form-inline">
      <div className="form-group">
        {/*<label>Invite</label>{' '}*/}
        <input type="text" size="32" className="form-control"
          value={inviteEmailFrom} placeholder="Your Email" onChange={onInviteEmailFromEdit} />
      </div>{' '}

      <div className="form-group">
        <input type="text" size="32" className="form-control"
          value={inviteEmailTo} placeholder="Friend's Email" onChange={onInviteEmailToEdit} />
      </div>{' '}

      <button type="submit" className="btn btn-primary" onClick={onInviteFormSubmit}>Invite</button>
    </form>
    {
      inviteSuccess &&
      <span className='text-success'><br/>{inviteSuccess}</span>
    }
    {
      inviteError &&
      <span className='text-danger'><br/>{inviteError}</span>
    }
  </div>

export default AnnouncePanelUI;
