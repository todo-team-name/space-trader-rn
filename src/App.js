import React from 'react'
import { StatusBar } from 'react-native'
import { AppRegistry } from "react-native";

import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import rootReducer from './reducers/index.js';
import jwtDecode from 'jwt-decode';

import Tabs from './auth/Tabs'
import Nav from './nav/Nav'

import { logInSuccess } from './actions'
import { AsyncStorage } from "react-native"

const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends React.Component {
  async componentDidMount() {

    StatusBar.setHidden(true)
    const userToken = await AsyncStorage.getItem("user_token");

    if (userToken) {
      store.dispatch(logInSuccess(jwtDecode(userToken)))
    } 
  }

  async componentWillReceiveProps(nextProps) {
    const userToken = await AsyncStorage.getItem("user_token");
    if (userToken) {
      store.dispatch(logInSuccess(jwtDecode(userToken)))
    } 
  }
  render() {
    if (this.props.auth.isAuthenticating) {
      return null
    }

    let loggedIn = false
    if (this.props.auth.user.username) {
      console.log(this.props)
      loggedIn = true
    }
    if (loggedIn) {
      return (
        <Nav />
      )
    }
    return (
      <Tabs />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const ConnectedApp = connect(mapStateToProps)(App)

class Root extends React.Component {
  render () {
    return (<Provider store={store}><ConnectedApp/></Provider>);
  }
  
}

AppRegistry.registerComponent("main", () => Root);
export default Root
