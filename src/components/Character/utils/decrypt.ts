async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const decryptFile = async (
  url: string,
  password: string,
  onProgress?: (progress: number) => void,
  signal?: AbortSignal
): Promise<ArrayBuffer> => {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Unable to download encrypted model (${response.status})`);
  }

  const contentLength = Number(response.headers.get("content-length"));
  let encryptedData: Uint8Array;

  if (response.body && contentLength > 0) {
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      chunks.push(value);
      received += value.byteLength;
      onProgress?.(received / contentLength);
    }

    encryptedData = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      encryptedData.set(chunk, offset);
      offset += chunk.byteLength;
    }
  } else {
    encryptedData = new Uint8Array(await response.arrayBuffer());
    onProgress?.(1);
  }

  if (encryptedData.byteLength <= 16) {
    throw new Error("The encrypted model file is empty or incomplete.");
  }

  const iv = encryptedData.subarray(0, 16);
  const data = encryptedData.subarray(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
};
