import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App'
import Greetings from './components/Greetings'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import rootReducer from './rootReducer';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import jwt from 'jsonwebtoken';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

render (
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={Greetings} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('main')
);

// if (module.hot) {
//   module.hot.accept(function() {
//    console.log('Accepting the updated module!');
//     })
// }
