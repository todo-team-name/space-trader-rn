import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  AsyncStorage
} from 'react-native'

import { Button } from 'react-native';

import { connect } from 'react-redux'
// import { Auth } from 'aws-amplify'

import { logOut, buy, sell } from '../actions'
import { colors, fonts } from '../theme'
const Marketplace = require('../utils/Marketplace') 
const { width, height } = Dimensions.get('window')

class Home extends React.Component {
  
  render() {
    const game_info = this.props.auth.user.game_info_react;
    const market = new Marketplace(5, game_info.drought);
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text>Credits: {game_info.credits}</Text>
          <Text>Marketplace (click to buy)</Text>
          {
            Object.keys(market.availibleItems).map((item, idx) => 
              <Button
                onPress={() => {this.props.dispatchBuy(item, market.availibleItems[item])}}
                title={item + " " + market.availibleItems[item]}
                color="#841584"
                disabled={game_info.credits < market.availibleItems[item]}
                key={idx}
              />
            )
          }

          <Text>Cargo Hold (click to sell):</Text>
          {
            Object.keys(game_info.cargoHold).map((elem, idx) => 
              <Button
                onPress={() => {this.props.dispatchSell(elem, market.availibleItems[elem])}}
                title={elem + ": " + game_info.cargoHold[elem]}
                color="#841584"
                disabled={game_info.cargoHold[elem] <= 0 || !market.availibleItems[elem]}
                key={idx}
              />
            )

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
  dispatchBuy: (item, credits) => buy(item, credits),
  dispatchSell: (item, credits) => sell(item, credits)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)