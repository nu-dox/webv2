import { env } from '$env/dynamic/private';

export function GET() {
	return new Response(env.MONGODB_URI ?? 'NOT FOUND');
}
