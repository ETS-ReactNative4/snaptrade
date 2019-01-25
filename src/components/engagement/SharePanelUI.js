import React from 'react';
import { Panel,Button,FormGroup,FormControl,Alert } from 'react-bootstrap';
import ShareTableUI from './ShareTableUI.js';

const SharePanelUI = ({anonymous, collapsed, objectId, objectName,
    shareSummary, shareeList, onDeleteShareeSubmit,
    newSharee, shareSuccess, shareError, onNewShareeEdit, onNewShareeSubmit
    }) =>
  <div className="colabpanel">
  <h3>{'Share' + (objectName ? ' watch list: ' + objectName : '')}
  {
    shareSummary.cnt !== 0 &&
      <span className="cntcount">{shareSummary.cnt}</span>
  }
  </h3>


  <div className="panel panel-default">
    <div className="panel-body">
    <form>
      <div className="row">
        <div className='col-xs-12 col-sm-6'>
          { shareSuccess &&
            <Alert bsStyle="success">{shareSuccess}
            </Alert>
          }
          { shareError &&
            <Alert bsStyle="danger">{shareError}
            </Alert>
          }
        </div>
      </div>
      <div className='col-xs-12 col-sm-6'>
        <FormGroup controlId="newSharee">
          <FormControl
            placeholder="Email or Nickname" type="text"
            value={newSharee} onChange={onNewShareeEdit}
          />
        </FormGroup>
      </div>

      <div className='col-xs-12 col-sm-6'>
        <FormGroup>
          <Button bsStyle="primary" className='pull-left' onClick={onNewShareeSubmit}>
            Share
          </Button>
        </FormGroup>
      </div>

      <div className='clearfix' />

      {
        shareeList && shareeList.length > 0 &&
        <ShareTableUI
          shareeList={shareeList}
          onDeleteShareeSubmit={onDeleteShareeSubmit}
        />
      }
    </form>
  </div>
  </div>
  </div>

export default SharePanelUI;
