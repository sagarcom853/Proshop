import React from 'react'
import CheckoutSteps from '../CheckoutSteps'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Col, Button } from 'react-bootstrap'
import { savePaymentDetails } from '../actions/CartActions'
import FormComponent from '../components/formComponent'

const PaymentMethodScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { payMethod, shippingAddress } = cart
  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
    // dispatch save card
    dispatch(savePaymentDetails(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <div>
      <FormComponent>
        <Form onSubmit={submitHandler}>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
          <h2 className='mb-3 py-3' style={{ fontWeight: 'bold' }}>
            {' '}
            PAYMENT METHOD
          </h2>
          <Form.Group controlId='paymentMethod'>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>

            <Form.Check
              type='radio'
              label='Cash On Delivery'
              id='Cash'
              name='paymentMethod'
              value='Cash'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>

          <br />

          <Button type='submit' className='py-2' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormComponent>
    </div>
  )
}

export default PaymentMethodScreen
