import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderAction'
import { PRODUCT_CREATE_RESET } from '../contants/productConstant'

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listOrders())
    }
  }, [history, dispatch, userInfo])
  //   console.log(users)

  return (
    <>
      <h1 className='text-center py-3'>ORDERS</h1>

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
              <td>DATE</td>
              <td>TOTAL</td>
              <td>PAID</td>
              <td>DELIVERED</td>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {' '}
                    {order.isDelivered ? (
                      order.deliveredAt
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                  {/* <td>{order.name}</td>
                  <td>{order.price}</td>
                  <td>{order.category}</td>
                  <td>{product.brand}</td> */}
                  <td></td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
