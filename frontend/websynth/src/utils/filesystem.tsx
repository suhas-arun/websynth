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

const compareFsTrees = (oldFs: FileSystemTree, newFs: FileSystemTree): Map<string, string> => {
  const changes = new Map<string, string>();

  const traverse = (oldTree: FileSystemTree, newTree: FileSystemTree, path: string = "") => {
    // Check for modified or new files
    for (const key in newTree) {
      const newPath = path ? `${path}/${key}` : key;
      const newEntry = newTree[key];
      const oldEntry = oldTree[key];

      if ((newEntry as any).file) {
        // If file exists in both trees, check for content changes
        if (!oldEntry || !(oldEntry as any).file || (oldEntry as any).file.contents !== (newEntry as any).file.contents) {
          changes.set(newPath, (newEntry as any).file.contents);
        }
      } else if ((newEntry as any).directory) {
        // If it's a directory, recursively compare
        traverse((oldEntry as any)?.directory || {}, (newEntry as any).directory, newPath);
      }
    }

    // Check for deleted files/directories
    for (const key in oldTree) {
      if (!newTree[key]) {
        const oldPath = path ? `${path}/${key}` : key;
        const oldEntry = oldTree[key];

        if ((oldEntry as any).file) {
          changes.set(oldPath, "DELETE FILE");
        } else if ((oldEntry as any).directory) {
          changes.set(oldPath, "DELETE DIR");
        }
      }
    }
  };

  traverse(oldFs, newFs);
  return changes;
};


export const hasPackageJsonChanges = (diffs: Map<string, string>): boolean => {
	for (const filePath of diffs.keys()) {
			if (filePath.match(/^package.*\.json$/)) {
			return true; // Found a package-related change
			}
	}
	return false;
};

export { selectRootDir, recurseParseDirToFsTree, compareFsTrees }; 
