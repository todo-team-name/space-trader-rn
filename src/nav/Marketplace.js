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
const Marketplace = require('../utils/Marketplace') 
const { width, height } = Dimensions.get('window')

class Home extends React.Component {
  render() {
    const market = new Marketplace(5, false);
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>Marketplace</Text>
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