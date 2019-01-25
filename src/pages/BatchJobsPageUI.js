import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { Table, Panel } from 'react-bootstrap';
import Format from '../components/common/Format.js'
import SpinnerUI from '../components/widgets/SpinnerUI.js'
import PanelUI from '../components/widgets/panel/PanelUI.js'

const BatchJobsPageUI = ({ itemList }) =>
  <Grid>
    <Row>
      <Col xs={12}>
      <PanelUI title=''>
        { !itemList && <SpinnerUI /> }
        {
          itemList &&
          <Table responsive>
            <BatchJobHeaderUI />
            {
              itemList.map((item, i) =>
                <tbody key={i}>
                  <BatchJobRowUI rownum={i} item={item} />
                </tbody>
              )
            }
          </Table>
        }
      </PanelUI>
      </Col>
    </Row>
  </Grid>

const BatchJobHeaderUI = () =>
  <tbody>
  <tr>
    <th>table</th>
    <th className='text-right'>dt</th>
    <th className='text-right'>dt0</th>
    <th className='text-right'>dt1</th>
    <th className='text-right'>dt2</th>
    <th className='text-right'>dt3</th>
    <th className='text-right'>dt4</th>
    <th className='text-right'>dt5</th>
    <th className='text-right'>dt6</th>
    <th className='text-right'>dt7</th>
    <th className='text-right'>dt8</th>
  </tr>
  </tbody>

const BatchJobRowUI = ({item}) =>
  <tr>
    <td className='text-nowrap'>{item.table_name}</td>
    <td className='text-right'>{item.dt}</td>
    <td className='text-right'>{item.dt0}</td>
    <td className='text-right'>{item.dt1}</td>
    <td className='text-right'>{item.dt2}</td>
    <td className='text-right'>{item.dt3}</td>
    <td className='text-right'>{item.dt4}</td>
    <td className='text-right'>{item.dt5}</td>
    <td className='text-right'>{item.dt6}</td>
    <td className='text-right'>{item.dt7}</td>
    <td className='text-right'>{item.dt8}</td>
  </tr>

export default BatchJobsPageUI;
