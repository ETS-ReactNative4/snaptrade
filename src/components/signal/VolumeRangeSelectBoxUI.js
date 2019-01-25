import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const VolumeRangeSelectBoxUI = ({volumeRangeList, selectedVolumeRangeId, onVolumeRangeChange}) =>
  <Form inline>
  <small>Volume<br/></small>
  <FormGroup controlId="sl_volume_range_select">
  <select className='form-control' value={selectedVolumeRangeId} onChange={onVolumeRangeChange}>
  <option value="-1">All</option>
  {
    volumeRangeList.map((volumeRange, i) =>
      <option
        value={volumeRange.id} key={i}
        data-min-volume={volumeRange.min_volume}
        data-max-volume={volumeRange.max_volume}
      >
        {volumeRange.display}
      </option>
    )
  }
  </select>
  </FormGroup>
  </Form>

export default VolumeRangeSelectBoxUI;
