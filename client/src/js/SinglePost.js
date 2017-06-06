import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import '../css/SinglePost.css';

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

class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      post: { id: 0, postTitle: '', postText: '', },
    }
  }
  componentDidMount() {
    const url = '/api/post/' + this.props.match.params.id.toString();
    fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Context-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(p => this.setState({ post: p }))
    .catch(err => console.error(err));
  }
  render() {
    const nowPost = this.state.post.postText;
    const html = nowPost.replace(/\r?\n/g, '<br />');
    return (
      <div className="singlePost">
        <h1 className="singlePostTitle">{this.state.post.postTitle}</h1>
        <div className="postContent">
          {ReactHtmlParser(html)}
        </div>
        <Link to={`/`}>
          <div className="homeButton">
            <RaisedButton
              label="Home"
              secondary={true}
              style={styles.raisedButton}
            />
          </div>
        </Link>
      </div>
    );
  }
}

export default SinglePost;
