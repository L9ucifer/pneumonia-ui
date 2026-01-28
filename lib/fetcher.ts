// D:\My project\pneumonia-ui\lib\fetcher.ts

export async function postJSON(url: string, body: any) {
  const r = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!r.ok) {
    const text = await r.text();
    throw new Error(text || `Request failed: ${r.status}`);
  }

  return r.json();
}
