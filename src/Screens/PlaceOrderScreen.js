import CheckoutSteps from '../CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Row, Col, ListGroup, Card, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { createOrder } from '../actions/orderAction'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, paymentMethod } = cart

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  cart.qty = cart.cartItems.reduce((acc, item) => acc + item.qty, 0)
  cart.shippingPrice = Number(cart.itemsPrice > 100000 ? 0 : 500)
  cart.taxPrice = Number((0.18 * cart.itemsPrice).toFixed(2))
  cart.taxRounded = Number(
    (Math.ceil(cart.taxPrice) - cart.taxPrice).toFixed(2)
  )
  cart.totalPrice =
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice + cart.taxRounded

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  console.log(order)

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  },[history,success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        taxRounded: cart.taxRounded,
        totalPrice: cart.totalPrice,
      })
    )
    // orderItems,
    // shippingAddress,
    // paymentMethod,
    // itemsPrice,
    // taxPrice,
    // shippingPrice,
    // taxRounded,
    // totalPrice,
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <Card className='my-4'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <>
                  <h3>SHIPPING</h3>
                  <p>
                    <strong>Address:&nbsp;</strong>
                    {shippingAddress.address},{shippingAddress.city},
                    {shippingAddress.country},{shippingAddress.postalCode},
                  </p>
                </>
              </ListGroup.Item>

              <ListGroup.Item variant='flush'>
                <div>
                  <h3>PAYMENT METHOD</h3>
                  <p>Method:&nbsp;{paymentMethod}</p>
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                <div>
                  <h3>ORDER ITEMS</h3>
                  {cart.cartItems.length === 0 ? (
                    <Message>Your Cart is Empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {cart.cartItems.map((item, index) => {
                        return (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                ></Image>
                              </Col>

                              <Col>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col>
                                {item.qty}x <span>&#8377;</span>&nbsp;
                                {item.price}= <span>&#8377;</span>&nbsp;
                                {item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                  )}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Items in Cart : {cart.qty}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Note: shipping is free on orders above <span>&#8377;</span>
                    &nbsp;1,00,000
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='my-4'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  {' '}
                  <h3>ORDER SUMMARY</h3>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Cart value</Col>
                  <Col>
                    <span>&#8377;</span>&nbsp;{cart.itemsPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    <span>&#8377;</span>&nbsp;{cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax @18%</Col>
                  <Col>
                    <span>&#8377;</span>&nbsp;{cart.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Rounding off </Col>
                  <Col>
                    <span>&#8377;</span>&nbsp;{cart.taxRounded}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>
                    <span>&#8377;</span>&nbsp;{cart.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
            <Button
              type='button'
              variant='primary'
              className='btn btn-block'
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
