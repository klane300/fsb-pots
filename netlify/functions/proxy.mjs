export default async (req) => {
  const params = new URL(req.url).searchParams;
  const url = params.get('url');

  if (!url) {
    return new Response('Missing url', { status: 400 });
  }

  if (!url.startsWith('https://apps.bowl.com/')) {
    return new Response('Only apps.bowl.com URLs allowed', { status: 403 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });
    const html = await res.text();
    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (e) {
    return new Response('Fetch failed: ' + e.message, { status: 500 });
  }
};

export const config = { path: '/api/proxy' };
