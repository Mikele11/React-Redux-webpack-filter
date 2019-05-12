import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import Create from './components/Create';

import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/create" component={Create} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
