import { WebContainer } from "@webcontainer/api";

let webcontainerInstance: WebContainer | null = null;

// Ensure the window is loaded before initializing WebContainer
window.addEventListener("load", async () => {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
    console.log("WebContainer initialized");
  }
});
