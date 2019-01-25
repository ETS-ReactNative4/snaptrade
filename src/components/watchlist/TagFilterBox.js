import React, { Component } from 'react';
import TagFilterBoxUI from './TagFilterBoxUI.js';
import watchlist_tags from '../../apiclient/watchlist/watchlist_tags.js';
import watchlist_share_tags from '../../apiclient/watchlist/watchlist_share_tags.js';

class TagFilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      deleteTagId : null,
      deleteTagUuid : null,
      deleteTagOwner : null,
      showDeleteTagModal : false
    };
    this.deleteWatchListTagCallback = this.deleteWatchListTagCallback.bind(this);

    // tag filter
    this.handleDeleteTagClick = this.handleDeleteTagClick.bind(this);

    this.handleHideDeleteTagModal=this.handleHideDeleteTagModal.bind(this)
    this.handleDeleteTagSubmit=this.handleDeleteTagSubmit.bind(this)


  }

  render() {
    // console.log(this.state.filteringTagObj);
    return (
      <div>
        <TagFilterBoxUI
          context={this.props.context}
          filteringTagObj={this.props.filteringTagObj}
          tagObjList={this.props.tagObjList}
          onFilterByTagClick={this.props.onFilterByTagClick}

          // delete
          onDeleteTagClick={this.handleDeleteTagClick}
          showDeleteTagModal={this.state.showDeleteTagModal}
          onHideDeleteTagModal={this.handleHideDeleteTagModal}
          onDeleteTagSubmit={this.handleDeleteTagSubmit}

          onWatchlistTagsChange={this.props.onWatchlistTagsChange}
        />
      </div>
    );
  }

  componentWillMount(){
    this.props.context.showHelp = false;
  }

  componentWillUnMount(){
    this.props.context.showHelp = false;
  }
  componentWillReceiveProps(props) {
    this.setState({showHelp: props.context.showHelp});
  }

  handleDeleteTagClick(event) {
    event.preventDefault()
    // don't want tag to get selected, if not selected already
    event.stopPropagation()
    let tagId = event.target.getAttribute('data-tag_id')
    let tagUuid = event.target.getAttribute('data-tagUuid')
    let owner = event.target.getAttribute('data-owner')
    console.log(tagId, owner)
    this.setState({
      deleteTagId : tagId,
      deleteTagUuid : tagUuid,
      deleteTagOwner : owner,
      showDeleteTagModal : true,
      helpClicked : false
    })
  }


  handleDeleteTagSubmit(event) {
    event.preventDefault()
    let tagId = this.state.deleteTagId
    let tagUuid = this.state.deleteTagUuid
    let owner = this.state.deleteTagOwner
    console.log(tagId, owner)
    if (owner === 'self')
      watchlist_tags.delete(tagId, this.deleteWatchListTagCallback)
    if (owner !== 'self')
      watchlist_share_tags.delete(this.deleteWatchListTagCallback, tagId)
  }

  deleteWatchListTagCallback(deletedTagId) {
    this.setState({
      deleteTagId : null,
      deleteTagUuid : null,
      deleteTagOwner : null,
      showDeleteTagModal : false
    })
    this.props.onWatchlistTagsChange(parseInt(deletedTagId))
  }

  handleHideDeleteTagModal() {
    this.setState({showDeleteTagModal : false})
  }
}

export default TagFilterBox;
