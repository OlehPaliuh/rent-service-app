import React, { Component } from "react";
import Messenger from "./Chat_Messenger";

class ChatPage extends Component {

    render () {
      return(
        <div >
          <Messenger {...this.props} />
        </div>
      );
    }
   
  }

  export default ChatPage;