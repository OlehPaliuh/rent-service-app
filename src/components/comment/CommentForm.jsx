import React, { Component } from "react";
import "../../styles/commentStyle/CommentStyle.scss"

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    }
}
    render() {
      return (
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <div className="comment-form-fields">
            <textarea name="comment" id="comment" value={this.state.comment} placeholder="Comment" rows="4" required
              onChange={this.handleChange}></textarea>
          </div>
          <div className="comment-form-actions">
            <button type="submit">Post Comment</button>
          </div>
        </form>
      );
    }

    handleChange = (e) => {
      const { value } = e.target;
      this.setState({ comment: value });
    }
    
    handleSubmit = (event) => { 
      event.preventDefault();
      const { comment } = this.state;
      this.setState({comment: ""});
      this.props.addComment(comment);
    }
  }
  
  export default CommentForm;