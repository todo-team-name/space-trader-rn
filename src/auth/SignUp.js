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

// import console = require('console');

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

  completeSkillPicking(skillPickerState) {
    this.setModalVisible(false);
    const { username, password } = this.state
    console.log(username, password)
    const points = {
      fighter: skillPickerState.fighterSkill,
      trader: skillPickerState.traderSkill,
      engineer: skillPickerState.engineerSkill,
      pilot: skillPickerState.pilotSkill
    }
    const difficulty = skillPickerState.difficulty
    this.props.dispatchCreateUser(username, password, points, difficulty)
  }

  startSkillPicking() {
    this.setModalVisible(true);
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
            <SkillPicker completeSkillPicking={this.completeSkillPicking.bind(this)}/>
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
          onPress={this.startSkillPicking.bind(this)}
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
  dispatchCreateUser: (username, password, points, difficulty) => createUser(username, password, points, difficulty)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)


