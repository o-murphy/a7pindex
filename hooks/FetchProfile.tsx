import protobuf from 'protobufjs';
import CryptoJS from 'crypto-js';
import { Linking, Platform } from 'react-native';

type FetchProfileArgs = {
    path?: string;
    onSuccess?: (result: any) => void;
    onError?: () => void;
}

// Path to your protobuf file
const PROTO_URL = __DEV__ ? '/proto/profedit.proto' : '/a7pIndex/proto/profedit.proto';
const MD5_LENGTH = 32;

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

export default async function parseA7P(arrayBuffer: any) {
    const base64 = bufferToBase64(arrayBuffer);
    const binaryData = atob(base64);
    const md5Checksum = binaryData.slice(0, MD5_LENGTH);
    const actualData = binaryData.slice(MD5_LENGTH);

    const calculatedChecksum = md5(actualData);

    if (!md5Checksum === calculatedChecksum) {
        console.error("Invalid A7P file checksum")
        throw new Error("Invalid A7P file checksum")
    }

    const root = await protobuf.load(PROTO_URL);
    const Payload = root.lookupType('profedit.Payload');

    try {
        const uint8ArrayData = new Uint8Array(actualData.split('').map(char => char.charCodeAt(0)));
        const payload = Payload.decode(uint8ArrayData);
        const payloadObject = Payload.toObject(payload, {
            longs: Number,
            enums: String,
            bytes: String,
            defaults: true,
            arrays: true
        });
        const profile = payloadObject.profile
        return profile
    } catch (error) {
        console.error(error)
        throw new Error(`Error decoding payload`);
    }

};

export const fetchDetails = async ({ path, onSuccess, onError }: FetchProfileArgs) => {
    console.log(path)
    const fileUrl = "/" + path; // Path to the file in the public directory
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buf = await response.arrayBuffer();
        const result = await parseA7P(buf);
        console.log(result)
        onSuccess?.(result)
    } catch (error) {
        console.error("Error fetching file:", error);
        onError?.()
    }
}

export const downloadProfile = (path?: string) => {
    if (!path) {
        console.log("Undefined path")
        return
    }

    const fileUrl = "/" + path;

    if (Platform.OS === "web") {
        const anchor = document.createElement("a");
        anchor.href = fileUrl;
        anchor.download = fileUrl.split("/").pop();
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    } else {
        // Open the file URL in the browser for native platforms
        Linking.openURL(fileUrl);
    }
}