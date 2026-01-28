export async function uploadViaPresignedPost(
  presign: { url: string; fields: Record<string, string> },
  file: File,
  onProgress?: (pct: number) => void,
): Promise<Response> {
  const formData = new FormData();
  Object.entries(presign.fields).forEach(([k, v]) =>
    formData.append(k, v),
  );
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', presign.url, true);

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable && onProgress) {
        const pct = Math.round((evt.loaded / evt.total) * 100);
        onProgress(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 204 || xhr.status === 201) {
        resolve(new Response(null, { status: xhr.status }));
      } else {
        reject(new Error(`S3 upload failed: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(formData);
  });
}
