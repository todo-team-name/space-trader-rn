import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from './reducers/auth'

import { AsyncStorage } from "react-native"

import jwtDecode from 'jwt-decode'
import generateGameInfo from './utils/GameInfo'

function signUp() {
  return {
    type: SIGN_UP
  }
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(err) {
  return {
    type: SIGN_UP_FAILURE,
    error: err
  }
}

export function createUser(username, password, points, difficulty) {
  let decodedUser = null;
  return (dispatch) => {
    dispatch(signUp())
    fetch('http://192.168.137.1:4040/api/users/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        points,
        difficulty,
        game_info_react: generateGameInfo(10)
      }),
    }).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
        throw new Error("Incorrect username/password")
      }
    }).then((parsed) => {
      decodedUser = jwtDecode(parsed.token); // so we can use this in the next then iter
      return AsyncStorage.setItem("user_token", parsed.token);
    }).then(() => {
      dispatch(signUpSuccess(decodedUser))
    }).catch((err) => {
      dispatch(signUpFailure(err.message))
    })
  }
}

function logIn() {
  return {
    type: LOG_IN
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}

export function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user: user
  }
}

function logInFailure(err) {
  return {
    type: LOG_IN_FAILURE,
    error: err
  }
}

export function authenticate(username, password) {
  let decodedUser = null;
  return (dispatch) => {
    dispatch(logIn())
    fetch('http://192.168.137.1:4040/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    }).then((response) => {
      if (response.status == 200) {
        return response.json()
      } else {
        throw new Error("Incorrect username/password")
      }
    }).then((parsed) => {
      decodedUser = jwtDecode(parsed.token); // so we can use this in the next then iter
      return AsyncStorage.setItem("user_token", parsed.token);
    }).then(() => {
      dispatch(logInSuccess(decodedUser))
    }).catch((err) => {
      dispatch(logInFailure(err.message))
    })
  }
}



