import React from 'react';
import { Button } from 'react-bootstrap';
import DeleteTagConfirmModalUI from './DeleteTagConfirmModalUI.js'

const TagFilterBoxUI = ({context, filteringTagObj, tagObjList, onFilterByTagClick, onDeleteTagClick,
  // confirm delete
  deleteTagId, deleteTagUuid, showDeleteTagModal, onHideDeleteTagModal, onDeleteTagSubmit}) =>
  <div>
  <div className='tag-container'>
    {
    tagObjList &&
      <div className={filteringTagObj ? 'tag' : 'tag selected'}>
        <a href='#' data-tag_id='all' data-tagUuid='all' onClick={onFilterByTagClick}>
          All
        </a>
      </div>
    }
    {
    tagObjList.map((tagObj, i) =>
      <div key={i} className={filteringTagObj && tagObj.tag_uuid === filteringTagObj.tag_uuid ? 'tag selected' : 'tag'}>
        {
          tagObj.owner !== 'self' &&
          <small>{tagObj.owner}<br/></small>
        }
        <a href='#' data-tag_id={tagObj.tag_id} data-tagUuid={tagObj.tag_uuid} onClick={onFilterByTagClick}>
          {tagObj.tag}
          <span className="badge"
            data-tag_id={tagObj.tag_id} data-tagUuid={tagObj.tag_uuid}
            data-owner={tagObj.owner}
            onClick={onDeleteTagClick}>
            x
          </span>
        </a>
      </div>
    )
    }
  </div>

  <div className='video-wrapper watchlist-help-video'>
    <iframe  className={context.showHelp ? 'visible' : "hidden"}  data-tag-id="helpVideo" src="https://www.youtube.com/embed/4zoP9cvgETE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

    <DeleteTagConfirmModalUI
      deleteTagId={deleteTagId}
      deleteTagUuid={deleteTagUuid}
      showDeleteTagModal={showDeleteTagModal}
      onHideDeleteTagModal={onHideDeleteTagModal}
      onDeleteTagSubmit={onDeleteTagSubmit}
    />
  </div>


export default TagFilterBoxUI;
