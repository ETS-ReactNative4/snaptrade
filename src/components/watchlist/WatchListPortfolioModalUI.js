import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const WatchListTagsModalUI = ({
                                  tagList,data,
                                  showPortfolioModal, handleHidePortfolioModal,
                                  handleNewPortfolioInputChange,
                                  onUpdatePortfolioClick
                              }) =>
    <Modal bsSize="sm" show={showPortfolioModal} onHide={handleHidePortfolioModal}>
        <Modal.Header closeButton>
            <Modal.Title>Enter Transaction info for portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Buy Price</label>
            <input defaultValue={data} type="text" className="form-control" placeholder="Buy Price"
                   onChange={(e)=>handleNewPortfolioInputChange("Price",e)}/>
            <br/>
            <label>Quantity Bought</label>
            <input required  type="number" className="form-control" placeholder="Quantity Bought"
                   onChange={(e)=>handleNewPortfolioInputChange("Quantity",e)}/>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onUpdatePortfolioClick}>Save</Button>
        </Modal.Footer>
    </Modal>

export default WatchListTagsModalUI;
