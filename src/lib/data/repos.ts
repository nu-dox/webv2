export interface Repo {
	slug: string;
	name: string;
	owner: string;
	description: string;
	stars: string;
	hasData: boolean; // Whether we have actual documentation data for this repo
}

export const repos: Repo[] = [
	{
		slug: 'rust-axios',
		name: 'axios',
		owner: 'rust',
		description: 'Promise based HTTP client for Rust - A powerful library for making HTTP requests with ease.',
		stars: '12.3k',
		hasData: true
	},
	{
		slug: 'microsoft-vscode',
		name: 'vscode',
		owner: 'microsoft',
		description: 'Visual Studio Code - A lightweight but powerful source code editor.',
		stars: '180.4k',
		hasData: false
	},
	{
		slug: 'huggingface-transformers',
		name: 'transformers',
		owner: 'huggingface',
		description: 'Transformers: the model-definition framework for state-of-the-art machine learning models in text, vision, and more.',
		stars: '154.7k',
		hasData: false
	},
	{
		slug: 'microsoft-playwright',
		name: 'playwright',
		owner: 'microsoft',
		description: 'Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit.',
		stars: '80.9k',
		hasData: false
	},
	{
		slug: 'opendatalab-mineru',
		name: 'MinerU',
		owner: 'opendatalab',
		description: 'Transforms complex documents like PDFs into LLM-ready markdown/JSON for your Agentic workflows.',
		stars: '51.7k',
		hasData: false
	},
	{
		slug: 'karpathy-nanochat',
		name: 'nanochat',
		owner: 'karpathy',
		description: 'The best ChatGPT that $100 can buy.',
		stars: '39.9k',
		hasData: false
	},
	{
		slug: 'celery-celery',
		name: 'celery',
		owner: 'celery',
		description: 'Distributed Task Queue for Python - Asynchronous task queue/job queue based on distributed message passing.',
		stars: '22.6k',
		hasData: false
	},
	{
		slug: 'tencent-ncnn',
		name: 'ncnn',
		owner: 'Tencent',
		description: 'ncnn is a high-performance neural network inference framework optimized for the mobile platform.',
		stars: '22.6k',
		hasData: false
	},
	{
		slug: 'nextapps-flexsearch',
		name: 'flexsearch',
		owner: 'nextapps-de',
		description: 'Next-generation full-text search library for Browser and Node.js.',
		stars: '13.5k',
		hasData: false
	}
];

export function getRepoBySlug(slug: string): Repo | undefined {
	return repos.find(r => r.slug === slug);
}
