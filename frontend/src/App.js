import axios from 'axios';
import './App.css';
import Header from './component/layout/Header/Header.js';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store/store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Profile from './component/User/Profile.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import Dashboard from './component/Admin/Dashboard.js';
import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import OrderList from './component/Admin/OrderList.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import NotFound from './component/layout/Not Found/NotFound';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products/' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />

        <Route
          path='/account'
          element={
            isAuthenticated === true ? <Profile /> : <Navigate to='/login' />
          }
        />

        <Route
          path='/me/update'
          element={
            isAuthenticated === true ? (
              <UpdateProfile />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route
          path='/password/update'
          element={
            isAuthenticated === true ? (
              <UpdatePassword />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />

        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/cart' element={<Cart />} />

        <Route
          path='/shipping'
          element={
            isAuthenticated === true ? <Shipping /> : <Navigate to='/login' />
          }
        />

        <Route
          path='/order/confirm'
          element={
            isAuthenticated === true ? (
              <ConfirmOrder />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        {stripeApiKey && (
          <Route
            path='/process/payment'
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                {isAuthenticated === true ? <Payment /> : <LoginSignUp />}
              </Elements>
            }
          />
        )}

        <Route
          path='/success'
          element={
            isAuthenticated === true ? (
              <OrderSuccess />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route
          path='/orders'
          element={
            isAuthenticated === true ? <MyOrders /> : <Navigate to='/login' />
          }
        />

        <Route
          path='/order/:id'
          element={
            isAuthenticated === true ? (
              <OrderDetails />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route
          path='/admin/dashboard'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <Dashboard />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/products'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <ProductList />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/product'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <NewProduct />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/product/:id'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <UpdateProduct />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/orders'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <OrderList />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/order/:id'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <ProcessOrder />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/users'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <UsersList />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/user/:id'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <UpdateUser />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/reviews'
          element={
            isAuthenticated === true && user.role === 'admin' ? (
              <ProductReviews />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
