import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FeedbackModalUI = ({showFeedbackModal, onHideFeedbackModal,
                               onFeedbackInputChange, onFeedbackTypeChange,
                               onSendFeedbackClick, successMsg
                             }) =>
  <Modal show={showFeedbackModal} onHide={onHideFeedbackModal} style={{marginTop:"80px"}}>
    <Modal.Header closeButton>
      <Modal.Title>Feedback</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-group" style={{'marginTop':'20px'}}>
        { successMsg &&
          <div className="alert alert-success" role="alert">
            {successMsg}
          </div>
        }
        <label className="radio-inline">
          <input type="radio" name='ftype' onClick={onFeedbackTypeChange} id="i1" value="bug" />
            Bug
        </label>
        <label className="radio-inline">
          <input type="radio" name='ftype' onClick={onFeedbackTypeChange} id="i2" value="comment" />
            Comment
        </label>
        <label className="radio-inline">
          <input type="radio" name='ftype' onClick={onFeedbackTypeChange} id="i3" value="feature" />
            Feature request
        </label>
        <label className="radio-inline">
          <input type="radio" name='ftype' onClick={onFeedbackTypeChange} id="i3" value="other" />
            Other
        </label>
        </div>
        <div className="form-group">
        <input type="text" className="form-control" placeholder="Describe"
          onChange={onFeedbackInputChange} />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onSendFeedbackClick}>Send</Button>
    </Modal.Footer>
  </Modal>

export default FeedbackModalUI;
