import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import MetaData from '../layout/MetaData';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { products, productsCount, resultPerPage, loading, error } = useSelector((state) => state.products);
  const alert = useAlert();
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='PRODUCTS -- ECOMMERCE' />
          <h2 className='productHeading'>Products</h2>
          <div className='products'>
            {products && products.map((product) => <ProductCard product={product} key={product._id} />)}
          </div>
          <div className='paginationBox'>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText='Next'
              prevPageText='Prev'
              firstPageText='1st'
              lastPageText='Last'
              itemClass='page-item'
              linkClass='page-link'
              activeClass='pageItemActive'
              activeLinkClass='pageLinkActive'
            />
          </div>
        </>
      )}
    </>
  );
};

export default Products;
