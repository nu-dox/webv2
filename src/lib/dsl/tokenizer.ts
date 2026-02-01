export interface Token {
	type: 'FIELD' | 'OPERATOR' | 'VALUE';
	value: string;
}

const OPERATORS = [':', '=', '>', '<', '>=', '<='];

export function tokenize(input: string): Token[] {
	const tokens: Token[] = [];
	const parts = input.split(/(\s+|[:=><]+)/).filter((part) => part.trim().length > 0);

	for (const part of parts) {
		if (OPERATORS.includes(part)) {
			tokens.push({ type: 'OPERATOR', value: part });
		} else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(part)) {
			tokens.push({ type: 'FIELD', value: part });
		} else {
			tokens.push({ type: 'VALUE', value: part });
		}
	}

	return tokens;
}
