const TABI_KEY = 'sk-R7hYNYsSrR4F8uyS1qXh4ZZ2Cvzqdu5YhzedVMP6hQNQay33';
const TABI_URL = 'https://tabitoken.com/v1/chat/completions';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const maxRetries = 2;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const resp = await fetch(TABI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + TABI_KEY
        },
        body: JSON.stringify(req.body),
        signal: AbortSignal.timeout(90000)
      });

      const data = await resp.text();
      let json;
      try { json = JSON.parse(data); } catch (e) {
        lastError = 'upstream_invalid_json';
        if (attempt < maxRetries) { await new Promise(r => setTimeout(r, 1000)); continue; }
        return res.status(502).json({ error: { message: 'AI service temporarily unavailable. Please try again.', type: 'upstream_error' } });
      }

      // Rate limited — retry after delay
      if (resp.status === 429 && attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      return res.status(resp.status).json(json);
    } catch (e) {
      lastError = e.message;
      if (attempt < maxRetries) { await new Promise(r => setTimeout(r, 1000)); continue; }
      return res.status(500).json({ error: { message: 'AI service timed out. Please try again.', type: 'timeout_error' } });
    }
  }
};
