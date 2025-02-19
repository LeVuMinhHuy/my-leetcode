/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		// REMINDER: new react compiler to memoize the components
		// https://react.dev/learn/react-compiler
		reactCompiler: true,
	},
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=1, stale-while-revalidate=59',
					},
				],
			},
		];
	},
};

export default nextConfig;
