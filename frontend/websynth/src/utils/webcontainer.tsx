"use client";

import type { FileSystemTree } from "@webcontainer/api";
import { WebContainer } from "@webcontainer/api";

// Deletes directory - returns true if a directory existed and was deleted, false otherwise
const deleteMount = async (mountPoint: string, webContainer: WebContainer): Promise<boolean> => {
  // Check if mountPoint exists - readdir will throw if it doesn't
  try {
    await webContainer.fs.readdir(mountPoint);
    await webContainer.fs.rm(mountPoint, { recursive: true });
    console.log("Existing mount point found and deleted.");
    return true;
  } catch (error) {
    console.log("Mount point does not already exist so will not delete.");
    return false;
  }
}

// mountDir -- Mount a directory into WebContainer at MOUNT
const mountDirAt = async (fsTree: FileSystemTree, mountPoint: string, webContainer: WebContainer): Promise<boolean> => {
  try {
    if (webContainer) {

      // Delete existing mount if it exists and mount new files
      await deleteMount(mountPoint, webContainer);
      await webContainer.fs.mkdir(mountPoint);
      await webContainer.mount(fsTree, { mountPoint: mountPoint });

      return true;
    } else {
      throw new Error("WebContainer instance not found.");
    }
  } catch (error) {
    console.error("Error mounting directory:", error);
    return false;
  }
}

const killNpm = async (webContainer: WebContainer): Promise<boolean> => {
  try {
    const killProcess = await webContainer.spawn('pkill', ['-f', 'npm']);
    killProcess.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));

    console.log("Killed npm process");
    return true;
  } catch (error) {
    console.log("Failed to kill npm process:", error);
    return false;
  }
}

const runNpmAt = async (webContainer: WebContainer, mountPoint: string): Promise<boolean> => {
  try {
    const npmProcess = await webContainer.spawn('sh', ['-c', 'cd', mountPoint, '&& npm run dev && cd ..']);
    npmProcess.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));

    console.log("Started npm process");
    return true;
  } catch (error) {
    console.log("Failed to start npm process:", error);
    return false;
  }
}

const runNpmInstallAt = async (webContainer: WebContainer, mountPoint: string): Promise<boolean> => {
  try {
    try {
      await webContainer.fs.readdir(mountPoint);
      console.log("Mount point exists.");
    } catch (error) {
      console.log("Mount point does not exist: ", error);
    }

    const installProcess = await webContainer.spawn('sh', ['-c', 'cd', mountPoint, '&& npm install && cd ..']);
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
    return true;
  } catch (error) {
    console.log("Failed to start npm install process:", error);
    return false;
  }
}


/* IDEA: Have app/ and app-fallback/ in the container and have both running at any one time.
When the user dir is updated:
    swap url to app-fallback/
    kill npm in app/
    delete app/
    mount new files to app/
    startup npm in app/
    swap url to app/
    Ask user for confirmation to update

    If user confirms:
        update app-fallback/ as well

    If user denies:
        Post request to backend to revert root files
        Move to /app-fallback


*/

export { mountDirAt, killNpm, runNpmAt, runNpmInstallAt };