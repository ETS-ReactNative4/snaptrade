import React, { Component } from 'react';
import TagFilterBoxUIScanner from './TagFilterBoxUIScanner.js';
import scanner_tags from '../../apiclient/tickers/scanner_tags.js';

class TagFilterBoxScanner extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <TagFilterBoxUIScanner
          filteringTagObj_scanner={this.props.filteringTagObj_scanner}
          tagObjList_scanner={this.props.tagObjList_scanner}
          onFilterByTagClick_scanner={this.props.onFilterByTagClick_scanner}
        />
      </div>
    );
  }

 
}

export default TagFilterBoxScanner;
