import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormComponent from '../components/formComponent'
import { register } from '../actions/userAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, UserUpdateProfile } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../contants/userConstant'

const ProfileScreen = (props, { history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails // whatever is there in reducer
  const userLogin = useSelector((state) => state.userLogin)
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const { userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, user,dispatch,success])

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
        </Col>
      </Row>
    </div>
  )
}
export default ProfileScreen
