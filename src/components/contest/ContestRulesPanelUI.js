import React from 'react';
import PanelUI from '../widgets/panel/PanelUI.js'

const ContestRulesPanelUI = () =>
  <PanelUI title='Contest Rules'>
    <ol>
      <li>Contest runs from Monday to Friday for one to two weeks.  Check the start/end dates top of the page.
        At the end of Friday person with highest accounts value is the winner
      </li>
      <li>Winner gets $100 Amazon online gift card that will be emailed to
        winner on Saturday</li>
      <li>Contest is open to anyone. Due to high volume, you could be in the queue,
        and will be invited in later contests.  You will be notified in email few days before contest starts.
      </li>
      <li>Contest can be stock or crypto type.  For stocks contest, only US based stocks/ETFs that are supported
      in our platform can be bought.  If it is a crypto contest, only crypto can be transacted. The name of the contest
      will signify what type of contest is that.
      </li>
    </ol>

    <h4>Trading Rules</h4>
    <ol>
      <li>$100,000 paper money given and margin trading not supported</li>
      <li>Only makret orders are supported and our prices could be 1 to 5 minutes delayed</li>
      <li>You can buy/sell the first day of the contest.  the transaction window remains open till the last day
      of the contest 24hrs a day.  If you buy after market hours, EOD price of last trading session is applid.
      </li>
    </ol>
  </PanelUI>

export default ContestRulesPanelUI;
