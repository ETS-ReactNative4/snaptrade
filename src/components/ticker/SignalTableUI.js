//import React from 'react';
import React from 'react';
import {Table, Panel, Glyphicon} from 'react-bootstrap';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import Format from '../common/Format.js'

const SignalTableUI = ({collapsed, signalList, onSignalExpand, onSignalCollapse}) =>
    <div>

        <h3>Signals</h3>
        <div className="panel panel-default">
            <div className="panel-body">
                <Table responsive>
                    <GainTableSignalTableHeaderUI/>
                    {
                        signalList.map((signal, i) =>
                            <tbody key={i}>
                            <GainTableSignalTableRowUI
                                rownum={i}
                                signal={signal}
                                onSignalExpand={onSignalExpand}
                                onSignalCollapse={onSignalCollapse}
                            />
                            </tbody>
                        )
                    }
                </Table>
            </div>
        </div>
    </div>
/*
const tooltips_signal = {
   making_52_week_highs: (<Popover id="making 52 week highs"><span>Rule1 making_52_week_highs </span></Popover>),
   high_volume_gainer: (<Popover id="high_volume_gainer"><span>high_volume_gainer eee </span></Popover>),
};
*/

const GainTableSignalTableHeaderUI = () =>
    <tbody>
    <tr>
        <th className='text-left'>Technical Signal</th>
        <th className='text-center'>Signal Date</th>
        <th className='text-left'>Signal Details</th>
        <th className='text-right'>Last Price</th>
        <th className='text-center'>Chg%</th>
        <th className='text-center'>Vol</th>
        <th className='text-right'>Vol Chg%</th>
    </tr>
    </tbody>

let truncateString = {
    'width': '400px',
    'whiteSpace': 'nowrap',
    'overflow': 'hidden',
    'textOverflow': 'ellipsis'
}

const GainTableSignalTableRowUI = ({signal, onSignalExpand, onSignalCollapse}) =>
    <tr>
        <td className='text-left'>
            {signal.rule_name}{' '}
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={
                    <Popover id={signal.rule_name}>{signal.rule_desc}</Popover>
                }
            >
                <Glyphicon glyph="info-sign" className='text-muted'/>
            </OverlayTrigger>
        </td>
        <td className='text-center'>{signal.run_date_formatted}</td>
        <td className='text-left'>
            {
                signal.expanded &&
                <div style={{'width': '400px'}}>{signal.comments}</div>
            }
            {
                signal.expanded &&
                <a href='#less' onClick={onSignalCollapse} data-signal_id={signal.id}>less</a>
            }
            {
                !signal.expanded &&
                <div style={truncateString}>{signal.comments}</div>
            }
            {
                !signal.expanded &&
                <a href='#more' onClick={onSignalExpand} data-signal_id={signal.id}>more</a>
            }
        </td>

        <td className='text-right'>
            {signal.close !== 0 ? signal.close_formatted : 'NA'}
        </td>
        <td className='text-right'>
      <span className={signal.price_gain_percentage < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(signal.price_gain_percentage)}
      </span>
        </td>
        <td className='text-right'>
            {signal.volume !== 0 ? signal.volume_formatted : 'NA'}
        </td>
        <td className='text-right'>
      <span className={signal.volume_gain_percentage < 0 ? 'text-danger' : 'text-success'}>
      {Format.percent(signal.volume_gain_percentage)}
      </span>
        </td>
    </tr>

export default SignalTableUI;
