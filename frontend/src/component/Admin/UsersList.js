import React from 'react';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UsersList = () => {
  const alert = useAlert();
  const { users, error, loading } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
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
      alert.success(message);
      navigate('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <MetaData title='All Users - Admin' />
      <div className='dashboard'>
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className='productListContainer'>
            <h1 id='productListHeading'>All Users</h1>
            <div className='productListTable'>
              <div className='productRow'>
                <p>UserId</p>
                <p>Name</p>
                <p>Email</p>
                <p className='productRight'>Role</p>
                <p className='productRight'>Action</p>
              </div>
              {users &&
                users.user.map((item) => (
                  <div className='productRowDetails' key={item._id}>
                    <p title={item._id}>{item._id}</p>
                    <p style={{ textTransform: 'capitalize' }}>{item.name}</p>
                    <p>{item.email}</p>
                    <p
                      className={
                        item.role === 'admin'
                          ? `${'productRight'} ${'greenColor'}`
                          : `${'productRight'} ${'redColor'}`
                      }
                      style={{ textTransform: 'capitalize' }}
                    >
                      {item.role}
                    </p>
                    <p className='productRight action'>
                      <Link to={`/admin/user/${item._id}`}>
                        <EditIcon />
                      </Link>
                      <Button onClick={() => deleteUserHandler(item._id)}>
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

export default UsersList;
