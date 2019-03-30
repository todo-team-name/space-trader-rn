import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  AsyncStorage
} from 'react-native'

import { connect } from 'react-redux'
// import { Auth } from 'aws-amplify'

import { logOut } from '../actions'
import { colors, fonts } from '../theme'
const { width, height } = Dimensions.get('window')
import { Button } from 'react-native';

class Home extends React.Component {
  state = {
    username: ''
  }
  logout() {
    AsyncStorage.removeItem("user_token")
      .then(() => {
        this.props.dispatchLogout()
      })
      .catch(err => {
        console.log('logout err: ', err)
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>Welcome {this.props.auth.user.username}</Text>
          <Button
            onPress={this.logout.bind(this)}
            title="Log Out"
            color="#841584"
          />        
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  homeContainer: {
    alignItems: 'center'
  },
  welcome: {
    fontFamily: fonts.light,
    color: 'rgba(0, 0, 0, .85)',
    marginBottom: 26,
    fontSize: 22,
    textAlign: 'center'
  },
  registration: {
    fontFamily: fonts.base,
    color: 'rgba(0, 0, 0, .5)',
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)