import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  TRAVEL,
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

export function travel(x, y) {
  return {
    type: TRAVEL,
    x,
    y
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

export function logInSuccess(user, token) {
  return {
    type: LOG_IN_SUCCESS,
    user,
    token
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
  let token = null;
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
      token = parsed.token;
      return AsyncStorage.setItem("user_token", parsed.token);
    }).then(() => {
      console.log("yeet")
      return fetch('http://192.168.137.1:4040/api/users/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({}),
      }).then((response) => response.json())
    }).then((parsed) => {
      dispatch(logInSuccess(parsed, token))
    })
    .catch((err) => {
      debugger;
      dispatch(logInFailure(err.message))
    })
  }
}



