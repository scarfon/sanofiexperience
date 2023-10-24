/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"firebasestorage.googleapis.com",
			"sanofi8ac1.blob.core.windows.net",
		],
	},
};

module.exports = nextConfig;
