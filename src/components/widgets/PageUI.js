import React from 'react';

// note: children is a special props
const PageUI = ({title, cssClass, children}) =>
  <div className={cssClass + " container"}>
    { title && <h1>{title}</h1> }
    {children}
  </div>

export default PageUI;
