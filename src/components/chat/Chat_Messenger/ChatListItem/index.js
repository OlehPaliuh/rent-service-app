import React, {useEffect} from 'react';
import shave from 'shave';

import './Chat.scss';

export default function Chat(props) {
  useEffect(() => {
    shave('.conversation-snippet', 40);
  })

  const { chatName, lastMessage, active} = props;

  const chatImage = (chatName === "Support support") ? '/images/support.png' : '/images/profile_navBar_icon.png'

  return (
    <div className={active ? 'chat-active conversation-list-item' : 'conversation-list-item'}
         onClick={() => props.changeCurrentChat()}>
      {/*<img className="conversation-photo" src={photo} alt="conversation"/>*/}
      <img src={chatImage} className="conversation-photo" alt="admin@bootstrapmaster.com"/>
      <div className="conversation-info">
        <h1 className="conversation-title">{chatName}</h1>
        <p className="conversation-snippet">{lastMessage}</p>
      </div>
    </div>
  );
}
