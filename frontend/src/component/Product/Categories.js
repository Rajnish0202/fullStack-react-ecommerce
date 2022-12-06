import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductCategory } from '../../actions/productAction';

const Categories = ({ setCategory }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.productCategories);

  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);

  return (
    <ul className='categoryBox'>
      {categories.map((item) => {
        return (
          <li key={item} className='category-link' onClick={() => setCategory(item)}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
