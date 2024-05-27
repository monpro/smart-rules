import { CustomFunction } from '../models/CustomFunction';
import { JsonRule } from '../models/JsonRule';
import { Rule } from '../models/Rule';
import { RuleData } from '../models/RuleData';
import { executeAction } from '../utils/ActionExecutor';
import { eveluateCondition } from '../utils/ConditionEvaluator';

export class RuleEngine {
  private rules: Rule[] = [];
  private customeFunctions: { [key: string]: CustomFunction } = {};

  addRule(rule: Rule) {
    this.rules.push(rule);
  }

  addRulesFromJSON(jsonRules: JsonRule[]) {
    for (const jsonRule of jsonRules) {
      this.addRule({
        name: jsonRule.name,
        condition: jsonRule.condition,
        action: jsonRule.action,
      });
    }
  }

  addCustomFunction(name: string, fn: CustomFunction) {
    this.customeFunctions[name] = fn;
  }

  evaluate(data: RuleData) {
    for (const rule of this.rules) {
      if (eveluateCondition(rule.condition, data, this.customeFunctions)) {
        executeAction(rule.action, data, this.customeFunctions);
      }
    }
  }
}
