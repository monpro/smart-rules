import { RuleAction } from './RuleAction';
import { RuleCondition } from './RuleCondition';

export interface Rule {
  name: string;
  condition: RuleCondition;
  action: RuleAction;
}
