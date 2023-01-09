import './NewProduct.css';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Button } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PersonIcon from '@material-ui/icons/Person';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setRole(user.role);
      setEmail(user.email);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User Updated Successfully.');
      navigate('/admin/users');
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate, updateError, id, user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('role', role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <>
      <MetaData title='Create Product - Admin' />
      <div className='dashboard'>
        <Sidebar />
        <div className='newProductContainer'>
          {loading ? (
            <Loader />
          ) : (
            <form
              className='createProductForm'
              encType='multipart/form-data'
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>
              <div>
                <PersonIcon />
                <input
                  type='text'
                  placeholder='User Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value=''>Choose Role</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </div>

              <Button
                id='createProductBtn'
                type='submit'
                disabled={
                  updateLoading ? true : false || role === '' ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
