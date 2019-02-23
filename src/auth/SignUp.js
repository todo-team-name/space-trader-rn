import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import { formStyles as styles } from '../styles';

// import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import { createUser, confirmUserSignUp } from '../actions'

import Input from '../components/Input'
import Button from '../components/Button'

const initialState = {
  username: '',
  password: '',
  email: '',
  phone_number: '',
  authCode: ''
}

class SignUp extends Component {
  state = initialState

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signUp() {
    const { username, password, email, phone_number } = this.state
    this.props.dispatchCreateUser(username, password, email, phone_number)
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { showSignUpConfirmationModal }} = nextProps
    if (!showSignUpConfirmationModal && this.props.auth.showSignUpConfirmationModal) {
      this.setState(initialState)
    }
  }

  render() {
    const { auth: {
      isAuthenticating,
      signUpError,
      signUpErrorMessage
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
        <Text style={styles.greeting}>
          Space Trader
        </Text>
        <Text style={styles.greeting2}>
          start playing by signing up
        </Text>
        <View style={styles.inputContainer}>
          <Input
            value={this.state.username}
            placeholder="User Name"
            type='username'
            onChangeText={this.onChangeText}
          />
          <Input
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
            type='password'
            onChangeText={this.onChangeText}
          />
        </View>
        <Button
          title='Sign Up'
          onPress={this.signUp.bind(this)}
          isLoading={isAuthenticating}
        />
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchCreateUser: (username, password) => createUser(username, password)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)


