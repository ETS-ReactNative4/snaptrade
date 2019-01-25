import React from 'react';
import { Button } from 'react-bootstrap';


const TagFilterBoxUIScanner = ({filteringTagObj_scanner, tagObjList_scanner, onFilterByTagClick_scanner}) =>

  <div className="tag-container">
    {
    tagObjList_scanner.map((tagObj, i) =>
      <div key={i} className={filteringTagObj_scanner==tagObj.tag ? 'tag selected' : 'tag'}>
        <a href='#' data-tag={tagObj.tag} onClick={onFilterByTagClick_scanner}>{tagObj.tag_display}</a>
        <div className="hide">
          <Button type="button" style={{'border': 'none'}}
            className={filteringTagObj_scanner==tagObj.tag ? 'tag selected' : 'tag'}
            value={tagObj.tag}
            onClick={onFilterByTagClick_scanner}>
            {tagObj.tag_display}
          </Button>
        </div>
      </div>
    )
    }
  </div>


export default TagFilterBoxUIScanner;
