// import React from 'react'
import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../contants/CartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // console.log('inside add to cart actionj')
  const { data } = await axios.get(`/api/products/${id}`)
  // console.log(data)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  console.log('remove data  from cart')
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      product: id,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (formData) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: formData,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(formData))
}

export const savePaymentDetails = (data) => async (dispatch) => {
  console.log(data)
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
localStorage.setItem('paymentPlan',JSON.stringify(data))

}