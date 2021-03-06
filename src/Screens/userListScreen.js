import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userAction'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [successDelete, dispatch, history,userInfo])
//   console.log(users)
  return (
    <div>
      <>
        <h1 className='text-center py-3'>Users</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='info' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash' variant='danger'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </>
    </div>
  )
}

export default UserListScreen
