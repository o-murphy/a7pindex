import { readFileSync } from 'fs';
import path from 'path';

// Read package.json
const pkg = JSON.parse(readFileSync(path.resolve('./package.json'), 'utf-8'));

// Detect if we are building for GitHub Pages
const isGhPages = process.env.SERVE_ENV === 'gh-pages';

export default {
    expo: {
        name: 'a7pIndex',
        slug: 'a7pIndex',
        version: pkg.version,        // synced with package.json
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        assetBundlePatterns: ['**/*'],
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },
        plugins: [
            'expo-router',
            [
                'expo-splash-screen',
                {
                    image: './assets/images/splash-icon.png',
                    imageWidth: 200,
                    resizeMode: 'contain',
                    backgroundColor: '#ffffff',
                },
            ],
            'expo-font',
            'expo-web-browser',
        ],
        experiments: {
            typedRoutes: true,
            // ...(isGhPages && { baseUrl: '/a7pindex' }), // only include for GH-Pages
            baseUrl: '/a7pindex'
        },
    },
};
