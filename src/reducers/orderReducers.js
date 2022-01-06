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
  ORDER_PAY_RESET_CASH,
  ORDER_PAY_REQUEST_Gpay,
  ORDER_PAY_SUCCESS_Gpay,
  ORDER_PAY_RESET_Gpay,
  ORDER_PAY_FAIL_Gpay,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET


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
  state = { loading: true, orderItems: [], shippingAddress: {} },
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

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderPayReducerByCash = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST_CASH:
      return { loading: true }
    case ORDER_PAY_SUCCESS_CASH:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL_CASH:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET_CASH:
      return {}
    default:
      return state
  }
}

export const orderPayReducerByGpay = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST_Gpay:
      return { loading: true }
    case ORDER_PAY_SUCCESS_Gpay:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL_Gpay:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET_Gpay:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true }
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true }
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}
