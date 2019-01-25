import React from 'react';
import Format from '../../common/Format.js'
import ValueChangeUI from '../ValueChangeUI.js'

{/* possible combinations:
- changePercent
- change, optionally changePercent
- value, optionally change, optionally changePercent
*/}
const ValueChangeCellUI = ({value, change, changePercent, valueSeparator}) =>
  <td className='text-right'>
    <ValueChangeUI value={value} change={change} changePercent={changePercent} valueSeparator={valueSeparator} />
  </td>

export default ValueChangeCellUI;
