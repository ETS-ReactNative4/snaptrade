import React from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';

const ContestInfoPanelUI = ({contestInfo, contestPostion}) =>
  <div>
    {
      contestInfo &&
      <div className="pagehero">
          <Row className="show-grid">
              <Col xs={12} md={6}>
                { contestPostion &&
                  <div className="myrank">My Rank<br/><span>{contestPostion}</span></div>
                }

                <h4>{contestInfo.contest_name}{' '}
                <span className='text-muted small'>
                {contestInfo.start_date} to {contestInfo.end_date}
                </span></h4>
                <h4>Total Participants: {contestInfo.participant_count}</h4>
              </Col>
              <Col xs={12} md={6}>
                <p className='text-right text-muted'>
                Data is refreshed every 5 minutes
                </p>
              </Col>
          </Row>
      </div>
    }
  </div>

export default ContestInfoPanelUI;
