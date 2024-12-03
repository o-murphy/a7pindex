import protobuf from 'protobufjs';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';


// Path to your protobuf file
const PROTO_URL = path.resolve('./proto/profedit.proto'); // Adjust this path

// MD5 hash function using Node.js crypto module
function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex').toLowerCase(); // Convert to lowercase hex
}

// Function to load and validate data from the A7P file
async function loadA7P(string, validate = true) {
    // Ensure string is a Buffer
    if (!Buffer.isBuffer(string)) {
        string = Buffer.from(string, 'binary');
    }

    // Extract the actual data after the first 32 bytes (MD5 checksum)
    const data = string.slice(32);

    // Extract the MD5 checksum (first 32 bytes) and compare
    const md5Checksum = string.slice(0, 32).toString('utf8').toLowerCase(); // MD5 checksum as a hex string
    const calculatedChecksum = md5(data);

    // Check if the MD5 checksum matches
    if (md5Checksum === calculatedChecksum) {
        // Load protobuf schema
        const root = await protobuf.load(PROTO_URL);
        const Payload = root.lookupType('profedit.Payload');

        // Decode the payload from the data
        const profile = Payload.decode(data);
        const profileObject = Payload.toObject(profile, {
            longs: Number,
            enums: String,
            bytes: String,
            defaults: true,
            arrays: true
        });

        // Optional validation of profile
        if (validate) {
            // Perform your validation logic here, e.g.:
            // validator.validate(profileObject);  // Assuming you have a validator
        }

        // Return the profile object
        return profileObject;
    } else {
        throw new Error('Input data is missing for MD5 hashing or checksum mismatch');
    }
}

// Function to parse A7P file by path
async function parseA7P(filePath, validate = true) {
    // console.log(filePath)
    try {
        // Read the file from the given path
        const fileBuffer = fs.readFileSync(filePath);

        // Pass the file data (Buffer) to the loadA7P function for processing
        const profile = await loadA7P(fileBuffer, validate);

        // Return the decoded profile
        return profile;
    } catch (error) {
        // console.error('Error parsing A7P file:', error);
        throw new Error(`Error parsing A7P file: ${error.message}`);
    }
}


const asPosix = (filePath) => {
    return path.posix.join(...filePath.split(path.sep));
}

/**
 * Recursively builds a tree of files and directories, filtering them by criteria.
 * 
 * @param {string} dir - The directory to traverse.
 * @param {function} criteria - A callback function to filter files. Receives the file's full path.
 * @returns {object[]} A tree of files and directories matching the criteria.
 */
const getFilteredTree = (dir, criteria) => {
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

const extractFilePaths = (tree) => {
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

// Example Usage
const outputDir = './extracted-repo'; // Adjust to the extracted repo directory
const indexPath = 'assets/profiles.json';
const assetsDir = path.dirname(indexPath);


const vendors = {
    "HORNADY": "HORNADY",
    "HOR": "HORNADY",
    "SMK": "SIERRA BULLETS",
    "SIERRA": "SIERRA BULLETS",
    "SIERRA BULLETS": "SIERRA BULLETS",
    "REMINGTON": "REMINGTON",
    "REM": "REMINGTON",
}


const resolveVendor = (data) => {
    // return vendors[data] ?? data
    return vendors[data] ?? null;
}


const createIndex = async () => {
    const profileIndex = [];

    // Filter criteria: Include only JavaScript and Markdown files
    const criteria = (filePath) => ['.a7p'].includes(path.extname(filePath));

    // Get the filtered tree
    const filteredTree = getFilteredTree(path.join(outputDir, "a7p-master", "gallery"), criteria);

    const flatFilePaths = extractFilePaths(filteredTree);
    const validFilePaths = flatFilePaths.filter(filePath => !asPosix(filePath).startsWith("extracted-repo/a7p-master/gallery/.unvalidated"))

    // Use Promise.all to wait for all asynchronous parseA7P operations to finish
    const parsePromises = validFilePaths.map(filePath =>
        parseA7P(filePath, true)
            .then(result => {
                // console.log(result.profile);
                const normalizedPath = path.normalize(filePath);
                const relativePath = path.relative('extracted-repo\\a7p-master\\gallery', normalizedPath);
                const finalPath = '/' + relativePath.replace(/\\/g, '/');

                if (result && result.profile) {
                    const profile = result?.profile;
                    profileIndex.push({
                        diameter: Math.round(profile.bDiameter / 1000, 3),
                        weight: Math.round(profile.bWeight / 10, 1),
                        caliber: profile.caliber,
                        path: finalPath,
                        profileName: profile.profileName,
                        name: `${profile.caliber} ${profile.cartridgeName} ${profile.bulletName}`,
                        cartridge: profile.cartridgeName,
                        bullet: profile.bulletName,
                        cartridgeVendor: resolveVendor(profile.cartridgeName.split(" ")[0]),
                        bulletVendor: resolveVendor(profile.bulletName.split(" ")[0]),
                        dragModelType: profile.bcType
                    });
                } else {
                    throw new Error(`Error on file: ${filePath}`)
                }

            })
            .catch(error => console.error(`Error on file: ${filePath}`))
    );

    // Wait for all parsing operations to finish
    Promise.all(parsePromises)
        .then(() => {
            // After all promises are resolved, save the file
            const jsonString = JSON.stringify(profileIndex, null, 2);
            fs.mkdirSync(assetsDir, { recursive: true });
            fs.writeFileSync(indexPath, jsonString, 'utf8');
            console.log('File saved successfully!');

            console.log("Profiles updated:", validFilePaths.length)
        })
        .catch(error => {
            console.error('Error during parsing:', error.message);
        });
}

createIndex();