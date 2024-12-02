import fs from 'fs';
import path from 'path';

/**
 * Recursively builds a tree of files and directories, filtering them by criteria.
 * 
 * @param {string} dir - The directory to traverse.
 * @param {function} criteria - A callback function to filter files. Receives the file's full path.
 * @returns {object[]} A tree of files and directories matching the criteria.
 */
function getFilteredTree(dir, criteria) {
    const result = [];

    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            // Recursively process the directory
            const children = getFilteredTree(fullPath, criteria);
            if (children.length > 0 || criteria(fullPath)) {
                result.push({
                    type: 'directory',
                    name: item.name,
                    path: fullPath,
                    children,
                });
            }
        } else if (item.isFile() && criteria(fullPath)) {
            // Add the file if it matches the criteria
            result.push({
                type: 'file',
                name: item.name,
                path: fullPath,
            });
        }
    }

    return result;
}

function extractFilePaths(tree) {
    const filePaths = [];

    for (const node of tree) {
        if (node.type === 'file') {
            filePaths.push(node.path); // Add file path to the array
        } else if (node.type === 'directory' && node.children) {
            // Recursively process directory children
            filePaths.push(...extractFilePaths(node.children));
        }
    }

    return filePaths;
}


/**
 * Opens a file by index from a flat array of file paths and reads its content.
 * 
 * @param {string[]} filePaths - Flat array of file paths.
 * @param {number} index - Index of the file to open.
 * @returns {string} The content of the file.
 */
function openFileByIndex(filePaths, index) {
    if (index < 0 || index >= filePaths.length) {
        throw new Error(`Index out of range. Valid range: 0 to ${filePaths.length - 1}`);
    }

    const filePath = filePaths[index];
    const content = fs.readFileSync(filePath, 'utf8'); // Read the file content
    return content;
}

// Example Usage
const outputDir = './extracted-repo'; // Adjust to the extracted repo directory

// Filter criteria: Include only JavaScript and Markdown files
// const criteria = (filePath) => ['.js', '.mjs', '.md'].includes(path.extname(filePath));
const criteria = (filePath) => ['.a7p'].includes(path.extname(filePath));

// Get the filtered tree
const filteredTree = getFilteredTree(outputDir, criteria);

// Log the tree
// console.log(JSON.stringify(filteredTree, null, 2));

const flatFilePaths = extractFilePaths(filteredTree);


// Access a file by index
const index = 0; // Replace with the desired index
try {
    const fileContent = openFileByIndex(flatFilePaths, index);
    console.log(`Content of file at index ${index}:`);
    console.log(fileContent);
} catch (error) {
    console.error(error.message);
}

