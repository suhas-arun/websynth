"use client";

import type { FileSystemTree } from "@webcontainer/api";
// import JSZip from "jszip";

const validExtensions = [".js", ".ts", ".json", ".html", ".css", ".md", ".txt", ".env", ".tsx", 
    ".mjs", ".cjs", ".svg", ".png", ".jpg", ".jpeg"];

const isTextFile = (fileName: string): boolean => {
    return validExtensions.some((ext) => fileName.endsWith(ext));
}

const selectRootDir = async (): Promise<FileSystemDirectoryHandle> => {
    const dirHandle = await (window as any).showDirectoryPicker();
    return dirHandle;
}

// parseDirToFSTree -- parse directory into tree structure
const recurseParseDirToFsTree = async (dirHandle: FileSystemDirectoryHandle): Promise<FileSystemTree> => {
    const result: FileSystemTree = {}; // Root object

    for await (const entry of (dirHandle as any).values()) {
        if (entry.kind === "file") {

            // Skip binary files
            if (!isTextFile(entry.name)) {
                console.warn(`Skipping file: ${entry.name}`);
                continue;
            }

            // Handle file
            const fileHandle = entry as FileSystemFileHandle;
            const file = await fileHandle.getFile();
            const contents = await file.text();
            
            // Leaf node - add to tree
            result[entry.name] = {
                file: { contents },
            };
        } else if (entry.kind === "directory") {
            // Handle directory recursively
            result[entry.name] = {
                directory: await recurseParseDirToFsTree(entry as FileSystemDirectoryHandle),
            };
        } else {
            console.log("Unknown entry:", entry);
        }
    }

    return result;
}

export {selectRootDir, recurseParseDirToFsTree}; 
