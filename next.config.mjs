import path from "node:path";
import { fileURLToPath } from "node:url";
import { withContentlayer } from "next-contentlayer2";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	// Pin the workspace root to this project so Next.js does not pick up
	// unrelated lockfiles in parent directories.
	outputFileTracingRoot: projectRoot,
	experimental: {
		mdxRs: true,
	},
	webpack: (config) => {
		// Contentlayer loads its generated package through a dynamic import that
		// webpack's cache cannot analyse, which logs a harmless warning on every
		// compile. Only surface real infrastructure errors.
		config.infrastructureLogging = { level: "error" };
		return config;
	},
};

export default withContentlayer(nextConfig);
