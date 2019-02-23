import React from 'react'
import { StatusBar } from 'react-native'
import { AppRegistry } from "react-native";

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux';
import reducers from './reducers/index.js';

import jwtDecode from 'jwt-decode';

const store = createStore(reducers);

// import { Auth } from 'aws-amplify'

import Tabs from './auth/Tabs'
import Nav from './nav/Nav'

import { AsyncStorage } from "react-native"

class App extends React.Component {
  state = {
    user: {},
    isLoading: true
  }
  async componentDidMount() {

    StatusBar.setHidden(true)

    const userToken = await AsyncStorage.getItem("user_token");
    if (userToken) this.setState({ user: jwtDecode(userToken), isLoading: false })
    else this.setState({ isLoading: false })

  }

  async componentWillReceiveProps(nextProps) {

    const userToken = await AsyncStorage.getItem("user_token");
    if (userToken) this.setState({ user: jwtDecode(userToken)})
    else this.setState({ user: {} })

  }
  render() {
    if (this.state.isLoading) return null
    let loggedIn = false
    if (this.state.user.username) {
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
