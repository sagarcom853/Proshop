import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// import FormComponent from '../components/formComponent'
// import { register } from '../actions/userAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, UserUpdateProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderAction'
import { USER_UPDATE_PROFILE_RESET } from '../contants/userConstant'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails // whatever is there in reducer
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderMyList = useSelector((state) => state.orderMyList)
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders: orderP,
  } = orderMyList
  // console.log(orderP)

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, user, dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('passwords don not match')
    } else {
      // Dispatch update profile
      dispatch(UserUpdateProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <div>
      <Row>
        <Col md={3}>
          <h2 className='py-3'>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label> Email Address </Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label> Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label> Confirm Password</Form.Label>
              <Form.Control
                type='confirmPassword'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Button type='submit' variant='dark'>
              Update
            </Button>
          </form>
        </Col>
        <Col md={9}>
          <h2 className='mx-3 py-3'>MY ORDERS</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders} </Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderP &&
                  orderP.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>

                      <td>{order.totalPrice}</td>

                      <td>
                        {order.isPaid ? (
                          order.paidAt
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.DeliveredAt
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  )
}
export default ProfileScreen
