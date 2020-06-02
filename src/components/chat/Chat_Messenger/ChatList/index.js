import React, {useState, useEffect, Component} from 'react';
import ChatSearch from '../ChatSearch';
import Chat from '../ChatListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';

import './ChatList.scss';

export default class ChatList extends Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      searchString: ''
    }
  }

  changeSearchString(e) {
    this.setState({
      searchString: e.target.value
    })
  }

  render() {
    let chatsToShow = this.state.searchString.trim() ?
      this.props.chats.filter(chat => chat.chatName.toLowerCase().includes(this.state.searchString.toLowerCase())) :
      this.props.chats;

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog"/>
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline"/>
          ]}
        />
        <div className="conversation-search">
          <input
            onChange={(e) => this.changeSearchString(e)}
            type="search"
            className="conversation-search-input"
            placeholder="Search Messages"
          />
        </div>
        {
          (chatsToShow && this.props.currentChat) && chatsToShow.map(chat =>
            <Chat
              active={chat.id === this.props.currentChat.id}
              key={chat.id}
              chatName={chat.chatName}
              lastMessage={chat.lastMessage ? chat.lastMessage.content : '...'}
              changeCurrentChat={() => this.props.changeCurrentChat(chat)}
            />
          )
        }
      </div>
    );
  }

}
