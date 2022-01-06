import React from 'react'
// import { useEffect } from 'react'

// import { NavDropdown, LinkContainer } from 'react-router-bootstrap'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Navbar, Nav, Container } from 'react-bootstrap'
// import { USER_LOGOUT } from './contants/userConstant'
import { logout } from './actions/userAction'

const Navbar1 = ({ history }) => {
  console.log(history)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  // const user = useSelector((state) => state.userDetails.user)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Proshop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {/* <Nav.Link href='/cart'>
                {' '}
                <i className='fas fa-shopping-cart'></i>Cart
              </Nav.Link> */}
              {userInfo ? (
                <Dropdown>
                  <Dropdown.Toggle variant='dark' bg='dark' id='adminmenu'>
                    {userInfo.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href='/profile'>
                      <i className='fas fa-user-circle'></i> Profile
                    </Dropdown.Item>

                    <Dropdown.Item href='/cart'>
                      <i className='fas fa-shopping-cart'></i>&nbsp;Cart
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                    <i className='fas fa-sign-out-alt'></i> logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Nav.Link href='/login'>
                    {' '}
                    <i className='fas fa-user'></i> Login
                  </Nav.Link>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <Dropdown>
                  <Dropdown.Toggle variant='dark' bg='dark' id='adminmenu'>
                    Admin features
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href='/admin/userlist'><i className='fa fa-users'></i> Users</Dropdown.Item>
                    <Dropdown.Item href='/admin/productlist'>
                      Products
                    </Dropdown.Item>
                    <Dropdown.Item href='/admin/orderlist'>
                      Orders
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
export default Navbar1

// import React from 'react'
// // import { useEffect } from 'react'

// // import { NavDropdown, LinkContainer } from 'react-router-bootstrap'
// import { Redirect } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { Dropdown, Navbar, Nav, Container } from 'react-bootstrap'
// // import { USER_LOGOUT } from './contants/userConstant'
// import { logout } from './actions/userAction'

// const Navbar1 = ({ history }) => {
//   console.log(history)
//   const dispatch = useDispatch()
//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin
//   // const user = useSelector((state) => state.userDetails.user)


//   const logoutHandler = () => {
//     dispatch(logout())
//   }

//   return (
//     <div>
//       <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
//         <Container>
//           <Navbar.Brand href='/'>Proshop</Navbar.Brand>
//           <Navbar.Toggle aria-controls='basic-navbar-nav' />
//           <Navbar.Collapse id='basic-navbar-nav'>
//             <Nav className='ml-auto'>
//               {/* <Nav.Link href='/cart'>
//                 {' '}
//                 <i className='fas fa-shopping-cart'></i>Cart
//               </Nav.Link> */}
//               {userInfo ? (
//                 <Dropdown>
//                   <Dropdown.Toggle variant='dark' bg='dark' id='adminmenu'>
//                     {userInfo.name}
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     <Dropdown.Item href='/profile'>Profile</Dropdown.Item>
//                     <Dropdown.Item onClick={logoutHandler}>
//                       logout
//                     </Dropdown.Item>
//                     <Dropdown.Item href='/cart'>
//                       <i className='fas fa-shopping-cart'></i>&nbsp;Cart
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               ) : (
//                 <>
//                   <Nav.Link href='/login'>
//                     {' '}
//                     <i className='fas fa-user'></i> Login
//                   </Nav.Link>
//                 </>
//               )}

//               {userInfo && userInfo.isAdmin && (
//                 <Dropdown>
//                   <Dropdown.Toggle variant='dark' bg='dark' id='adminmenu'>
//                     Admin features
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     <Dropdown.Item href='/admin/userlist'>Users</Dropdown.Item>
//                     <Dropdown.Item href='/admin/productlist'>
//                       Products
//                     </Dropdown.Item>
//                     <Dropdown.Item href='/admin/orderlist'>
//                       Orders
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </div>
//   )
// }
// export default Navbar1

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
