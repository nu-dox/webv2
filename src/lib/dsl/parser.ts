import { Token } from "../dsl/tokenizer.js";

export interface FilteredExpression {
  field: string;
  operator: string;
  value: string | number | boolean;
}

export function parseTokens(tokens: Token[]): FilteredExpression[] {
  const filters: FilteredExpression[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const fieldToken = tokens[i];
    const operatorToken = tokens[i + 1];
    const valueToken = tokens[i + 2];

    if (!fieldToken || !operatorToken || !valueToken) {
      throw new Error("Invalid token sequence");
    }

    filters.push({
      field: fieldToken.value,
      operator: operatorToken.value,
      value: valueToken.value,
    });
  }

  return filters;
}