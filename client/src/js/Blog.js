import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Post from './Post';
import '../css/Blog.css';

const styles = {
  textField: {
    height: 30,
    width: 200,
    fontSize: 20,
  },
  raisedButton: {
    height: 25,
    width: 100,
  }
}

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      blogTitle: '',
      blogText: '',
      posts: [],
    };
    this.handleBlogTitleChange = this.handleBlogTitleChange.bind(this);
    this.handleBlogTextChange = this.handleBlogTextChange.bind(this);
    this.handlePostButtonClick = this.handlePostButtonClick.bind(this);
  }
  componentDidMount() {
    fetch('/api/posts')
    .then(res => res.json())
    .then(p => this.setState({ posts: p }))
    .catch(err => console.error(err));
  }
  handleBlogTitleChange(event) {
    this.setState({
      blogTitle: event.target.value,
    });
  }
  handleBlogTextChange(event) {
    this.setState({
      blogText: event.target.value,
    });
  }
  handlePostButtonClick() {
    if ( this.state.blogTitle !== '' && this.state.blogText !== '' ) {
      const posts = this.state.posts;
      posts.push({
        id: this.state.posts.length,
        postTitle: this.state.blogTitle,
        postText: this.state.blogText,
      });
      fetch('/api/post', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.posts.length - 1,
          postTitle: this.state.blogTitle,
          postText: this.state.blogText,
        }),
      });
      this.setState({
        blogTitle: '',
        blogText: '',
        posts: posts,
      });
    }
  }
  render() {
    return (
      <div className="blog">
        <h1 className="blogTitle">Blog</h1>
        <div className="titleInput">
          <TextField
            value={this.state.blogTitle}
            hintText="Title..."
            onChange={this.handleBlogTitleChange}
          />
        </div>
        <div className="textInput">
          <textarea
            className="testArea"
            rows="4"
            cols="50"
            value={this.state.blogText}
            onChange={this.handleBlogTextChange}
          />
        </div>
        <div className="postButton">
          <RaisedButton
            label="Post"
            secondary={true}
            onClick={this.handlePostButtonClick}
            style={styles.raisedButton}
          />
        </div>
        {this.state.posts.map(post =>
          <div className="postList" key={post.id}>
            <Post
              key={post.id}
              post={post}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Blog;
