import React from 'react'
import { Card } from 'react-bootstrap'

import Rating from '../src/Rating'
import { Link } from 'react-router-dom'

const Product = (props) => {
  return (
    <div>
      <Card className='my-3 '>
        <Link to={`product/${props.product._id}`}>
          <Card.Img src={props.product.image}></Card.Img>
        </Link>
        <Card.Body>
          <Link className='name-anchor' to={`/product/${props.product._id}`}>
            <Card.Title as='div'>
              <strong>{props.product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Rating
              value={props.product.rating}
              text={`${props.product.numReviews} reviews`}
              color='blue'
            ></Rating>
          </Card.Text>
          <Card.Text as='h3'>
            <div>
              <i className='fas fa-rupee-sign'>{props.product.price}</i>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product
