import html2canvas from "html2canvas";

export const captureScreenshot = async (element: HTMLElement): Promise<string> => {
  const canvas = await html2canvas(element);
  const image = canvas.toDataURL("image/png");
  return image;
};
