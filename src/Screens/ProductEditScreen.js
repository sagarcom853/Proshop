import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormComponent from '../components/formComponent'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_UPDATE_RESET } from '../contants/productConstant'
import { listProductDetails, updateProduct } from '../actions/productAction'

const ProductEditScreen = ({ location, match, history }) => {
  const productId = match.params.id
  console.log(productId)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate
  console.log(productDetails)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    )
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [dispatch, productId, product, history, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    console.log(file)

    const formData = new FormData()

    formData.append('image', file)

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      console.log(data)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <div>
      <Link to='/admin/productlist' className='btn btn-dark my-3 py-2'>
        Go Back
      </Link>
      <FormComponent>
        <h1 className='text-center '>Edit Product Details</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='py-2'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='py-2'>
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Product Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='py-2'>
              <Form.Label>Product Image </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose file'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand' className='py-2'>
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Product Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='py-2'>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Product Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='py-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Product Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='py-2'>
              <Form.Label>Count InStock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Product Count'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='dark' className='py-2 my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormComponent>
    </div>
  )
}
export default ProductEditScreen
