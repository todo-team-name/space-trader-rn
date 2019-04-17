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

import { logOut, travel } from '../actions'
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
    const game_info = this.props.auth.user.game_info_react;
    const locationHash = game_info.solarSystems;
    const currPlanet = locationHash[game_info.x][game_info.y];
    const systems = []; 
    for (const x in locationHash) {
      for (const y in locationHash[x]) {
        systems.push(<Button
          onPress={() => this.props.dispatchTravel(x, y)}
          title={locationHash[x][y].systemName}
          color="#841584"
          disabled={x == game_info.x && y == game_info.y || game_info.cargoHold.fuel == 0}
          key={x + " " + y}
        />)
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>Welcome {this.props.auth.user.username}</Text>
          <Text>You are at planet {currPlanet.systemName} ({game_info.x}, {game_info.y}) with {game_info.cargoHold.fuel} fuel</Text>
          <Text>{currPlanet.resourceType} with TechLevel # {currPlanet.techLevel}</Text>
          <Button
            onPress={this.logout.bind(this)}
            title="Log Out"
            color="#841584"
          />       
          <Text style={styles.welcome}>Travel to: </Text>
          {
            systems
          }
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
  dispatchLogout: () => logOut(),
  dispatchTravel: (x, y) => travel(x, y)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)