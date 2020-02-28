import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as postActions } from '../../redux/modules/posts'
import { actions as commentActions } from '../../redux/modules/comments'
import { actions as uiActions, isEditDialogOpen } from '../../redux/modules/ui'
import { getLoggedUser } from '../../redux/modules/auth' 
import { getPostDetail, getCommentsWithAuthors } from '../../redux/modules' 
import PostView from './components/PostView' 
import PostEditor from './components/PostEditor' 
import CommentList from './components/CommentList' 
import './style.css'

class Post extends Component {

  componentDidMount() {
    const postId = this.props.match.params.id 
    console.log("iiiii",postId)
    this.props.fetchPost(postId)
    this.props.fetchComments(postId)
  }

  handleEditClick = () => {
    this.props.openEditDialog()
  }

  handlePostSave = (data) => {
    const id = this.props.match.params.id 
    this.props.updatePost(id, data)
  }

  handlePostCancel = () => {
    this.props.closeEditDialog()
  }

  handleCommentSubmit = content => {
    const postId = this.props.match.params.id 
    const { user } = this.props 
    const comment = {
      author: user.userId,
      post: postId,
      content: content
    }
    this.props.createComment(comment)
    this.props.closeEditDialog()
  }

  render () {
    const { post, comments, user, isEditDialogOpen } = this.props 
    if (!post) {
      return null
    }
    console.log("postINPostRender:",post)
    console.log("post.auther.id INPostRender:", post.author);
    const editable = user.userId === post.author.id
    return (
      <div className="post">
        {isEditDialogOpen ? (
          <PostEditor
            post={post}
            onSave={this.handlePostSave}
            onCancel={this.handlePostCancel}
          />
        ) : (
          <PostView
            post={post}
            editable={editable}
            onEditClick={this.handleEditClick}
          />
        )}
        <CommentList
          comments={comments}
          editable={Boolean(user.userId)}
          onSubmit={this.handleCommentSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log("params.id,from Post", props.match.params.id);
  console.log("PostinPost:", getPostDetail(state, props.match.params.id));
  console.log(
    "comments in Post:",
    getCommentsWithAuthors(state, props.match.params.id)
  );
  return {
    user: getLoggedUser(state),
    post: getPostDetail(state, props.match.params.id),
    comments: getCommentsWithAuthors(state, props.match.params.id),
    isEditDialogOpen: isEditDialogOpen(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(commentActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)