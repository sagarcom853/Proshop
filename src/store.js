import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListreducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/CartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './reducers/userReducer'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderPayReducerByCash,
  orderPayReducerByGpay,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListreducer,
  productDetails: productDetailsReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  productUpdate:productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate:userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderPayByCash: orderPayReducerByCash,
  orderPayByGpay: orderPayReducerByGpay,
  orderMyList: orderListMyReducer,
  orderList:orderListReducer,
  orderDeliver:orderDeliverReducer
})
const cartItemFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
