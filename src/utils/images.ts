interface Base64Image {
  data: string; // Base64 encoded string
  mimeType: string; // MIME type of the image
}

export async function imageURLToBase64(url: URL): Promise<Base64Image> {
  try {
    const response = await fetch(url.toString());
    const blob = await response.blob();
    const mimeType = blob.type;
    console.log("MIME type:", mimeType);

    const reader = new FileReader();
    return await new Promise<Base64Image>((resolve, reject) => {
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1]; // Remove the URI header
        resolve({
          data: base64String,
          mimeType: mimeType,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching or converting image:", error);
    throw error;
  }
}