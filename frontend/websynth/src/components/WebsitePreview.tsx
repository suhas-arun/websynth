"use client";

import { useRef, useEffect, useState} from "react";
import { FileSystemTree, WebContainer} from "@webcontainer/api";
import { Button } from "@/components/ui/button";
import { compareFsTrees, hasPackageJsonChanges, recurseParseDirToFsTree, selectRootDir } from "@/utils/filesystem";
import { mountDirAt, runNpmAt, runNpmInstallAt, targetRewriteInContainer } from "@/utils/webcontainer";
import { ROOT_DIR } from "@/app/constants/globals";

interface WebsitePreviewProps {
  devMode: boolean;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ devMode }) => {
  const [fileHandle, setFileHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [fileSystemTree, setFileSystemTree] = useState<FileSystemTree | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('/');

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const webcontainerInstance = useRef<WebContainer>(null);

  // Minimal Event Listener to track the URL inside WebContainer
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "page-change") {
        setCurrentUrl(event.data.url);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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

  return (
    <div className={`absolute h-full w-full top-0 left-0 z-0 pointer-events-${devMode ? "none" : "auto"}`}>
      <Button
        onClick={loadFsAndRefresh}
        className="absolute top-4 right-4 pointer-events-auto"
      >Upload folder</Button>
      <Button
        onClick={installAndCompile}
        className="absolute top-16 right-4 pointer-events-auto"
      >Compile</Button>
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        title="Website Preview"
      />
    </div>
  );
};

export default WebsitePreview;
