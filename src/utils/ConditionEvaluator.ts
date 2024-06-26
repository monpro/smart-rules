import { CustomFunction } from '../models/CustomFunction';
import { RuleCondition } from '../models/RuleCondition';
import { RuleData } from '../models/RuleData';

export function eveluateCondition(
  condition: RuleCondition,
  data: RuleData,
  customFunctions: { [key: string]: CustomFunction },
): boolean {
  switch (condition.type) {
    case 'comparison':
      return evaluateComparision(condition, data);
    case 'logical':
      return eveluateLogical(condition, data, customFunctions);
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
  customFunctions: { [key: string]: CustomFunction },
): boolean {
  const conditions = condition.conditions!;
  switch (condition.logicalOperator) {
    case 'AND':
      for (const cond of conditions) {
        if (!eveluateCondition(cond, data, customFunctions)) {
          return false;
        }
      }
      return true;
    case 'OR':
      for (const cond of conditions) {
        if (eveluateCondition(cond, data, customFunctions)) {
          return true;
        }
      }
      return false;
    case 'NOT':
      return !eveluateCondition(conditions[0], data, customFunctions);
    default:
      throw new Error(`Unknown logical operator: ${condition.operator}`);
  }
}

function evaluatePresence(condition: RuleCondition, data: RuleData): boolean {
  return condition.field! in data;
}
