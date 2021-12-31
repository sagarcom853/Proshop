import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_PAY_REQUEST_CASH,
  ORDER_PAY_SUCCESS_CASH,
  ORDER_PAY_FAIL_CASH,
  ORDER_PAY_RESET_CASH
} from '../contants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true }
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return {}
  }
}

export const orderDetailsReducer = (
  state = { loading:true,orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPayReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false,success:true}
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderPayReducerByCash = (
  state = {},
  action
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST_CASH:
      return {loading: true }
    case ORDER_PAY_SUCCESS_CASH:
      return { loading: false,success:true,}
    case ORDER_PAY_FAIL_CASH:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET_CASH:
      return {}
    default:
      return state
  }
}

