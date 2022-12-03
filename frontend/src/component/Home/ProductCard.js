import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: '#eb4034',
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link to={`/product/${product._id}`} className='productCard'>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{' '}
        <span>
          ({product.numOfReviews} {product.numOfReviews > 1 ? 'Reviews' : 'Review'})
        </span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
};

export default Product;
