import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const RuleSelectBoxUI = ({trend, ruleList, ruleId, onRuleChange}) =>
  <Form inline>
    <small>Signal<br/></small>
    <FormGroup controlId="sl_rule_select">
    <select className='form-control' value={ruleId} onChange={onRuleChange}>
    <option value="-1">All</option>
    {
      ruleList.map((rule, i) =>
        trend === rule.type && <option value={rule.id} key={i}>{rule.display}</option>
      )
    }
    </select>
    </FormGroup>
  </Form>

export default RuleSelectBoxUI;
