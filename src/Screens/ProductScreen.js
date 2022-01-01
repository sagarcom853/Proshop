import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Form, Button } from 'react-bootstrap'
import Rating from '../Rating'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
import { listProductDetails } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails) //useselctor helps us to select items from state
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  return (
    <>
      <Link to='/'>
        {' '}
        <Button className='btn btn-dark py-1 my-3 '>Go back</Button>
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Image
              src={product.image}
              className='my-4'
              alt={product.name}
              fluid
            ></Image>
          </Col>
          <Col md={4}>
            <Card className='my-4'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color='red'
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price:
                  {''} <span>&#8377;</span>
                  &nbsp;
                  {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:{product.description}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='my-4'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>
                        <span>&#8377;</span>
                        &nbsp;
                        {product.price}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : ' Out of Stock '}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>qty</Col>
                    </Row>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    type='button'
                    className='btn btn-block py-1'
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
