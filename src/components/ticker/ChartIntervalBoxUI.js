import React from 'react';
import { Button } from 'react-bootstrap';

const ChartIntervalBoxUI = ({selectedPeriod, on1DayClick, on30DayClick, on1YearClick}) =>
  <ul className='list-inline'>
    <li>
      <Button type="button"
        className={selectedPeriod=='1d' && 'btn-info'}
        onClick={on1DayClick}>
        1d
      </Button>
    </li>
    <li>
      <Button type="button"
        className={selectedPeriod=='30d' && 'btn-info'}
        onClick={on30DayClick}>
        30d
      </Button>
    </li>
    <li>
      <Button type="button"
        className={selectedPeriod=='1y' && 'btn-info'}
        onClick={on1YearClick}>
        1yr
      </Button>
    </li>
  </ul>

export default ChartIntervalBoxUI;
