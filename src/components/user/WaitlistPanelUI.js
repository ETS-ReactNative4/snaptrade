import React from 'react';

const WaitlistPanelUI = ({email, promoCode, successMessage,
    errorMessage, onEmailEdit, onPromoCodeEdit,
    onEquityClick, onCryptoClick, onEmailSubmit,
    contestInfo, waitlistCount,
    inviteEmailFrom, inviteEmailTo, inviteSuccess, inviteError,
    onInviteEmailFromEdit, onInviteEmailToEdit, onInviteFormSubmit
    }) =>
  <div>

    <div className="panel panel-default portfolioContest">
      <div className="panel-body">

        <span className="contentLbl"><strong>Portfolio Contest:</strong> Weekly cash/crypto prizes - Sign up to be in the waitlist</span>
        {
          contestInfo &&
           <span>
           {' '}{contestInfo.participant_count} people in the contest.
           </span>
         }
         {
           waitlistCount &&
           <span>
           {' '}{waitlistCount} people in the wait list.
           </span>
        }
        <br/>
        <div>
          <form className="form-inline">
            <div className="form-group">
              <input type="text" size="32" className="form-control" id="waitemail"
                value={email} placeholder="Email" onChange={onEmailEdit} />
            </div>

            <div className="form-group radio">
              <label>
                <input type="radio" name="optionsRadios" value="equity"
                  onClick={onEquityClick} />
                {' '}Stock Contest
              </label>
            </div>{' '}
            <div className="form-group radio">
              <label>
                <input type="radio" name="optionsRadios" value="crypto"
                  onClick={onCryptoClick} />
                {' '}Crypto Contest
              </label>
            </div>{' '}{' '}

            <div className="form-group">
              <input type="text" name="code" size="20" className="form-control"
                value={promoCode} placeholder="Promo Code (optional)" onChange={onPromoCodeEdit} />
            </div>{' '}

            <button type="submit" className="btn btn-primary" onClick={onEmailSubmit}>Submit</button>
          </form>
          {
            successMessage &&
            <span className='text-success'><br/>{successMessage}</span>
          }
          {
            errorMessage &&
            <span className='text-danger'><br/>{errorMessage}</span>
          }
        </div><br/>

        <InviteEmailForm
          inviteEmailFrom={inviteEmailFrom}
          inviteEmailTo={inviteEmailTo}
          inviteSuccess={inviteSuccess}
          inviteError={inviteError}
          onInviteEmailFromEdit={onInviteEmailFromEdit}
          onInviteEmailToEdit={onInviteEmailToEdit}
          onInviteFormSubmit={onInviteFormSubmit}
        />

        <p className='text-left'>
          <i className="note">Bi-weekly paper trading contest starts soon. Winner gets $100 in cash/crypto</i>
        </p>
      </div>
    </div>
  </div>

const InviteEmailForm = ({
    inviteEmailFrom, inviteEmailTo, inviteSuccess, inviteError,
    onInviteEmailFromEdit, onInviteEmailToEdit, onInviteFormSubmit
  }) =>
  <div>
    <form className="form-inline">
      <div className="form-group">
        <label>Invite</label>{' '}
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

export default WaitlistPanelUI;
