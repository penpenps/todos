import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginForm from './screens/login';
import SignupForm from './screens/register'
import HomePage from './screens/home'
import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.js'
import './styles/styles.scss'
export default class App extends Component {

  render() {
    return (
      <BrowserRouter path="*">
        <div>
         
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/login" component={LoginForm}/>
              <Route exact path="/register" render={() => <SignupForm />}/>
         
        </div>
      </BrowserRouter>
    );
  }
}