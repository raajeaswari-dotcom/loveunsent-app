export async function api(path: string, options: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const res = await fetch(base + path, {
    cache: "no-store",
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}