"use client";
import { useEffect, useRef, useState } from "react";
import InputPrompt from "@/components/InputPrompt";
import Canvas from "@/components/Canvas";
import WebsitePreview from "@/components/WebsitePreview";
import { Component } from "@/types/component";
import { Request } from "@/types/request";
import { sendRequestToBackend } from "@/utils/sendRequestToBackend";
import { BACKEND_ENDPOINT, ROOT_DIR } from "./constants/globals";
import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { compareFsTrees, hasPackageJsonChanges, recurseParseDirToFsTree, selectRootDir } from "@/utils/filesystem";
import { mountDirAt, runNpmAt, runNpmInstallAt, targetRewriteInContainer } from "@/utils/webcontainer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollText } from "lucide-react";
import Convert from "ansi-to-html";

export default function Home() {
  // Dev mode => user can select components. Otherwise, they interact directly with the page
  const [devMode, setDevMode] = useState(true);
  const [currentUrl, setCurrentUrl] = useState<string>("/");
  const pageRef = useRef<HTMLDivElement>(null);

  // Stores components that have already been selected
  const [components, setComponents] = useState<Component[]>([]);

  // States for file system handling
  const [fileHandle, setFileHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [fileSystemTree, setFileSystemTree] = useState<FileSystemTree | null>(null);
  const [rootPath, setRootPath] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const webcontainerInstance = useRef<WebContainer>(null);

  // Logging
  const [logs, setLogs] = useState<string[]>([]);
  const convert = new Convert();
  const addLog = (message: string) => {
    const parsedMessage = convert.toHtml(message);
    setLogs((prevLogs) => [...prevLogs, parsedMessage]);
  };

  // Initialise WebContainer instance
  useEffect(() => {
    const initWebContainer = async () => {
      if (!webcontainerInstance.current) {
        const instance = await WebContainer.boot();
        webcontainerInstance.current = instance;
      }
    };

    initWebContainer();
  }, []); // Run only once when component mounts

  // Handles the cases for: initial loading, reloading changed files, 
  // and handling package.json changes
  // Will attempt to hot-reload but may re-compile if necessary
  const loadFsAndRefresh = async () => {
    var compile = false;

    if (fileSystemTree && fileHandle) {
      addLog("File system tree and file handle found. Comparing differences...");

      // Compare new tree with old tree
      const newTree = await recurseParseDirToFsTree(fileHandle);
      const diffs = compareFsTrees(fileSystemTree, newTree);
      addLog("Differences:" + diffs);

      if (diffs.size === 0) {
        addLog("No differences, aborting..");
        return;
      }

      addLog("Updating FileSystem...");
      await targetRewriteInContainer(webcontainerInstance.current!, ROOT_DIR, diffs);
      setFileSystemTree(newTree);
      addLog("FileSystem updated");

      // Check if package.json has changed
      const containsPackageInstall = hasPackageJsonChanges(diffs);

      if (containsPackageInstall) {
        addLog("Package.json has changed. Must re-compile.");
        compile = true;
      }
    } else {
      addLog("No file system tree found. Please select a directory.");

      try {
        // Select root directory
        const rootDir = await selectRootDir();
        setFileHandle(rootDir);
        let rootPath = window.prompt("Please enter the root directory path:");
        if (!rootPath) {
          addLog("No path entered. Aborting...");
          return;
        }
        setRootPath(rootPath);
        addLog("Selected root directory: " + rootPath);

        const fsTree = await recurseParseDirToFsTree(rootDir);
        setFileSystemTree(fsTree);

        addLog("Mounting directory...");
        await mountDirAt(fsTree, ROOT_DIR, webcontainerInstance.current!);
        compile = true;
      } catch (error) {
        addLog("Error selecting root directory: " + error);
        return;
      }
    }

    // Recompile if necessary
    if (compile) {
      addLog("Compiling...")
      await installAndCompile();
    }
  };

  const installAndCompile = async () => {
    addLog("Installing dependencies...");
    const installed = await runNpmInstallAt(webcontainerInstance.current!, ROOT_DIR);
    addLog("Dependencies installed");
    addLog("Starting compilation...");
    const compiled = await runNpmAt(webcontainerInstance.current!, ROOT_DIR, addLog);
    addLog("Finished compilation.");

    webcontainerInstance.current!.on('server-ready', (port, url) => {
      iframeRef.current!.src = url;
    })
  };


  // Send request to backend
  const handleSubmit = (prompt: string, screenshot: string) => {
    const request: Request = {
      prompt,
      screenshot,
      components,
      root: "~/dev/websynth/demos/test-app",
    };
    console.log(request)
    const response = sendRequestToBackend(BACKEND_ENDPOINT, request);
    console.log(response);
  };

  return (
    <div
      className="justify-center items-center flex flex-col h-screen"
      ref={pageRef}
    >
      <div className="w-full h-full">
        <Canvas
          devMode={devMode}
          setDevMode={setDevMode}
          components={components}
          setComponents={setComponents}
          loadFsAndRefresh={loadFsAndRefresh}
          installAndCompile={installAndCompile}
          currentUrl={currentUrl}
        />
        <WebsitePreview devMode={devMode} iframeRef={iframeRef} setCurrentUrl={setCurrentUrl} />
      </div>
      <InputPrompt homepageRef={pageRef} handleSubmit={handleSubmit} />

      <div className="absolute bottom-5 right-5">
        {/* Floating log icon */}
        <Popover>
          <PopoverTrigger>
            <div
              className={`p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700
                ${logs.length > 0 ? "animate-pulse bg-red-500" : ""}`}
            >
              <ScrollText size={24} />
            </div>
          </PopoverTrigger>

          {/* Log Popup Dialogue */}
          <PopoverContent className="relative right-5 bottom-0 border-none p-0 max-w-150 bg-gray-800">
            <div className="p-4 rounded-lg">
              <h3 className="text-md text-white font-semibold pb-2">Logs</h3>
              <div className="overflow-y-auto max-h-80 bg-black p-2 rounded-md">
                {logs.map((log, index) => (
                  <div key={index} className="text-sm text-white mb-2 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: log }}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
