import React, { Component } from 'react';
import SharePanelUI from '../engagement/SharePanelUI.js';
import watchlist_share_tags from '../../apiclient/watchlist/watchlist_share_tags.js';
import watchlist_share_tags_users from '../../apiclient/watchlist/watchlist_share_tags_users.js';

class SharePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      shareeList : null,
      newSharee : '',
      shareSuccess : null,
      shareError : null,
      currentTagId : null
    };

    this.getShareeListCallback = this.getShareeListCallback.bind(this);
    this.handleDeleteShareeSubmit = this.handleDeleteShareeSubmit.bind(this)
    this.handleDeleteShareeCallback = this.handleDeleteShareeCallback.bind(this)

    this.handleNewShareeEdit = this.handleNewShareeEdit.bind(this);
    this.handleNewShareeSubmit = this.handleNewShareeSubmit.bind(this);
    this.handleNewShareeCallback = this.handleNewShareeCallback.bind(this);

    this.clearForm = this.clearForm.bind(this)
  }

  render() {
    console.log(this.props.filteringTagObj);
    if (this.state.shareeList == null) {
      this.state.shareeList = []
      watchlist_share_tags.get(this.getShareeListCallback,
        this.props.filteringTagObj.tag_id)
    }
    return (
      <SharePanelUI
        anonymous={this.props.anonymous}
        isLoading={this.state.isLoading}
        objectId={this.props.filteringTagObj.tag_id}
        objectName={this.props.filteringTagObj.tag}

        shareSummary={this.props.shareSummary}
        shareeList={this.state.shareeList}
        onDeleteShareeSubmit={this.handleDeleteShareeSubmit}

        newSharee={this.state.newSharee}
        shareSuccess={this.state.shareSuccess}
        shareError={this.state.shareError}
        onNewShareeEdit={this.handleNewShareeEdit}
        onNewShareeSubmit={this.handleNewShareeSubmit}
      />
    );
  }

  componentWillReceiveProps(props) {
    console.log(props.filteringTagObj);
    if (props.filteringTagObj.tag_id !== this.state.currentTagId)
      this.setState({
        shareSuccess : null,
        shareError : null,
        currentTagId : props.filteringTagObj.tag_id
      })

    watchlist_share_tags.get(this.getShareeListCallback, props.filteringTagObj.tag_id)
  }

  getShareeListCallback(shareeList, tagId) {
    this.setState({
      shareeList : shareeList,
      newSharee : '',
    })
  }

  handleDeleteShareeSubmit(event) {
    event.preventDefault()
    let userId = event.target.getAttribute('data-user_id')
    watchlist_share_tags_users.delete(this.handleDeleteShareeCallback,
      this.state.currentTagId, userId)
  }

  handleDeleteShareeCallback(response, tagId, userId) {
    watchlist_share_tags.get(this.getShareeListCallback, this.state.currentTagId)
    this.props.onEngagementChange();
  }

  handleNewShareeEdit(e)  {
    this.setState({ newSharee: e.target.value });
  }

  handleNewShareeSubmit(event) {
    event.preventDefault()
    watchlist_share_tags.post(
      this.handleNewShareeCallback,
      this.props.filteringTagObj.tag_id,
      this.state.newSharee)
  }

  handleNewShareeCallback(response, tagId) {
    if (response.success) {
      this.setState({
        newSharee : '',
        shareSuccess : response.success,
        shareError : null
      })
      setTimeout(this.clearForm, 6000)
      this.props.onEngagementChange();
    }

    if (response.error) {
      this.setState({
        shareError : response.error,
        shareSuccess : null
      })
    }
  }

  clearForm() {
    this.setState({
      shareSuccess : null
    })
  }

}

export default SharePanel;
