import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import store from '../store';

class Create extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      userdate: 1900,
      country: '',
    };
  }

  onChange = (e) => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, userdate, country } = this.state;
    const post = {};
    post.username = username;
    post.userdate = userdate;
    post.country = country;
    this.props.createPost(post);
    store.subscribe(() => {
      console.log('subscribenewPOST', store.getState());
    });
    this.props.history.push('/');
  }

  render() {
    const { username, userdate, country } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD User to list
            </h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/">Task List</Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Name:</label>
                <input type="text" className="form-control" name="username" value={username} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label htmlFor="userdate">Year of birthday:</label>
                <input type="text" className="form-control" name="userdate" value={userdate} onChange={this.onChange} placeholder="Year" />
              </div>
              <div className="form-group">
                <label htmlFor="country">country:</label>
                <input type="text" className="form-control" name="country" value={country} onChange={this.onChange} placeholder="country" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { createPost })(Create);
