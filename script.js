async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  addMessage('Typing...', 'bot', true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    removeTyping();
    addMessage(data.message || "Something went wrong 💔 Please try again later.", 'bot');
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