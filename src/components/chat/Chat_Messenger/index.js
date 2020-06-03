import React, {Component} from 'react';
import ChatList from './ChatList';
import MessageList from './MessageList';
import './Messenger.scss';
import { messengerService } from '../../../services/messengerService';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import _ from 'lodash'

class Messenger extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      stompClient: null,
      chats: [],
      currentChat: {}
    }
  }

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user')).username;
  }

  connect = () => {
    const stompClient = Stomp.over(new SockJS("http://localhost:8080/ws"));

    stompClient.connect({}, (frame) => {
      this.setState({
        ...this.state,
        channelConnected: true,
        stompClient: stompClient
      })
      console.log('Connected: ' + frame);
      this.subscribeOnWsEndpoints();
    }, (err) => {
      console.error(err)
    });
  };


  subscribeOnWsEndpoints = () => {
    console.log(this.state.chats);
    this.state.chats.forEach(chat => {
      // Subscribing for each chat
      this.state.stompClient.subscribe('/chat/' + chat.id + "/messages",
        incomingMessage => {
          console.log("Received message...");
          console.log(incomingMessage)

          let newState = _.clone(this.state);
          let message = JSON.parse(incomingMessage.body);
          let chat = newState.chats.filter(c => c.id === message.chat.id)[0];

          console.log(chat)
          console.log(newState)

          chat.messages.unshift(message);
          chat.lastMessage = message;

          this.setState(newState);
        });
    });
    // Registering user to server as a public chat user

  };

  sendMessage = (messageContent) => {
    let message = {
      messageContent: messageContent,
      sender: this.getCurrentUser()
    };
    this.state.stompClient.send('/messenger/' + this.state.currentChat.id + '/message', {}, JSON.stringify(message));

  }

  componentDidMount() {

    this.fetchChats();
  }

  fetchChats() {
    let chats;

    messengerService.getChats().then(json => {
      chats = json || [];
      console.log(json);

      if(!chats) {
        return;
      }

      let supportChat;

      chats.forEach(chat => {
        if(chat.chatName === "Support support")
          supportChat = chat;
      });

      chats.forEach(chat => {
          chat.lastMessage = chat.messages[0];
          chat.messages[0] && (chat.lastMessageTimestamp = chat.messages[0].createdAt);
          chat.msgPageNumber = 0; // for message lazy loading
      });

      chats.sort(function (a, b) {
        return (a.lastMessageTimestamp < b.lastMessageTimestamp) ? -1 :
          ((a.lastMessageTimestamp > b.lastMessageTimestamp) ? 1 : 0);
      });

      let currChat;


      console.log("Params is");
      const params = this.props.match.params;
      if (params.chatId) {
        currChat = chats.filter(c => c.id === +params.chatId)[0]
      } else {
        currChat = chats[0];
      }

      console.log("current chat" + currChat);

      let results = [];

      if(supportChat) {
        results.push(supportChat);
      }
   
      chats.forEach(chat => {
        if(chat.chatName !== "Support support") {
          results.push(chat);
        }
      });
   
      this.setState({
        ...this.state,
        chats: results,
        currentChat: currChat
      })

      this.connect();
    });
  }

  changeCurrentChat = (chat) => {
    this.setState({
      ...this.state,
      currentChat: chat
    })
  }

  loadMoreMessages(chat) {
    messengerService.getMessages(chat.id, chat.msgPageNumber).then(json => {
      chat.messages = chat.messages.concat(json);
    })
  }

  render() {

    let messages = this.state.currentChat ? this.state.currentChat.messages : [];
    messages = _.orderBy(messages, ['createdAt'], ['asc']);
    return (
      <div className="messenger">

        <div className="scrollable messenger-sidebar">
          <ChatList chats={this.state.chats} currentChat={this.state.currentChat}
                    changeCurrentChat={this.changeCurrentChat}/>

        </div>

        {this.state.currentChat &&
        (<MessageList messages={messages} loadMoreMessages={this.loadMoreMessages}
                      sendMessage={this.sendMessage} title={this.state.currentChat.chatName}/>)}
      </div>
    );
  }

}

export default Messenger;
