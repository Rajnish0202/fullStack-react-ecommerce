import React from 'react';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import { DELETE_ORDERS_RESET } from '../../constants/orderConstants';
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from '../../actions/orderAction';

const OrderList = () => {
  const alert = useAlert();
  const { orders, error, loading } = useSelector((state) => state.allOrders);
  const { error: orderError, isDeleted } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (orderError) {
      alert.error(orderError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Order Deleted Successfully.');
      navigate('/admin/orders');
      dispatch({ type: DELETE_ORDERS_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, orderError, isDeleted, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <>
      <MetaData title='All Orders - Admin' />
      <div className='dashboard'>
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className='productListContainer'>
            <h1 id='productListHeading'>All Orders</h1>
            <div className='productListTable'>
              <div className='productRow'>
                <p>OrderId</p>
                <p>Status</p>
                <p className='productRight'>ItemsQty</p>
                <p className='productRight'>Amount</p>
                <p className='productRight'>Action</p>
              </div>
              {orders &&
                orders.map((item) => (
                  <div className='productRowDetails' key={item._id}>
                    <p title={item._id}>{item._id}</p>
                    <p
                      style={{ textTransform: 'capitalize' }}
                      className={
                        item.orderStatus === 'Delivered'
                          ? 'greenColor'
                          : 'redColor'
                      }
                    >
                      {item.orderStatus}
                    </p>
                    <p className='productRight'>{item.orderItems.length}</p>
                    <p className='productRight'>₹{item.totalPrice}</p>
                    <p className='productRight action'>
                      <Link to={`/admin/order/${item._id}`}>
                        <EditIcon />
                      </Link>
                      <Button onClick={() => deleteOrderHandler(item._id)}>
                        <DeleteIcon />
                      </Button>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderList;
