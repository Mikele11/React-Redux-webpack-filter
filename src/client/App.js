import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts, deletePost } from './actions/postActions.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      usersPerPage: 5,
      items: []
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  filterList = param => (e) => {
    let updatedList = [];
    const { items } = this.state;
    if (items.length < 1) {
      updatedList = this.props.posts;
    } else {
      updatedList = items;
    }
    // updatedList = this.props.posts;
    let paramInItem;
    updatedList = updatedList.filter((item) => {
      switch (param) {
        case 'username':
          paramInItem = item.username;
          break;
        case 'userdate':
          paramInItem = `${item.userdate}`;
          break;
        case 'country':
          paramInItem = item.country;
          break;
        default:
          paramInItem = item.username;
      }
      return paramInItem.toLowerCase().search(
        e.target.value.toLowerCase()
      ) !== -1;
    });
    this.setState({ items: updatedList });
  }

  render() {
    const { currentPage, usersPerPage, items } = this.state;
    const users = this.props.posts;
    let userArr = [];
    const indexOfLastTodo = currentPage * usersPerPage;
    const indexOfFirstTodo = indexOfLastTodo - usersPerPage;
    const currentUserList = users.slice(indexOfFirstTodo, indexOfLastTodo);
    if (items.length < 1) {
      userArr = currentUserList;
    } else {
      userArr = items;
    }

    const renderTodos = userArr.map((post, index) => (
      <div key={index} className="article">
        <div className="article_date">
          <div>Name user: </div>
          <div>{post.username}</div>
        </div>
        <div className="article_date">
          <div>Year birthday: </div>
          <div>{post.userdate}</div>
        </div>
        <div className="article_date">
          <div>Country: </div>
          <div>{post.country}</div>
        </div>
      </div>
    ));

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
      <li key={number} id={number} onClick={this.handleClick}>
        {number}
      </li>
    ));

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              User List &nbsp;
            </h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/create">Add Task</Link>
            </h4>
            <div className="searchInputs">
              <input type="text" name="filtername" placeholder="filter name" onChange={this.filterList('username')} />
              <input type="number" name="filterdate" placeholder="filter year" onChange={this.filterList('userdate')} />
              <input type="text" name="filtercountry" placeholder="filter country" onChange={this.filterList('country')} />
            </div>
            <div>
              {renderTodos}
            </div>
            <ul>
              {renderPageNumbers}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.postss
});

export default connect(mapStateToProps, { fetchPosts, deletePost })(App);
