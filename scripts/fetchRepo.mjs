import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

/**
 * Fetches a zipped GitHub repository and extracts it to the specified directory.
 * 
 * @param {string} repo - The repository in `owner/repo` format.
 * @param {string} branch - The branch or tag to fetch (default: `main`).
 * @param {string} outputDir - The directory where the repo will be extracted.
 */
async function fetchAndExtract(repo, branch = 'main', outputDir) {
    try {
        const zipUrl = `https://github.com/${repo}/archive/refs/heads/${branch}.zip`;
        const response = await fetch(zipUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch the repository: ${response.statusText}`);
        }

        console.log(`Downloading ${zipUrl}...`);
        const buffer = await response.arrayBuffer();

        console.log('Extracting the repository...');
        const zip = new AdmZip(Buffer.from(buffer));
        zip.extractAllTo(outputDir, true);

        console.log(`Repository extracted to: ${path.resolve(outputDir)}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Example usage
const repo = 'o-murphy/a7p'; // Replace with actual owner/repo
const branch = 'master'; // Replace with the desired branch or tag
const outputDir = './extracted-repo'; // Replace with the desired output directory

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fetchAndExtract(repo, branch, outputDir);
