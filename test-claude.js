// Test Claude API directly
// Replace with your actual API key to test
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || 'sk-ant-PASTE_YOUR_KEY_HERE';

async function testClaude() {
  console.log('Testing with key:', CLAUDE_API_KEY ? CLAUDE_API_KEY.substring(0, 20) + '...' : 'NO KEY');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,  // Note: lowercase x-api-key
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: 'Say hello'
        }]
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error('Error:', error);
    } else {
      const data = await response.json();
      console.log('Success! Response:', data.content[0].text);
    }
  } catch (err) {
    console.error('Failed:', err);
  }
}

testClaude();