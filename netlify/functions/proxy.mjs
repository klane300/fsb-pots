export default async (req) => {
  const url = new URL(req.url).searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), { status: 400 });
  }

  if (!url.includes('apps.bowl.com')) {
    return new Response(JSON.stringify({ error: 'Only bowl.com URLs are allowed' }), { status: 403 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    const html = await response.text();

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export const config = {
  path: '/api/proxy'
};
