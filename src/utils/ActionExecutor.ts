import { CustomFunction } from '../models/CustomFunction';
import { RuleAction } from '../models/RuleAction';
import { RuleData } from '../models/RuleData';

export function executeAction(
  action: RuleAction,
  data: RuleData,
  customFunctions: {
    [key: string]: CustomFunction;
  },
) {
  switch (action.type) {
    case 'log':
      console.log(action.message);
      break;
    case 'function': {
      const fn = customFunctions[action.functionName!];
      if (fn) {
        fn(data);
      } else {
        throw new Error(`Unknown function: ${action.functionName}`);
      }
      break;
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
