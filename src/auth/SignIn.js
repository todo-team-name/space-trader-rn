import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

// import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'

import { authenticate, confirmUserLogin } from '../actions'
import { formStyles as styles } from '../styles';

import Input from '../components/Input'
import Button from '../components/Button'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    accessCode: ''
  }
  
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signIn() {
    const { username, password } = this.state
    this.props.dispatchAuthenticate(username, password)
  }

  render() {
    const { fontsLoaded } = this.state
    const { auth: {
      signInErrorMessage,
      isAuthenticating,
      signInError,
    }} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../assets/shape.png')}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.greeting]}>
          Space Trader
        </Text>
        <Text style={[styles.greeting2]}>
          sign in to continue
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="User Name"
            type='username'
            onChangeText={this.onChangeText}
            value={this.state.username}
          />
          <Input
            placeholder="Password"
            type='password'
            onChangeText={this.onChangeText}
            value={this.state.password}
            secureTextEntry
          />
        </View>

        <Button
          isLoading={isAuthenticating}
          title='Sign In'
          onPress={this.signIn.bind(this)}
        />      
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>{signInErrorMessage}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = {
  dispatchAuthenticate: (username, password) => authenticate(username, password)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
