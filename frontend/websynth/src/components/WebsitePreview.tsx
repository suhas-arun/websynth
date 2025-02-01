"use client";

import { useRef, useEffect, useState} from "react";
import { FileSystemTree, WebContainer} from "@webcontainer/api";
import { Button } from "@/components/ui/button";
import { recurseParseDirToFsTree, selectRootDir } from "@/utils/filesystem";
import { mountDirAt, runNpmAt, runNpmInstallAt } from "@/utils/webcontainer";
import { ROOT_DIR } from "@/app/constants/globals";

const WebsitePreview = () => {
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

  const loadPreview = async () => {
    const rootDir = await selectRootDir();
    setFileHandle(rootDir);
    const fsTree = await recurseParseDirToFsTree(rootDir);
    setFileSystemTree(fsTree);

    if (webcontainerInstance.current) {
      mountDirAt(fsTree, ROOT_DIR, webcontainerInstance.current);
      // iframeRef.current!.src = ROOT_DIR;

    }
  };

  const compile = async () => {
    if (webcontainerInstance.current) {
      const installed = await runNpmInstallAt(webcontainerInstance.current, ROOT_DIR);
      console.log("Installed:", installed);
      const compiled = await runNpmAt(webcontainerInstance.current, ROOT_DIR);
      console.log("Compiled:", compiled);

      webcontainerInstance.current.on('server-ready', (port, url) => {
        console.log(`Server ready at: ${url}`);
        iframeRef.current!.src = url;
      })
    }
  };

  return (
    <div className="absolute h-full w-full top-0 left-0 z-0 pointer-events-none">
      <Button
        onClick={loadPreview}
        className="absolute top-4 right-4 pointer-events-auto"
      >Upload folder</Button>
      <Button
        onClick={compile}
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