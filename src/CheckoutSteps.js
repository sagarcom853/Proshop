import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div>
      <Nav className='py-2' style={{ fontWeight: 'bold', fontSize: '17px' }}>
        <Nav.Item>
          {step1 ? (
            <LinkContainer to='/login'>
              <Nav.Link>
                <b>Sign In</b>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <LinkContainer to='/shipping'>
              <Nav.Link>
                <b>Ship</b>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Ship</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step3 ? (
            <LinkContainer to='/payment'>
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step4 ? (
            <LinkContainer to='/placeorder'>
              <Nav.Link to='/placeorder'>Place order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Place order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default CheckoutSteps
