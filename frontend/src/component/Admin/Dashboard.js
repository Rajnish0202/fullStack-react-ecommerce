import React, { useEffect } from 'react';
import Sidebar from './Sidebar.js';
import MetaData from '../layout/MetaData';
import './Dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip,
  ArcElement,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction.js';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip,
  ArcElement
);

const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders && orders.forEach((item) => (totalAmount += item.totalPrice));

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['#eb4034'],
        hoverBackgroundColor: ['rgb(197,72,49)'],
        data: [0, totalAmount],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00a6b4', '#6800b4'],
        hoverBackgroundColor: ['#4B5000', '#35014f'],
        data: [outOfStock, products.length - outOfStock],
        hoverOffset: 10,
        padding: 5,
      },
    ],
  };

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <MetaData title='Admin Panel' />
      <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer'>
          <Typography component='h1'>Dashboard</Typography>
          <div className='dashboardSummary'>
            <div>
              <p>
                Total Amount <br />₹{totalAmount}
              </p>
            </div>
            <div className='dashboardSummaryBox2'>
              <Link to='/admin/products'>
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to='/admin/orders'>
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to='/admin/users'>
                <p>Users</p>
                <p>{users && users.userCount}</p>
              </Link>
            </div>
          </div>
          <div className='lineChart'>
            <Line data={lineState} />
          </div>
          <div className='doughnutChart'>
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
