import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormComponent from '../components/formComponent'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../contants/userConstant'

const UserEditScreen = ({ location, match, history }) => {
  const userId = match.params.id
  //   console.log(userId)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setisAdmin] = useState(false)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate
  //   console.log(user._Id)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setisAdmin(user.isAdmin)
    }
  }, [user, dispatch, successUpdate, history, userId])

  const submitHandler = (e) => {
    e.preventDefault()
    // console.log('submit Handler')
    let pattern = /^[A-z\s]+$/
    let sampleEmail = /^[A-z0-9]+.@[A-z]+.[A-z]+$/
    //Dispatch Register
    if (!pattern.test(name)) {
      setMessage(
        'name length should be more then 5 characters and only alphabets'
      )
    } else if (!sampleEmail.test(email)) {
      setMessage('please enter correct email ID')
    } else {
      // dispatch(userUpdate(name, email))
      dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }
  }

  return (
    <div>
      <Link to='/admin/userlist' className='btn btn-dark my-3 py-2'>
        Go Back
      </Link>
      <FormComponent>
        <h1 className='text-center '>Edit User Details</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : message ? (
          <Message variant='danger'>{message}</Message>
        ) : (
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

            <Form.Group controlId='isAdmin'>
              {/* <Form.Check
                type='checkbox'
                label='is Admin?'
                id='isAdmin'
                name='isAdmin'
                value={isAdmin}
                onChange={() =>
                  isAdmin === false ? setisAdmin(true) : setisAdmin(false)
                }
              ></Form.Check> */}
              <Form.Check
                type='checkbox'
                label='Is Admin?'
                checked={isAdmin}
                onChange={(e) => setisAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            {/* {console.log(isAdmin)} */}
            <Button type='submit' variant='dark' className='py-2 my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormComponent>
    </div>
  )
}
export default UserEditScreen
