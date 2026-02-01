import type { Token } from '../dsl/tokenizer.js';

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
		console.log(fieldToken);

		if (!fieldToken || !operatorToken || !valueToken) {
			continue;
		}

		filters.push({
			field: fieldToken.value,
			operator: operatorToken.value,
			value: parseValue(valueToken.value)
		});
	}

	return filters;
}

function parseValue(value: string): string | number | boolean {
	if (/^\d+$/.test(value)) {
		return parseInt(value, 10);
	} else if (/^\d+\.\d+$/.test(value)) {
		return parseFloat(value);
	} else if (value.toLowerCase() === 'true') {
		return true;
	} else if (value.toLowerCase() === 'false') {
		return false;
	}
	return value;
}
