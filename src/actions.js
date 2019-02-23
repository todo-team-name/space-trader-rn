import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from './reducers/auth'

// import { Auth } from 'aws-amplify'

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

export function createUser(username, password, email, phone_number) {
  return (dispatch) => {
    // dispatch(signUp())
    // let phone
    // const firstTwoDigits = phone_number.substring(0, 2)
    // if (firstTwoDigits === '+1') {
    //   phone = phone_number
    // } else {
    //   phone = '+1' + phone_number
    // }
    // Auth.signUp({
    //   username,
    //   password,
    //   attributes: {
    //     email,
    //     phone_number: phone
    //   }
    // })
    // .then(data => {
    //   console.log('data from signUp: ', data)
    //   dispatch(signUpSuccess(data))
    //   dispatch(showSignUpConfirmationModal())
    // })
    // .catch(err => {
    //   console.log('error signing up: ', err)
    //   dispatch(signUpFailure(err))
    // });
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

function logInSuccess(user) {
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
  return (dispatch) => {
    dispatch(logIn())
    Auth.signIn(username, password)
      .then(user => {
        dispatch(logInSuccess(user))
        dispatch(showSignInConfirmationModal())
      })
      .catch(err => {
        console.log('errror from signIn: ', err)
        dispatch(logInFailure(err))
      });
  }
}



