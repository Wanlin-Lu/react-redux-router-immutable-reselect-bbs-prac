import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as postActions } from '../../redux/modules/posts'
import { actions as uiActions, isAddDialogOpen } from '../../redux/modules/ui'
import { getLoggedUser } from '../../redux/modules/auth'
import { getPostListWithAuthors } from '../../redux/modules'
import PostsView from './components/PostsView'
import PostEditor from '../Post/components/PostEditor'
import './style.css'

class PostList extends Component {

    componentDidMount() {
      this.props.fetchAllPosts()
    }

    handleSave = data => {
      this.props.createPost(data.title, data.content)
      this.props.closeAddDialog()
    }
    handleCancel = () => {
      this.props.closeAddDialog()
    }
    handleNewPost = () => {
      this.props.openAddDialog()
    }

    render() {
        const { user, posts, isAddDialogOpen } = this.props
        const rawPosts = posts.toJS()
        return (
            <div className="postList">
              <div>
                <h2>话题列表呢</h2> 
                {user.get('userId') ? (
                  <button onClick={this.handleNewPost}>
                    发帖
                  </button>
                ) : null}
              </div>
              {isAddDialogOpen ? (
                <PostEditor
                  onSave={this.handleSave}
                  onCancel={this.handleCancel}
                />
              ) : null}
              <PostsView posts={rawPosts} />     
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state),
    posts: getPostListWithAuthors(state),
    isAddDialogOpen: isAddDialogOpen(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)