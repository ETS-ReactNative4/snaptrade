import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteTagConfirmModalUI = ({deleteTagId, deleteTagUuid,
                               showDeleteTagModal, onHideDeleteTagModal,
                               onDeleteTagSubmit
                             }) =>
  <Modal show={showDeleteTagModal} onHide={onHideDeleteTagModal}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this tag?
    </Modal.Body>
    <Modal.Footer>
      <button type="submit" className="btn btn-primary" onClick={onDeleteTagSubmit}
        data-tagId={deleteTagId} data-tagUuid={deleteTagUuid}>
        Delete</button>
    </Modal.Footer>
  </Modal>

export default DeleteTagConfirmModalUI;
