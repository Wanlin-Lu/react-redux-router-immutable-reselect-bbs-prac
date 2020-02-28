import React, { Component } from 'react'
import './style.css' 

class PostEditor extends Component {
  constructor(props) {
    super(props)
    const { post } = this.props
    this.state = {
      title: (post && post.title) || '',
      content: (post && post.content) || ''
    }
  }

  handleChange = e => {
    const name = e.target.name 
    if (name === "title") {
      this.setState({
        title: e.target.value.trim()
      })
    } else if (name === "content") {
      this.setState({
        content: e.target.value.trim()
      })
    } else {}
  }

  handleCancelClick = () => {
    this.props.onCancel()
  }

  handleSaveClick = () => {
    const data = {
      title: this.state.title,
      content: this.state.content 
    }
    if (data.title && data.content) {
      this.props.onSave(data)
    } else {
      alert("标题和内容不能为空哦！")
    }
  }

  render () {
    return (
      <div className="postEditor">
        <input
          type="text"
          name="title"
          placeholder="标题"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <textarea
          name="content"
          placeholder="评论内容"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <button onClick={this.handleCancelClick}>取消</button>
        <button onClick={this.handleSaveClick}>保存</button>
      </div>
    );
  }
}

export default PostEditor