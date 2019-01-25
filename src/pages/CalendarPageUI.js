import React from 'react';
import PageUI from '../components/widgets/PageUI.js';
import CalendarPanel from '../components/calendar/CalendarPanel.js'

const CalendarPageUI = ({context}) =>
<PageUI title='Earnings Calendar'>
  <CalendarPanel
    context={context}/>
</PageUI>

export default CalendarPageUI;
