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
		// Delete existing mount if it exists and mount new files
		await deleteMount(mountPoint, webContainer);
		await webContainer.fs.mkdir(mountPoint);
		await webContainer.mount(fsTree, { mountPoint: mountPoint });

		return true;
  } catch (error) {
    console.error("Error mounting directory:", error);
    return false;
  }
}

const runNpmAt = async (webContainer: WebContainer, mountPoint: string): Promise<boolean> => {
  try {
    // const npmProcess = await webContainer.spawn('sh', ['-c', 'cd', mountPoint, '&& npm run dev && cd ..']);
		const npmProcess = await webContainer.spawn('sh', ['-c', `npm --prefix ${mountPoint} run dev`]);

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

    const installProcess = await webContainer.spawn('sh', ['-c', `npm --prefix ${mountPoint} install`]);
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

const targetRewriteInContainer = async (webContainer: WebContainer, mountPoint: string,
	treeDiffs: Map<string, string>
): Promise<boolean> => {
  try {
    for (const [filePath, content] of treeDiffs.entries()) {
      const fullPath = `${mountPoint}/${filePath}`; // Ensure correct path

      if (content === "DELETE DIR") {
        console.log(`Deleting directory: ${fullPath}`);
				await webContainer.fs.rm(fullPath, { recursive: true });
			} else if (content === "DELETE FILE") {
				console.log(`Deleting file: ${fullPath}`);
				await webContainer.fs.rm(fullPath);
      } else {
				// Ensure the parent directory exists before writing the file
				const parentDir = fullPath.substring(0, fullPath.lastIndexOf("/"));

				if (parentDir && parentDir !== mountPoint) {
					try {
						await webContainer.fs.mkdir(parentDir, { recursive: true });
						console.log(`Created parent directory: ${parentDir}`);
					} catch (mkdirError) {
						console.log(`Parent directory may already exist: ${parentDir}`);
					}
				}

				// Write new or updated file content
				console.log(`Updating file: ${fullPath}`);
				await webContainer.fs.writeFile(fullPath, content);
      }
    }

    return true; // Successfully updated the filesystem
  } catch (error) {
    console.error("Error updating WebContainer filesystem:", error);
    return false;
  }
};

export { mountDirAt, runNpmAt, runNpmInstallAt, targetRewriteInContainer};