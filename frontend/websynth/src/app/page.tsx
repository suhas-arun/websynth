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

export default function Home() {
  // Dev mode => user can select components. Otherwise, they interact directly with the page
  const [devMode, setDevMode] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  // Stores components that have already been selected
  const [components, setComponents] = useState<Component[]>([]);

  // States for file system handling
  const [fileHandle, setFileHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [fileSystemTree, setFileSystemTree] = useState<FileSystemTree | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const webcontainerInstance = useRef<WebContainer>(null);

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
      console.log("File system tree and file handle found. Comparing differences...");

      // Compare new tree with old tree
      const newTree = await recurseParseDirToFsTree(fileHandle);
      const diffs = compareFsTrees(fileSystemTree, newTree);
      console.log("Differences:", diffs);

      if (diffs.size === 0) {
        console.log("No differences, aborting..");
        return;
      }

      console.log("Updating FileSystem...");
      await targetRewriteInContainer(webcontainerInstance.current!, ROOT_DIR, diffs);
      setFileSystemTree(newTree);
      console.log("FileSystem updated");

      // Check if package.json has changed
      const containsPackageInstall = hasPackageJsonChanges(diffs);

      if (containsPackageInstall) {
        console.log("Package.json has changed. Must re-compile.");
        compile = true;
      }
    } else {
      console.log("No file system tree found. Please select a directory.");

      // Select root directory
      const rootDir = await selectRootDir();
      setFileHandle(rootDir);
      const fsTree = await recurseParseDirToFsTree(rootDir);
      setFileSystemTree(fsTree);

      console.log("Mounting directory...");
      await mountDirAt(fsTree, ROOT_DIR, webcontainerInstance.current!);
      compile = true;
    }

    // Recompile if necessary
    if (compile) {
      console.log("Compiling...")
      await installAndCompile();
    }
  };

  const installAndCompile = async () => {
    const installed = await runNpmInstallAt(webcontainerInstance.current!, ROOT_DIR);
    console.log("Installed:", installed);
    const compiled = await runNpmAt(webcontainerInstance.current!, ROOT_DIR);
    console.log("Compiled:", compiled);

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
        />
        <WebsitePreview devMode={devMode} iframeRef={iframeRef} />
      </div>
      <InputPrompt homepageRef={pageRef} handleSubmit={handleSubmit} />
    </div>
  );
}
