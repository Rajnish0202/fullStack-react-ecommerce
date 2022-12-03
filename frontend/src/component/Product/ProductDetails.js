import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import ReviewCard from './ReviewCard.js';
import { useAlert } from 'react-alert';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);
  const alert = useAlert();

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: '#eb4034',
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className='productDetails'>
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((image, i) => (
                    <img src={image.url} alt={`${i} Slide`} className='CarouselImage' key={image.url} />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                <ReactStars {...options} />
                <span>
                  ({product.numOfReviews} {product.numOfReviews > 1 ? 'Reviews' : 'Review'})
                </span>
              </div>
              <div className='detailsBlock-3'>
                <h1>₹{product.price}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button>-</button>
                    <input type='number' value='1' />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{' '}
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
                  </b>
                </p>
              </div>
              <div className='detailsBlock-4'>
                Description : <p>{product.description}</p>
              </div>
              <button className='submitReview'>Submit Review</button>
            </div>
          </div>

          <h3 className='reviewsHeading'>REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className='noReviews'>No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
