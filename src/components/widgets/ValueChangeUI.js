import React from 'react';
import Format from '../common/Format.js'

{/* possible combinations:
- changePercent
- change, optionally changePercent
- value, optionally changePercent
- value, optionally change, + optionally changePercent
- valueSeparator=newline (default=',')
*/}
const ValueChangeUI = ({value, change, changePercent, valueSeparator}) =>
  <span>
    { /* only changePercent */
      (! value && value !== 0) && (! change && change !== 0) &&
      <span className={changePercent < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(changePercent)}
      </span>
    }

    { /* change, optionally changePercent */
      (! value && value !== 0) && (change || change === 0) &&
        <span className={change < 0 ? 'text-danger text-nowrap' : 'text-success text-nowrap'}>
          {Format.value(change)}
          {
            (changePercent || changePercent === 0) &&
            <span>{' '}
              ({Format.percent(changePercent)})
            </span>
          }
        </span>
    }

    { /* value, optionally change and changePercent */
      (value || value === 0) &&
        <span>
          {value}
          {
            (change || change === 0) &&
              <span>
                {valueSeparator==='newline' ? <br/> : ', '}
                <span className={change < 0 ? 'text-danger' : 'text-success'}>
                  {Format.value(change)}
                  {
                    (changePercent || changePercent === 0) &&
                      <span>{' '}
                        ({Format.percent(changePercent)})
                      </span>
                  }
                </span>
              </span>
          }
          {
            ! change && (changePercent || changePercent === 0) &&
              <span className={valueSeparator==='newline' ? 'small' : ''}>
                {valueSeparator==='newline' ? <br/> : ', '}
                <span className={changePercent < 0 ? 'text-danger' : 'text-success'}>
                  {Format.percent(changePercent)}
                </span>
              </span>
          }
        </span>
    }

  </span>

export default ValueChangeUI;
