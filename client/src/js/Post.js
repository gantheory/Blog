import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import '../css/Blog.css';
import '../css/Post.css';
import Radium from 'radium';

var RadiumLink = Radium(Link);
var RadiumStyle = {
  base: {
    color: '#fff',
    ':hover': {
      color: '#616161',
    },
  },
};

class Post extends Component {
  render() {
    const nowPost = this.props.post.postTitle;
    const html = nowPost.replace(/\r?\n/g, '<br />');
    return (
      <div className="posts">
        <div className="post">
          <RadiumLink
            style={[
              RadiumStyle.base,
            ]}
            to={`/posts/${this.props.post.id}`}
          >
            {ReactHtmlParser(html)}
          </RadiumLink>
        </div>
      </div>
    );
  }
}

export default Post;
