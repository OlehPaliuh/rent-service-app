import React, { Component } from "react";
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import { commentService } from "../../services/commentService";
import "../../styles/commentStyle/CommentStyle.scss"

class CommentBox extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        apartmentId: this.props.apartmentId || "",
        showComments: false,
        comments: this.props.comments || []
      };
    }

    handleAddComment = (comment) => {
      commentService.addComment(this.props.apartmentId, comment)
        .then(response => {
            this.state.comments.push(response);
            this.props.addComment(response);
        });
    }
    
    render () {
      let commentNodes;
      let buttonText = 'Show Comments';

      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{this.getComments()}</div>;
      }
      
      return(
        <div className="comment-box">
          <h2>Join the Discussion!</h2>
          <CommentForm  addComment={this.handleAddComment}/>
          <button id="comment-reveal" onClick={this.handleClick}>
            {buttonText}
          </button>
          <h4 className="comment-count">
            {this.props.comments && this.getCommentsTitle(this.props.comments.length)}
          </h4>
          {commentNodes}
        </div>  
      );
    }
    
    handleClick = () => {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    getComments() {   
      
     const comments =  this.props.comments.sort((a,b) => {
        return new Date(a.scheduled_for).getTime() - 
            new Date(b.scheduled_for).getTime()
    }).reverse();
      
      return comments.map((comment) => { 
        return (
          <Comment 
            author={comment.owner} 
            comment={comment} 
            key={comment.id}
            isOwner={JSON.parse(localStorage.getItem('user')).id === comment.owner.id}
            handleDeleteComment={this.deleteComment} />
        ); 
      });
    }

    deleteComment = (id) => {
      commentService.deleteComment(id)
        .then(response => {
          this.props.deleteComment(id);
        })
    }
    
    getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  }

  export default CommentBox;