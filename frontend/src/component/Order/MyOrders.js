import './MyOrders.css';
// import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import LaunchIcon from '@material-ui/icons/Launch';
import { useEffect } from 'react';

const MyOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const { alert } = useAlert();
  // const columns = [
  //   { field: 'Id', headerName: 'Order ID', minWidth: 300, flex: 1 },
  //   {
  //     field: 'status',
  //     headerName: 'Status',
  //     minWidth: 150,
  //     flex: 0.5,
  //   },
  //   {
  //     field: 'itemsQty',
  //     headerName: 'Items Qty',
  //     type: 'number',
  //     minWidth: 150,
  //     flex: 0.3,
  //   },
  //   {
  //     field: 'amount',
  //     headerName: 'Amount',
  //     type: 'number',
  //     minWidth: 270,
  //     flex: 0.5,
  //   },
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     flex: 0.3,
  //     minWidth: 150,
  //     type: 'number',
  //     sortable: false,
  //     renderCell: (params) => {
  //       return <Link to={`/order/${params.getValue}`}></Link>;
  //     },
  //   },
  // ];
  // const rows = [];

  // orders &&
  //   orders.forEach((item, index) => {
  //     rows.push({
  //       itemsQty: item.orderItems.length,
  //       id: item._id,
  //       status: item.orderStatus,
  //       amount: item.totalPrice,
  //     });
  //   });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [error, alert, dispatch]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className='myOrdersPage'>
          <div className='dataTable'>
            <div className='dataRow'>
              <p>OrderId</p>
              <p>Status</p>
              <p className='dataRight'>Item Qty</p>
              <p className='dataRight'>Amount</p>
              <p className='dataRight'>Action</p>
            </div>
            {orders &&
              orders.map((item) => (
                <div className='dataDetails' key={item._id}>
                  <p title={item._id}>{item._id}</p>
                  <p
                    className={
                      item.orderStatus === 'Processing'
                        ? 'redColor'
                        : 'greenColor'
                    }
                  >
                    {item.orderStatus}
                  </p>
                  <p className='dataRight'>{item.orderItems.length}</p>
                  <p className='dataRight'>₹{item.totalPrice}</p>
                  <p className='dataRight'>
                    <Link to={`/order/${item._id}`}>
                      <LaunchIcon />
                    </Link>
                  </p>
                </div>
              ))}
          </div>
          <Typography id='myOrdersHeading'>{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
