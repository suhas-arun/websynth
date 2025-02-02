"use client";

import { useState, useEffect, useRef } from "react";
import { WebContainer} from "@webcontainer/api";
import type { FileSystemTree } from "@webcontainer/api";
import { selectRootDir, recurseParseDirToFsTree } from "@/utils/filesystem";
import test from "node:test";

export default function FileAccess() {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const webcontainerInstance = useRef<WebContainer | null>(null); // Store WebContainer instance

  useEffect(() => {
    const initWebContainer = async () => {
      if (!webcontainerInstance.current) {
        const instance = await WebContainer.boot();
        webcontainerInstance.current = instance;
      }
    };

    initWebContainer();
  }, []); // Run only once when component mounts

  const isTextFile = (fileName: string): boolean => {
    const textExtensions = [".js", ".ts", ".json", ".html", ".css", ".md", ".txt", ".env", ".tsx", ".mjs", ".cjs", ".svg", ".png", ".jpg", ".jpeg"];
    return textExtensions.some((ext) => fileName.endsWith(ext));
  };

  // const testFunction = async () => {
  //   try {
  //     const rootDir = await selectRootDir();
  //     console.log("Root directory:", rootDir);
  //     const fsTree = await recurseParseDirToFsTree(rootDir);
  //     console.log("File System Tree:", fsTree);

  //     if (webcontainerInstance.current) {
  //       await mountDirAt(fsTree, APP_MOUNT, webcontainerInstance.current);
  //       await mountDirAt(fsTree, FALLBACK_MOUNT, webcontainerInstance.current);

  //       const appPid = await runNpmAt(webcontainerInstance.current, APP_MOUNT);
  //       console.log("App PID:", appPid);
  //       const fallbackPid = await runNpmAt(webcontainerInstance.current, FALLBACK_MOUNT);
  //       console.log("Fallback PID:", fallbackPid);

  //       const killedApp = await killNpmWithPid(webcontainerInstance.current, appPid);
  //       const killledFallback = await killNpmWithPid(webcontainerInstance.current, fallbackPid);

  //       console.log("Killed App:", killedApp);
  //       console.log("Killed Fallback:", killledFallback);
  //     }
  //   } catch (error) {
  //     console.error("Error loading folder:", error);
  //   }
  // }

  const readDirectory = async (dirHandle: FileSystemDirectoryHandle): Promise<any> => {
    const result: Record<string, any> = {}; // Root object
  
    for await (const entry of (dirHandle as any).values()) {
      if (entry.kind === "file") {
        // Skip binary files
        if (!isTextFile(entry.name)) {
          console.warn(`🚫 Skipping binary file: ${name}`);
          continue;
        }

        // Handle file
        const fileHandle = entry as FileSystemFileHandle;
        const file = await fileHandle.getFile();
        const contents = await file.text();
  
        result[entry.name] = {
          file: { contents },
        };
      } else if (entry.kind === "directory") {
        // Handle directory recursively
        result[entry.name] = {
          directory: await readDirectory(entry as FileSystemDirectoryHandle),
        };
      } else {
        console.log("Unknown entry:", entry);
      }
    }
  
    return result;
  };
  
  // **Main function to open folder and parse into WebContainer format**
  const loadFolder = async () => {
    try {
      // Open the folder picker
      const dirHandle = await (window as any).showDirectoryPicker();
      console.log("📂 Selected folder:", dirHandle.name);
  
      // Parse the folder recursively
      const files = await readDirectory(dirHandle);
  
      console.log("✅ Parsed FileSystemTree:", files);

      // Mount the folder in WebContainer
      if (webcontainerInstance.current) {
        // try{
          // const currentDir = await webcontainerInstance.current.fs.readdir("/");
          // console.log("Current directory:", currentDir);
          // await webcontainerInstance.current.fs.rm("/", { recursive: true });
        // } catch (error) {
        //   console.error("Error removing folder:", error);
        // }

        try {
          await webcontainerInstance.current.fs.rm('app', { recursive: true });
          console.log("Removed app folder");
        } catch (error) {
          console.error("Error removing folder:", error);
        }
        
        await webcontainerInstance.current.fs.mkdir('app');
        await webcontainerInstance.current.mount(files, { mountPoint: 'app' });
      }

      console.log("✅ Mounted Project");
    } catch (error) {
      console.error("❌ Error loading folder:", error);
    }
  };

  // Function to run a next.js project in WebContainer
  const runInWebContainer = async () => {
    console.log("Attempting to install and run...")
    if (webcontainerInstance.current) {
      await webcontainerInstance.current.spawn('cd', ['app']);
      console.log("Webcontainer exists and is found...")
      const installProcess = await webcontainerInstance.current.spawn('npm', ['--prefix', 'app/', 'install']);
      console.log("Install process started...")

      installProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log(data);
        }
      }));

      const installExitCode = await installProcess.exit;

      console.log("Install process exited with code:", installExitCode);

      if (installExitCode !== 0) {
        throw new Error('Unable to run npm install');
      }

      console.log("Starting dev server...")
      // `npm run dev`
      const startProcess = await webcontainerInstance.current.spawn("sh", ["-c", "TURBO_DISABLED=1 npm -prefix app/ run dev"]);
      // const startProcess = await webcontainerInstance.current.spawn('npm', ['run', 'dev']);

      startProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log(data);
        }
      }));

      console.log("Dev server started...")

      if (iframeRef.current) {
        console.log("iframe exists")
        webcontainerInstance.current.on('server-ready', (port, url) => {
          console.log("Server ready at:", url);
          if (iframeRef.current) {
            console.log("Server ready at:", url);
            iframeRef.current.src = url;
          }
        });
      } else {
        console.error("iframe does not exist")
      }

      console.log("Process start complete")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">File System Access + WebContainers</h1>
      <button
        onClick={loadFolder}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Load Node.js Project
      </button>

      <button
        onClick={runInWebContainer}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Run in WebContainer
      </button>

      <button
        onClick={runInWebContainer}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Refresh
      </button>

      {fileHandle && (
        <div className="mt-4">
          <p className="font-semibold">Selected File:</p>
          <p className="text-gray-600">{fileHandle.name}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Preview:</h2>
        <iframe ref={iframeRef} className="w-full h-96 border rounded-md"></iframe>
      </div>
    </div>
  );
}

