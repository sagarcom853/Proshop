import React from 'react'
import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux' //hooks instead of connect
import { listProducts } from '../actions/productAction'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList) //useselctor helps us to select items from state
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts()) //makws request to the back end
  }, [dispatch])

  return (
    <div>
      <h1 className="App py-3">Welcome to Proshop</h1>
      <h3>Latest Products</h3>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={8} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomeScreen
