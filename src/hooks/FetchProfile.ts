import CryptoJS from "crypto-js";
import { fromByteArray } from "base64-js";
import { decode } from "a7p-js";

const PUBLIC_PATH = import.meta.env.BASE_URL;
const EDITOR_URL = "https://o-murphy.github.io/archerbc2-web";
const LIB_URL = "https://o-murphy.net/a7p-lib/";

export function bufferToBase64(buffer: ArrayBuffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export function md5(data: string) {
    const wordArray = CryptoJS.enc.Latin1.parse(data);
    const hash = CryptoJS.MD5(wordArray);
    return hash.toString(CryptoJS.enc.Hex);
}

export const fetchDetails = async (path: string | undefined) => {
    if (!path) throw new Error("Invalid path");

    const fileUrl = LIB_URL + path;
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buf = await response.arrayBuffer();
        const result = decode(buf);
        return result;
    } catch (error) {
        console.error("Error fetching file:", error);
        throw error;
    }
};

export const openInEditor = async (path: string | undefined) => {
    if (!path) return;

    const fileUrl = `${window.location.origin}${PUBLIC_PATH}${path}`;
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        const payload = encodeURIComponent(
            fromByteArray(new Uint8Array(buffer)),
        );

        if (payload) {
            const url = `${EDITOR_URL}?payload=${payload}`;
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error("Error fetching file:", error);
        throw error;
    }
};

export const downloadProfile = (path?: string) => {
    if (!path) {
        console.log("Undefined path");
        return;
    }

    const fileUrl = LIB_URL + path;

    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    const downloadName = fileUrl.split("/").pop();
    if (downloadName) {
        anchor.download = downloadName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }
};
