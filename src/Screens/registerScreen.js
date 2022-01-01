import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormComponent from '../components/formComponent'
import { register } from '../actions/userAction'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  // console.log(loading, error, userInfo, message)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log('submit Handler')
    let pattern = /^[A-z\s]+$/
    let sampleEmail = /^[A-z0-9]+.@[A-z]+.[A-z]+$/
    //Dispatch Register
    if (password !== confirmPassword) {
      setMessage('passwords do not match')
    } else if (!pattern.test(name)) {
      setMessage(
        'name length should be more then 5 characters and only alphabets'
      )
    } else if (!sampleEmail.test(email)) {
      setMessage('please enter correct email ID')
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <div>
      <FormComponent>
        <h1 className='text-center py-3'>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='py-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Set your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='py-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Set your Mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password' className='py-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Set your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword' className='py-2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='confirmPassword'
              placeholder='Confirm your Password'
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />

          <Button type='submit' variant='dark'>
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Already Registered?
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormComponent>
    </div>
  )
}
export default RegisterScreen
