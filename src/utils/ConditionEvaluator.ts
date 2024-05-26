import { RuleCondition } from '../models/RuleCondition';
import { RuleData } from '../models/RuleData';

export function eveluateCondition(
  condition: RuleCondition,
  data: RuleData,
  customeFunction: { [key: string]: Function },
): boolean {
  switch (condition.type) {
    case 'comparison':
      return evaluateComparision(condition, data);
    case 'logical':
      return eveluateLogical(condition, data, customeFunction);
    case 'presence':
      return evaluatePresence(condition, data);
    default:
      throw new Error(`Unknown condition type: ${condition.type}`);
  }
}

function evaluateComparision(
  condition: RuleCondition,
  data: RuleData,
): boolean {
  const field = condition.field!;
  const value = condition.value!;

  switch (condition.operator) {
    case '>=':
      return data[field] >= value;
    case '<=':
      return data[field] <= value;
    case '==':
      return data[field] === value;
    case '!=':
      return data[field] !== value;
    case '>':
      return data[field] > value;
    case '<':
      return data[field] < value;
    default:
      throw new Error(`Unknown operator: ${condition.operator}`);
  }
}
function eveluateLogical(
  condition: RuleCondition,
  data: RuleData,
  customeFunction: { [key: string]: Function },
): boolean {
  throw new Error('Function not implemented.');
}

function evaluatePresence(condition: RuleCondition, data: RuleData): boolean {
  throw new Error('Function not implemented.');
}
