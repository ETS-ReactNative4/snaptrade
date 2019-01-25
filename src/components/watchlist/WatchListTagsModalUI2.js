import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WatchListTagsModalUI = ({tickerForTagsModal, tagList,
                               showTagsModal, onHideTagsModal,
                               onNewTagInputChange, onNewTagSelectionChange,
                               onUpdateTagsClick
                             }) =>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" />
          <h4 class="modal-title" id="myModalLabel">Tags for {tickerForTagsModal}</h4>
        </div>
        <div class="modal-body">
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
        </div>
        <div class="modal-footer">
          <Button onClick={onUpdateTagsClick}>Save</Button>
        </div>
      </div>
    </div>
  </div>

export default WatchListTagsModalUI;
