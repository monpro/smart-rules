import { RuleAction } from "./RuleAction";
import { RuleCondition } from "./RuleCondition";

export interface JsonRule {
    name: string;
    condition: RuleCondition;
    action: RuleAction;
  }