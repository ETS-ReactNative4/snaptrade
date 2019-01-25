import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const SectorSelectBoxUI = ({sectorList, selectedSectorId, onSectorChange}) =>
  <Form inline>
    <small>Sector<br/></small>
    <FormGroup controlId="sl_sector_select">
    <select className='form-control' value={selectedSectorId} onChange={onSectorChange}>
    <option value="-1">All</option>
    {
      sectorList.map((sector, i) =>
        <option value={sector.id} key={i}>{sector.name}</option>
      )
    }
    </select>
    </FormGroup>
  </Form>

export default SectorSelectBoxUI;
