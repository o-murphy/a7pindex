import CryptoJS from 'crypto-js';
import { Linking, Platform } from 'react-native';

import { fromByteArray } from 'base64-js';
import { decode } from "a7p-js"


// Path to your protobuf file
const PUBLIC_PATH = __DEV__ ? '/' : '/a7pIndex/'
const EDITOR_PATH = '/ArcherBC2-Web'

// Utility function to convert array buffer to base64
export function bufferToBase64(buffer: any) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

// MD5 hash function using Node.js crypto module
export function md5(data: any) {
    // Convert binary string to WordArray for CryptoJS
    const wordArray = CryptoJS.enc.Latin1.parse(data);
    // Calculate MD5 hash and return as hexadecimal string
    const hash = CryptoJS.MD5(wordArray);
    return hash.toString(CryptoJS.enc.Hex);
};

export const fetchDetails = async (path: string | undefined) => {
    if (!path) throw new Error("Invalid path")

    const fileUrl = PUBLIC_PATH + path; // Path to the file in the public directory
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buf = await response.arrayBuffer();
        const result = decode(buf)
        return result
    } catch (error) {
        console.error("Error fetching file:", error);
        throw error
    }
}


export const openInEditor = async (path: string | undefined) => {
    if (!path) return;

    const fileUrl = PUBLIC_PATH + path; // Path to the file in the public directory
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        const payload = encodeURIComponent(fromByteArray(new Uint8Array(buffer)));
        if (Platform.OS !== "web") return;

        if (payload) {
            const url = `${window.location.origin}${EDITOR_PATH}?payload=${payload}`;
            // const url = `https://portfolio.o-murphy.net${EDITOR_PATH}?payload=${payload}`;
            console.log(url)
            window.open(url, '_blank');
        }
    } catch (error) {
        console.error("Error fetching file:", error);
        throw error
    }
}

export const downloadProfile = (path?: string) => {
    if (!path) {
        console.log("Undefined path")
        return
    }

    const fileUrl = PUBLIC_PATH + path;

    if (Platform.OS === "web") {
        const anchor = document.createElement("a");
        anchor.href = fileUrl;
        const downloadUrl = fileUrl.split("/").pop()
        if (downloadUrl) {
            anchor.download = downloadUrl;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }
    } else {
        // Open the file URL in the browser for native platforms
        Linking.openURL(fileUrl);
    }
}