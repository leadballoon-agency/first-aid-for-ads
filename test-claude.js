// Test Claude API directly with enhanced debugging
// This will use the CLAUDE_API_KEY from your environment
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

async function testClaude() {
  if (!CLAUDE_API_KEY) {
    console.error('❌ No CLAUDE_API_KEY found in environment!');
    console.log('Please set it with: export CLAUDE_API_KEY="your-key-here"');
    return;
  }

  console.log('\n🔐 Testing Claude API Authentication');
  console.log('=====================================');
  console.log('API Key format check:');
  console.log('  - Starts with "sk-ant-":', CLAUDE_API_KEY.startsWith('sk-ant-'));
  console.log('  - Length:', CLAUDE_API_KEY.length);
  console.log('  - Has whitespace:', CLAUDE_API_KEY !== CLAUDE_API_KEY.trim());
  console.log('  - First 20 chars:', CLAUDE_API_KEY.substring(0, 20) + '...');
  console.log('');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY.trim(),  // Must be lowercase and trimmed
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
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('\n❌ API Call Failed!');
      console.error('Status:', response.status);
      console.error('Error:', errorText);

      // Parse common error patterns
      if (response.status === 401) {
        console.error('\n🔴 Authentication failed - API key is invalid or incorrectly formatted');
        console.error('Common issues:');
        console.error('  1. API key has extra spaces or quotes');
        console.error('  2. API key is expired or revoked');
        console.error('  3. API key was copied incorrectly');
      }
    } else {
      const data = await response.json();
      console.log('\n✅ Success! Claude API is working correctly');
      console.log('Response:', data.content[0].text);
      console.log('\n✨ Your API key is valid and properly configured!');
    }
  } catch (err) {
    console.error('\n🔥 Connection error:', err.message);
    console.error('This might be a network issue or incorrect URL');
  }
}

testClaude();