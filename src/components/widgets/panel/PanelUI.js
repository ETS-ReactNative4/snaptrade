import React from 'react';

// note: children is a special props
const PanelUI = ({title, wide, children, cssClass, table}) =>
  <div style={{position: 'relative'}}>
    <div className={"panel panel-default" + (cssClass ? ' ' + cssClass : '') }>
      { title &&
        <div className="panel-heading" style={{paddingBottom: 0}}>
          {
            ! wide &&
            <h3 className="panel-title">{title}</h3>
          }
          {
            wide &&
            <h3 style={{marginTop: 0}}>{title}</h3>
          }
        </div>
      }
      {
        (!table || wide) &&
        <div className="panel-body">
          {children}
        </div>
      }
      {
        table && !wide &&
        <span>
          {children}
        </span>
      }
    </div>
  </div>

export default PanelUI;
