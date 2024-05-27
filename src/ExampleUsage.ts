import { RuleEngine } from './engine/RuleEngine';
import { JsonRule } from './models/JsonRule';

// Initialize the RuleEngine
const engine = new RuleEngine();

// Define JSON rules with nested AND and OR conditions
const jsonRules: JsonRule[] = [
  {
    name: 'Check Adult with Status',
    condition: {
      type: 'logical',
      logicalOperator: 'AND',
      conditions: [
        {
          type: 'comparison',
          operator: '>=',
          field: 'age',
          value: 18,
        },
        {
          type: 'logical',
          logicalOperator: 'OR',
          conditions: [
            {
              type: 'comparison',
              operator: '==',
              field: 'status',
              value: 'student',
            },
            {
              type: 'comparison',
              operator: '==',
              field: 'status',
              value: 'employed',
            },
          ],
        },
      ],
    },
    action: {
      type: 'log',
      message: 'This adult is either a student or employed.',
    },
  },
];

// Add rules to the engine
engine.addRulesFromJSON(jsonRules);

// Evaluate data against the rules
const data1 = { name: 'John Doe', age: 20, status: 'student' };
engine.evaluate(data1); // Logs: This adult is either a student or employed.

const data2 = { name: 'Jane Doe', age: 22, status: 'unemployed' };
engine.evaluate(data2); // No log, as the condition is not met

const data3 = { name: 'Alice', age: 17, status: 'student' };
engine.evaluate(data3); // No log, as the age condition is not met

const data4 = { name: 'Bob', age: 25, status: 'employed' };
engine.evaluate(data4); // Logs: This adult is either a student or employed.
