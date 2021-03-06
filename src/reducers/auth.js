
export const LOG_IN = 'LOG_IN'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'
export const LOG_OUT = 'LOG_OUT'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
export const TRAVEL = "TRAVEL"
export const BUY_ITEM = "BUY_ITEM"
export const SELL_ITEM = "SELL_ITEM"


const initialState = {
  isAuthenticating: false,
  user: {},

  signUpError: false,
  signInError: false,
  token: null,

  signInErrorMessage: '',
  signUpErrorMessage: '',

}

export default (state = initialState, action) => {
  switch(action.type) {
    case SIGN_UP:
      return {
        ...state,
        isAuthenticating: true,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signUpError: true,
        signUpErrorMessage: action.error.message
      }
    case LOG_IN:
      return {
        ...state,
        isAuthenticating: true,
        signInError: false
      }
    case LOG_IN_SUCCESS:
      return {
        isAuthenticating: false,
        user: action.user,
        token: action.token
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signInError: true,
        signInErrorMessage: action.error.message
      }
    case LOG_OUT:
      return {
        ...initialState,
      }

    case TRAVEL:
      return {
        ...state,
        user: {
          ...state.user,
          game_info_react: {
            ...state.user.game_info_react,
            x: action.x,
            y: action.y,
            drought: Math.random() >= 0.5,
            cargoHold: {
              ...state.user.game_info_react.cargoHold,
              fuel: state.user.game_info_react.cargoHold.fuel - 1
            } 
          }
        }
      }
    
    case BUY_ITEM:
      const newStock = state.user.game_info_react.cargoHold[action.item] ? 
                        state.user.game_info_react.cargoHold[action.item] + 1 : 1;
      return {
        ...state,
        user: {
          ...state.user,
          game_info_react: {
            ...state.user.game_info_react,
            credits: state.user.game_info_react.credits - parseFloat(action.credits),
            cargoHold: {
              ...state.user.game_info_react.cargoHold,
              [action.item]: newStock
            } 
          }
        }
      }

    case SELL_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          game_info_react: {
            ...state.user.game_info_react,
            credits: state.user.game_info_react.credits + parseFloat(action.credits),
            cargoHold: {
              ...state.user.game_info_react.cargoHold,
              [action.item]: state.user.game_info_react.cargoHold[action.item] - 1
            } 
          }
        }
      }

    default:
      return state
  }
}