import React from 'react';
import {DotLoader} from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import {Link} from "react-router-dom";
import {OverlayTrigger, Popover} from 'react-bootstrap'
import Constants from '../common/Constants.js';

const SignalPanelUI = ({signalList}) =>
    <div>
        <a name="TechnicalSignal"/>
        <PanelUI title='Signals' wide={true}>
            <table className="table" style={{width: '100%'}}>
                {
                    signalList.map((item, i) =>
                        <tbody key={i}>
                        <TableRowUI
                            item={item}
                        />
                        </tbody>
                    )
                }
            </table>
        </PanelUI>
    </div>

const TableRowUI = ({item}) =>
    <tr>
        <td>
            {item.run_date_formatted}
        </td>
        <td>
            {item.rule_name_original}
        </td>
    </tr>

export default SignalPanelUI;
