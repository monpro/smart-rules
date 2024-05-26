export type RuleActionType = 'log' | 'function' | 'modify';
export type RuleModificationValue =
  | string
  | number
  | boolean
  | RuleModificationValue[];

export interface RuleAction {
  type: RuleActionType;
  message?: string;
  functionName?: string;
  modifications?: {
    field: string;
    value: RuleModificationValue;
  }[];
}
