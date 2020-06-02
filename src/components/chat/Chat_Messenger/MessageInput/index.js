import React, {Component} from 'react';
import './MessageInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  };
  send = () => {
    if(this.state.value.trim()){

      this.props.sendMessage(this.state.value)
    }
    this.setState({
      ...this.state,
      value: ''
    })
  };
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.send();
    }
  }

  render() {

    return (
      <div className="compose">
        <input
          className="compose-input"
          type="text"
          placeholder="Type a message"
          onChange={e => this.handleChange(e)}
          onKeyPress={e => this.handleKeyPress(e)}
          value={this.state.value}
        />
        <button className={"compose-btn"} onClick={() => this.send()}>
          send
            {/* <FontAwesomeIcon icon="coffee"/> */}
          {/* <i class="fas fa-chevron-right d-block"></i> */}
        </button>

      </div>
    )
  }
}
