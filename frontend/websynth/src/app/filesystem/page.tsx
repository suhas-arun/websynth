"use client";

import { useState } from "react";

export default function FileAccess() {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  // Function to open a file
  const openFile = async () => {
    try {
      // Open file picker
      const [handle] = await window.showOpenFilePicker();
      setFileHandle(handle);

      // Read the file content
      const file = await handle.getFile();
      const text = await file.text();
      setFileContent(text);
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">File System Access API</h1>
      <button
        onClick={openFile}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Open File
      </button>

      {fileHandle && (
        <div className="mt-4">
          <p className="font-semibold">Selected File:</p>
          <p className="text-gray-600">{fileHandle.name}</p>
        </div>
      )}

      {fileContent && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-semibold">File Content:</h2>
          <pre className="whitespace-pre-wrap text-sm">{fileContent}</pre>
        </div>
      )}
    </div>
  );
}
