import React from 'react';
import PanelUI from '../widgets/panel/PanelUI.js'

const TopNewsPanelUI = ({storiesList}) =>
    <PanelUI title='Summary' wide={true}>
        <ul className="stories">
            {
                storiesList.map((item, i) =>
                    <li key={i}>
                        <StoriesListTableRowUI
                            item={item}
                        />
                    </li>
                )
            }
        </ul>
    </PanelUI>;

const StoriesListTableRowUI = ({item}) =>

    <span>
      <a href={`#${item.label_name.split(' ').join('')}`}><strong>{item.label_name}</strong></a> {item.label_details}
  </span>

export default TopNewsPanelUI;
