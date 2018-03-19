import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App'
import Greetings from './components/Greetings'
import Signup from './components/signup/Signup'
import rootReducer from './rootReducer';

// const store = createStore(allReducers);
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  
);

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
   console.log('Accepting the updated module!');
    })
}