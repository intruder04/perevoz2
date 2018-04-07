import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Calls from './components/calls/Calls';
import NewEvent from './components/events/NewEvent';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import jwtDecode from 'jwt-decode';
import requireAuth from './utils/requireAuth';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render (
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={Greetings} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/new-event" component={requireAuth(NewEvent)} />
          <Route path="/calls" component={requireAuth(Calls)} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);