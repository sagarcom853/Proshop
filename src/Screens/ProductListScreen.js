import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../contants/productConstant'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  console.log(productCreate)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }


  useEffect(() => {
    console.log(createdProduct)
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    else if(successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct
  ])
  //   console.log(users)

  return (
    <>
      <Row className='my-3 align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorCreate}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table bordered striped responsive hover className='table-sm'>
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>PRICE</td>
              <td>CATEGORY</td>
              <td>BRAND</td>
              <td>EDIT/DELETE</td>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='info' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
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
  )
}

export default ProductListScreen
