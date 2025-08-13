const BASE = 'http://localhost:4000/';

export async function postJSON(url, body) {
  const res = await fetch(BASE + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return { raw: text, status: res.status };
  }
}

export async function getJSON(url) {
  const res = await fetch(BASE + url);
  return res.json();
}
