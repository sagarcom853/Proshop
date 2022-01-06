import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import HomeScreen from './Screens/HomeScreen.js'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/loginScreen'
import RegisterScreen from './Screens/registerScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentMethodScreen from './Screens/PaymentMethodScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import UserlistScreen from './Screens/userListScreen'
import UserEditScreen from './Screens/userEditScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import OrderListScreen from './Screens/OrderListScreen'
import NotLoggedScreen from './Screens/NotLoggedScreen'
import { Container } from 'react-bootstrap'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <main>
          <Container>
            <Route path='/login' component={LoginScreen} />
            <Route path='/nologin' component={NotLoggedScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentMethodScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/userlist/' component={UserlistScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/productlist/' component={ProductListScreen} />
            <Route path='/admin/orderlist/' component={OrderListScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route exact path='/' component={HomeScreen} />
          </Container>

          <Footer />
        </main>
      </Router>
    )
  }
}

export default App
