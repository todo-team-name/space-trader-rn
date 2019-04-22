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
    if (userToken && !this.props.auth.user.username) {
      fetch('http://192.168.137.1:4040/api/users/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + userToken
        },
        body: JSON.stringify({}),
      }).then((response) => response.json())
      .then((parsed) => {
        store.dispatch(logInSuccess(parsed, userToken))
      })
    } 
  }

  async componentWillReceiveProps(nextProps) {
    const userToken = await AsyncStorage.getItem("user_token");
    if (userToken && !this.props.auth.user.username) {
      fetch('http://192.168.137.1:4040/api/users/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + userToken
        },
        body: JSON.stringify({}),
      }).then((response) => response.json())
      .then((parsed) => {
        store.dispatch(logInSuccess(parsed, userToken))
      })
    } else if (this.props.auth.user && this.props.auth.user.game_info_react ) {
      fetch('http://192.168.137.1:4040/api/users/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + userToken
        },
        body: JSON.stringify({
          game_info_react: this.props.auth.user.game_info_react 
        }),
      })
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
