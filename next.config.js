/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    crossOrigin: 'anonymous',
    images: {
        remotePatterns: [
            {
                hostname: 'replicate.delivery',
                protocol: 'https',
            },
        ],
    },
};

export default config;
