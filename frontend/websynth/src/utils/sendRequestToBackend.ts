import { Request } from "@/types/request";

export const sendRequestToBackend = async (url: string, request: Request) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Error sending request to backend");
    }
    return await response.json();
  } catch (error) {
    console.error("Error sending request to backend:", error);
  }
};
