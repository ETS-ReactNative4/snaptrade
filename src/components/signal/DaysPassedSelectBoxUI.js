import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const DaysPassedSelectBoxUI = ({ageRangeList, selectedAgeRangeId, onAgeRangeChange}) =>
  <Form inline>
  <small>Days Passed<br/></small>
  <FormGroup controlId="sl_days_passed_select">
  <select className='form-control' value={selectedAgeRangeId} onChange={onAgeRangeChange}>
  {
    ageRangeList.map((ageRange, i) =>
      <option value={ageRange.id} key={i}
        data-max-age={ageRange.max_age}
      >
        {ageRange.display}
      </option>
    )
  }
  </select>
  </FormGroup>
  </Form>

export default DaysPassedSelectBoxUI;
