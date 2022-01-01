import React from 'react'
import { ListGroup, Col, Row, Card, Image, Button } from 'react-bootstrap'
// import axios from 'axios'
// import { PayPalButton } from 'react-paypal-button-v2'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getOrderDetails,
  // payOrder,
  payOrderByCash,
  payOrderByGpay,
} from '../actions/orderAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  ORDER_PAY_RESET,
  // ORDER_DELIVER_RESET,
  ORDER_PAY_RESET_CASH,
} from '../contants/orderConstants'
import GooglePayButton from '@google-pay/button-react'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  // console.log(loadingPay, successPay)

  // const orderPayByCash = useSelector((state) => state.orderPayByCash)
  // const { loading: loadingP, success: successP } = orderPayByCash
  // console.log(loadingP, successP)

  // const orderPayByGpay = useSelector((state) => state.orderPayByGpay)
  // const { loading: loadingPa, success: successPa } = orderPayByGpay
  // console.log(loadingPa, successPa)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const orderDeliver = useSelector((state) => state.orderDeliver)
  // const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  useEffect(() => {
    // const addPayPalScript = async () => {
    //   const { data: clientId } = await axios.get('/api/config/paypal')
    //   const script = document.createElement('script')
    //   script.type = 'text/javascript'
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //   script.async = true
    //   script.onload = () => {
    //     setSdkReady(true)
    //   }
    //   document.body.appendChild(script)
    // }

    const addGoogleScript = async () => {
      // const google = window.google
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://pay.google.com/gp/p/js/pay.js`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      // const paymentsClient = new google.payments.api.PaymentsClient({
      //   environment: 'TEST',
      // })

      document.body.appendChild(script)
    }

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_PAY_RESET_CASH })
      // dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.google) {
        // addPayPalScript()
        addGoogleScript()
      } else {
        setSdkReady(false)
      }
    }
  }, [dispatch, orderId, order, successPay])

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )

    order.taxRounded = Number(
      (Math.ceil(order.taxPrice) - order.taxPrice).toFixed(2)
    )
  }

  // const successPaymentHandler = (paymentResult) => {
  //   // console.log('hielloe')
  //   // console.log(paymentResult)
  //   dispatch(payOrder(orderId, paymentResult))
  // }

  const handlePaymentByGpay = (paymentResult) => {
    // console.log(paymentResult)
    dispatch(payOrderByGpay(orderId, paymentResult))
  }
  const handleCashRequest = () => {
    // console.log('order', order)

    var today = new Date()
    var date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    var tim = date + ',' + time
    // console.log('userInfo',userInfo)
    const paymentResult = {
      id: orderId,
      status: 'paid',
      update_time: tim,
      email: userInfo.email,
    }
    // console.log('Cash')
    // console.log(paymentResult)
    dispatch(payOrderByCash(orderId, paymentResult))
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1 className='py-3'>Order {order._id}</h1>
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
                      <strong>Name:</strong> {userInfo.name}
                    </p>
                    <p>
                      <strong>Email Id:</strong>{' '}
                      <a href={`mailto:${userInfo.email}`}>{userInfo.email} </a>
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
                      <span>
                        {/* <PayPalButton
                          amount={order.totalPrice}
                          intent='order'
                          onSucess={successPaymentHandler}
                        ></PayPalButton> */}
                        <ListGroup.Item>
                          <Button
                            type='button'
                            variant='primary'
                            className='py-2'
                            onClick={handleCashRequest}
                          >
                            Pay by cash <span>&#8377;</span>&nbsp;
                            {order.totalPrice}
                          </Button>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <GooglePayButton
                            environment='TEST'
                            paymentRequest={{
                              apiVersion: 2,
                              apiVersionMinor: 0,
                              allowedPaymentMethods: [
                                {
                                  type: 'CARD',
                                  parameters: {
                                    allowedAuthMethods: [
                                      'PAN_ONLY',
                                      'CRYPTOGRAM_3DS',
                                    ],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                  },
                                  tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                      gateway: 'example',
                                      gatewayMerchantId:
                                        'exampleGatewayMerchantId',
                                    },
                                  },
                                },
                              ],
                              merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo Merchant',
                              },
                              transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: String(order.totalPrice),
                                currencyCode: 'INR',
                                countryCode: 'IN',
                              },
                              shippingAddressRequired: true,
                              callbackIntents: ['PAYMENT_AUTHORIZATION'],
                            }}
                            onLoadPaymentData={(paymentRequest) => {
                              // console.log('success', paymentRequest)
                            }}
                            onPaymentDataChange={(paymentData) => {
                              // console.log(
                              //   'on payment data changed',
                              //   paymentData
                              // )
                              return {}
                            }}
                            onPaymentAuthorized={(paymentData) => {
                              // console.log(
                              //   'payment Authorized success',
                              //   paymentData
                              // )
                              handlePaymentByGpay(paymentData)

                              return { transactionState: ' SUCCESS' }
                            }}
                            existingPaymentMethodRequired='false'
                            buttonColor='black'
                            buttonType='pay'
                            buttonSizeMode='static'

                          />
                        </ListGroup.Item>
                      </span>
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
