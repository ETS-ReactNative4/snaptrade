import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WatchListTagsModalUI = ({tickerForTagsModal, tagList,
                               showTagsModal, onHideTagsModal,
                               onNewTagInputChange, onNewTagSelectionChange,
                               onUpdateTagsClick
                             }) =>
  <Modal bsSize="sm" show={showTagsModal} onHide={onHideTagsModal}>
    <Modal.Header closeButton>
      <Modal.Title>Tags for {tickerForTagsModal}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-group">
        {
          tagList.map((row, i) =>
            row.owner === 'self' &&
            <div className="checkbox" key={i}>
              <label>
                <input type="checkbox"
                  data-tag={row.tag}
                  onChange={onNewTagSelectionChange}
                  checked={row.hasTicker} />
                {row.tag}
              </label>
            </div>
          )
        }
        <input type="text" className="form-control" placeholder="New tag"
          onChange={onNewTagInputChange} />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onUpdateTagsClick}>Save</Button>
    </Modal.Footer>
  </Modal>

export default WatchListTagsModalUI;
