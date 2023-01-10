import './productReviews.css';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import Loader from '../layout/Loader/Loader';
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from '../../actions/productAction';
import { useNavigate } from 'react-router-dom';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import Star from '@material-ui/icons/Star';

const ProductReviews = () => {
  const [productId, setProductId] = useState('');
  const alert = useAlert();

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Review Deleted Successfully.');
      navigate('/admin/reviews');
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    // dispatch(getAllReviews());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const deleteReviewsHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  return (
    <>
      <MetaData title='All Reviews - Admin' />
      <div className='dashboard'>
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className='productReviewsContainer'>
            <form
              className='productReviewsForm'
              onSubmit={productReviewsSubmitHandler}
            >
              <h1 className='productReviewsFormHeading'>All Reviews</h1>
              <div>
                <Star />
                <input
                  type='text'
                  placeholder='Product Id'
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
              <Button
                id='createProductBtn'
                type='submit'
                disabled={
                  loading ? true : false || productId === '' ? true : false
                }
              >
                Search
              </Button>
            </form>

            {reviews && reviews.length > 0 ? (
              <div className='productListTable'>
                <div className='productRow'>
                  <p>ReviewId</p>
                  <p>User</p>
                  <p>Comment</p>
                  <p className='productRight'>Ratings</p>
                  <p className='productRight'>Action</p>
                </div>
                {reviews &&
                  reviews.map((item) => (
                    <div className='productRowDetails' key={item._id}>
                      <p title={item._id}>{item._id}</p>
                      <p style={{ textTransform: 'capitalize' }}>{item.name}</p>
                      <p>{item.comment}</p>
                      <p
                        className={
                          item.rating >= 3
                            ? `${'productRight'} ${'greenColor'}`
                            : `${'productRight'} ${'redColor'}`
                        }
                        style={{ textTransform: 'capitalize' }}
                      >
                        {item.rating}
                      </p>
                      <p className='productRight action'>
                        <Button onClick={() => deleteReviewsHandler(item._id)}>
                          <DeleteIcon />
                        </Button>
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <h1 className='productReviewsFormHeading'>No Reviews Found</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReviews;
