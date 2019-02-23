import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
} from 'react-native';

import { formStyles as styles } from '../styles';
import { KeyboardAvoidingView } from 'react-native';

import { connect } from 'react-redux'
import { createUser } from '../actions'

import Input from '../components/Input'
import SkillPicker from '../components/SkillPicker'

import Button from '../components/Button'

const initialState = {
  username: '',
  password: '',
  modalVisible: false
}

class SignUp extends Component {
  state = initialState

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  signUp() {
    this.setModalVisible(true)
    // const { username, password } = this.state
    // this.props.dispatchCreateUser(username, password)
  }


  render() {
    const { auth: {
      isAuthenticating,
      signUpError,
      signUpErrorMessage
    }} = this.props
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center', 
          }}>
            <SkillPicker />
          </View>
        </Modal>
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
      </KeyboardAvoidingView>
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


