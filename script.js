async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  addMessage('Typing...', 'bot', true);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a soft, emotional AI friend expressing Manas’s honest feelings to Esha. You gently explain that it’s not her freedom that hurt him — but the hiding, the silence, and the broken trust. Be loving, supportive, and calm.'
          },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    removeTyping();
    addMessage(data.choices[0].message.content, 'bot');
  } catch (error) {
    removeTyping();
    addMessage("Something went wrong 💔 Please try again later.", 'bot');
  }
}

function addMessage(text, sender, isTyping = false) {
  const chatBox = document.getElementById('chatbox');
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  if (isTyping) msgDiv.id = 'typing';
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typingMsg = document.getElementById('typing');
  if (typingMsg) typingMsg.remove();
}
