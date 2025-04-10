const API_URL = 'http://192.168.1.60:8000';

export async function getMessagesByConversation(conversationId: string, token: string) {
  const res = await fetch(`${API_URL}/messages/conversation/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function sendMessageToConversation(message: any, token: string) {
  const res = await fetch(`${API_URL}/messages/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(message),
  });
  return res.json();
}
