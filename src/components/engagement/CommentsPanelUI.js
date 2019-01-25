import React from 'react';
import { Tabs, Tab, Panel, Button,FormGroup,FormControl } from 'react-bootstrap';

const CommentsPanelUI = ({anonymous, objectId, collapsed, objectName,
    commentSummary, newComment, commentList, onCommentChange, onCommentPost}) =>

  <div className="colabpanel">
  <h3>{'Comments' + (objectName ? ' for watch list: ' + objectName : '')}
  {
    commentSummary.cnt !== 0 &&
      <span className="cntcount">{commentSummary.cnt}</span>
  }
  </h3>
  <div className="panel panel-default">
    <div className="panel-body">
    {
      anonymous &&
      <div>Sign Up to write a comment</div>
    }

    {
      commentList &&
        <ul className="colabcomments">
          <br/>
          {
            commentList.map((comment, i) =>
              <CommentRowUI key={i} rownum={i} comment={comment} />
            )
          }
        </ul>
    }

    {
      ! anonymous &&
      <div>
        <br />
        <CommentFormUI
          newComment={newComment}
          onCommentChange={onCommentChange}
          onCommentPost={onCommentPost}
        />
      </div>
    }
  </div>
  </div>
  </div>

const CommentRowUI = ({comment}) =>
  <li>
    <span className="glyphicon glyphicon-user profilepic"></span>
    <div className="commentItem">
    <strong>{comment.nickname}:</strong>{' '}
    {comment.comment}
    <br/>
    <small>{comment.create_date_formatted}</small>
    </div>
  </li>

const CommentFormUI = ({newComment, onCommentChange, onCommentPost}) =>
  <form>
    <div className='col-xs-12 col-sm-6'>
      <FormGroup controlId="newComment">
        <FormControl
          placeholder="Write a comment" type="text"
          value={newComment} onChange={onCommentChange}
        />
      </FormGroup>
    </div>

    <div className='col-xs-12 col-sm-6'>
      <FormGroup>
        <Button bsStyle="primary" className='pull-left' onClick={onCommentPost}>
          Post Comment
        </Button>
      </FormGroup>
    </div>

    <div className='clearfix' />
  </form>


export default CommentsPanelUI;
