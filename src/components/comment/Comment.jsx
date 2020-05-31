import React, { Component } from "react";
import Moment from 'moment';
import { Button } from 'reactstrap';
import "../../styles/commentStyle/CommentStyle.scss"

class Comment extends Component {

  deleteComment = (event) => {
    event.preventDefault();
    if(JSON.parse(localStorage.getItem('user')).id === this.props.comment.owner.id) {
      this.props.handleDeleteComment(this.props.comment.id)
    }
  }

    render () {

      const date = new Date(this.props.comment.createdAt);
      const formattedDate = Moment(date).format('LLL');

      return(
        <div className="comment">
          {this.props.author && 
          <p className="comment-header">{this.props.author.firstName}  {this.props.author.lastName} <span className="span-date">{formattedDate}</span></p>
          }
          <p className="comment-body">- {this.props.comment.content}</p>
          <div className="comment-footer">
            {this.props.isOwner &&
            <Button color="danger" size="sm" className="comment-footer-delete" onClick={this.deleteComment}>Delete Comment</Button>
            }
            </div>
        </div>
      );
    }
   
  }

  export default Comment;