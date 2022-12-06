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
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Categories from './Categories';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();
  const { products, productsCount, resultPerPage, filteredProductsCount, loading, error } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);

  // let count = filteredProductsCount;

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

          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <Categories setCategory={setCategory} />

            <fieldset>
              <Typography component='legend'>Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby='continuous-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < productsCount && (
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
          )}
        </>
      )}
    </>
  );
};

export default Products;
