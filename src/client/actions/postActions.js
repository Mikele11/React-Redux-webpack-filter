import axios from 'axios';
import { FETCH_POSTS, NEW_POST, DELETE_POST } from './types';

export const fetchPosts = () => dispatch => axios.get('/api/post')
  .then((res) => {
    dispatch({
      type: FETCH_POSTS,
      payload: res.data
    });
  })
  .catch((error) => {
    this.props.history.push('/login');
    console.log('action err', error);
  });

export const deletePost = id => dispatch => axios.delete(`/api/post/${id}`)
  .then(() => {
    axios.get('/api/post')
      .then((res) => {
        dispatch({
          type: DELETE_POST,
          payload: res.data
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  });

export const createPost = postData => dispatch => axios.post('/api/post', postData)
  .then((res) => {
    console.log('new_post', res);
    dispatch({
      type: NEW_POST,
      payload: res.data
    });
  })
  .catch((err) => {
    this.props.history.push('/');
    console.log('action err', err);
  });
