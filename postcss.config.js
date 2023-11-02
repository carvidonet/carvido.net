module.exports = {
	plugins: {
		"postcss-import": {},
		"tailwindcss/nesting": "postcss-nesting",
		tailwindcss: {},
		autoprefixer: {},
	},
	async headers() {
		return [
		  {
			source: '/:path*',
			headers: [
			  {
				key: 'Strict-Transport-Security',
				value: 'max-age=63072000; includeSubDomains; preload',
			  },
			],
		  },
		]
	  },
};
