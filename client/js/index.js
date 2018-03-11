import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import allReducers from './reducers';
import App from './components/App'
import Greetings from './components/Greetings'
import Signup from './components/signup/Signup'

const store = createStore(allReducers);

render (
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route path="/hi" component={Greetings} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('fieldToShow')
);

if (module.hot) {
  module.hot.accept(function() {
   console.log('Accepting the updated printMe module!');
    })
}