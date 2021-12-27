import React, { Link } from 'react'
import { useEffect } from 'react'
import { NavDropdown, LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { USER_LOGOUT } from './contants/userConstant'
import { logout } from './actions/userAction'

const Navbar1 = (props) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const user = useSelector((state) => state.userDetails.user)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Navbar bg='black' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Proshop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                {' '}
                <i className='fas fa-shopping-cart'></i>Cart
              </Nav.Link>
              {userInfo ? (
                <>
                  <Nav.Link href='/profile'>{userInfo.name}'s Profile</Nav.Link>
                  <Nav.Link href='/payment'>PAY</Nav.Link>

                  <Nav.Link onClick={logoutHandler}>logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href='/login'>
                    {' '}
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>

                  <Nav.Link href='/register'>
                    {' '}
                    <i className='fas fa-user'></i> Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
export default Navbar1

{
  /* <Navbar bg='black' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='#cart'>
                <i className='fas fa-shopping-cart'></i>Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>{' '}
                  <NavDropdown.Item onClick={logoutHandler}>
                    logout{' '}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
              
                  <Nav.Link href="/login">
                    <i className='fas fa-user'></i>SignIn
                  </Nav.Link>
               
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
              </Navbar> */
}
