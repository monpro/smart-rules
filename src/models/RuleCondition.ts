export type LogicalOperator = 'AND' | 'OR' | 'NOT';
export type RuleConditionType = 'comparison' | 'logical' | 'presence';
export type RuleConditionValue =
  | string
  | number
  | boolean
  | RuleConditionValue[];

export interface RuleCondition {
  type: RuleConditionType;
  operator?: string;
  field?: string;
  value?: RuleConditionValue;
  conditions?: RuleCondition[];
  logicalOperator?: LogicalOperator;
}
