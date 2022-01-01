import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormComponent from '../components/formComponent'
import { saveShippingAddress } from '../actions/CartActions'
import CheckoutSteps from '../CheckoutSteps'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <div>
      <FormComponent>
        <Form onSubmit={submitHandler}>
          <CheckoutSteps step1 step2></CheckoutSteps>
          <Form.Group controlId='address' className='py-2'>
            <h2><b>Shipping</b></h2>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='address'
              placeholder='Enter Address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city' className='py-2'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='city'
              placeholder='Enter City'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode' className='py-2'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='postalCode'
              placeholder='Enter Postal Code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country' className='py-2'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='country'
              placeholder='Enter Country Name'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
        
          <Button variant='primary' type='submit'>
            CONTINUE
          </Button>
       
         
        </Form>
      </FormComponent>
    </div>
  )
}

export default ShippingScreen
