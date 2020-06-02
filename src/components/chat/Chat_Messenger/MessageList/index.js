import React, {useEffect, useRef, useState} from 'react';
import MessageInput from '../MessageInput';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';

import './MessageList.scss';

export default function MessageList(props) {

  const currentUser = JSON.parse(localStorage.getItem('user')).username;

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView()
  }
  useEffect(scrollToBottom);


  const renderMessages = () => {
    if (!props.messages) return;

    let i = 0;
    let messageCount = props.messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let current = props.messages[i];
      let isMine = current.sender.username === currentUser;
      let showTimestamp = true;

      let previous = props.messages[i - 1];
      let next = props.messages[i + 1];
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startSequence={startsSequence}
          endSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  return (
    <div className={"scrollable content"}>
      <div className="message-list ">
        <Toolbar
          title={props.title}
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline"/>,
            <ToolbarButton key="video" icon="ion-ios-videocam"/>,
            <ToolbarButton key="phone" icon="ion-ios-call"/>
          ]}
        />

        <div className="message-list-container">{renderMessages()}</div>
      </div>

      <MessageInput sendMessage={props.sendMessage} />
      <div ref={messagesEndRef} />

    </div>

  );
}
