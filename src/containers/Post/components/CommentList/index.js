import React, { Component } from 'react'
import CommentsView from '../CommentsView' 
import './style.css'

class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }

  handleChange = e => {
    this.setState({
      value: e.target.value.trim()
    })
  }

  handleClick = () => {
    const content = this.state.value.trim()
    if (content) {
      this.props.onSubmit(content)
      this.setState({
        value: ''
      })
    } else {
      this.setState({
        value: 'Error: 评论内容不能为空！'
      })
    }
  }

  render () {
    const { comments, editable } = this.props
    return (
      <div className="commentList">
        <div className="title">评论</div>
        {editable ? (
          <div className="editor">
            <textarea
              placeholder="说说你的看法"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>提交</button>
          </div>
        ) : null}
        <CommentsView comments={comments} />
      </div>
    );
  }
}

export default CommentList