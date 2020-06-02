
export const messengerService = {
  getChats,
  getMessages,
  getOrCreateChat
};

export function logErr(err) {
  console.error(err);
  console.error("Error during MESSENGER request to the server.")
}

function getChats() {
  const currentUser = JSON.parse(localStorage.getItem('user')).username;

  console.log(`/api/messenger/${currentUser}/chats`);
  return fetch(`/api/messenger/${currentUser}/chats`)
    .then(res => res.json())
    .then(json => json)
    .catch(err => logErr(err));
}

function getMessages(chatId, pageNumber) {
  return fetch(`/api/messenger/chats/${chatId}/messages?pageNumber=${pageNumber}`)
    .then(res => res.json())
    .then(json => json)
    .catch(err => logErr(err));
}

function getOrCreateChat(withUsername) {
  const currentUser = JSON.parse(localStorage.getItem('user')).username;
  return fetch(`/api/messenger/${currentUser}/chats/getOrCreate?withUsername=${withUsername}`)
    .then(res => res.json())
    .then(json => json)
    .catch(err => logErr(err));
}
