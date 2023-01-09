import { Rating } from '@material-ui/lab';

import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const options = {
    activeColor: '#eb4034',
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
    size: 'small',
  };

  return (
    <Link to={`/product/${product._id}`} className='productCard'>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{' '}
        <span className='productCardSpan'>
          ({product.numOfReviews}{' '}
          {product.numOfReviews > 1 ? 'Reviews' : 'Review'})
        </span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
};

export default Product;
