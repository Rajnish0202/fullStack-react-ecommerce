import React from 'react';
import MetaData from '../layout/MetaData';
import './ProductList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = () => {
  const alert = useAlert();
  const { products, error, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.adminActions
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product Deleted Successfully.');
      navigate('/admin/dashboard');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <MetaData title='All Products - Admin' />
      <div className='dashboard'>
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className='productListContainer'>
            <h1 id='productListHeading'>All Products</h1>
            <div className='productListTable'>
              <div className='productRow'>
                <p>ProductId</p>
                <p>Name</p>
                <p className='productRight'>Stocks</p>
                <p className='productRight'>Price</p>
                <p className='productRight'>Action</p>
              </div>
              {products &&
                products.map((item) => (
                  <div className='productRowDetails' key={item._id}>
                    <p title={item._id}>{item._id}</p>
                    <p style={{ textTransform: 'capitalize' }}>{item.name}</p>
                    <p className='productRight'>{item.stock}</p>
                    <p className='productRight'>₹{item.price}</p>
                    <p className='productRight action'>
                      <Link to={`/admin/product/${item._id}`}>
                        <EditIcon />
                      </Link>
                      <Button onClick={() => deleteProductHandler(item._id)}>
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

export default ProductList;
