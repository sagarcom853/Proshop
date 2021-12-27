import React from 'react'
import { ListGroup, Col, Row, Card, Image } from 'react-bootstrap'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, payOrder } from '../actions/orderAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ORDER_PAY_RESET } from '../contants/orderConstants'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      console.log(clientId)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order, dispatch, orderId, successPay])

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )

    order.taxRounded = Number(
      (Math.ceil(order.taxPrice) - order.taxPrice).toFixed(2)
    )
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <div>
        {error && <Message variant='danger'>{error}</Message>}
        <Row>
          <Col md={8}>
            <Card className='my-4'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <>
                    <h3>
                      <strong>SHIPPING</strong>
                    </h3>
                    <p>
                      {' '}
                      <strong>Name:</strong> {order.user.name}
                    </p>
                    <p>
                      <strong>Email Id:</strong>{' '}
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}{' '}
                      </a>
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress.address},
                      {order.shippingAddress.city},
                      {order.shippingAddress.postalCode},
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <Message variant='success'>
                        Paid on {order.deliveredAt}
                      </Message>
                    ) : (
                      <Message variant='danger'>Not Delivered</Message>
                    )}
                  </>
                </ListGroup.Item>

                <ListGroup.Item variant='flush'>
                  <div>
                    <h3>PAYMENT METHOD</h3>
                    <p>Method:&nbsp;{order.paymentMethod}</p>
                    {order.isPaid ? (
                      <Message variant='success'>
                        Paid on {order.paidAt}
                      </Message>
                    ) : (
                      <Message variant='danger'>Not Paid</Message>
                    )}
                  </div>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div>
                    <h3>ORDER ITEMS</h3>
                    {order.orderItems.length === 0 ? (
                      <Message>Your Cart is Empty</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => {
                          return (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={2}>
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
                      <span>&#8377;</span>&nbsp;{order.itemsPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>
                      <span>&#8377;</span>&nbsp;{order.shippingPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax @18%</Col>
                    <Col>
                      <span>&#8377;</span>&nbsp;{order.taxPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Rounding off </Col>
                    <Col>
                      <span>&#8377;</span>&nbsp;{order.taxRounded}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price</Col>
                    <Col>
                      <span>&#8377;</span>&nbsp;{order.totalPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSucess={successPaymentHandler}
                      ></PayPalButton>
                    )}
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default OrderScreen
