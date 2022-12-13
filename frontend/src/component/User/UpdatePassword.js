import './UpdatePassword.css';
import Loader from '../layout/Loader/Loader';
import { MdLock, MdLockOpen, MdVpnKey } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const alert = useAlert();
  const navigate = useNavigate();

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('oldPassword', oldPassword);
    myForm.set('confirmPassword', confirmPassword);
    myForm.set('newPassword', newPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Password Updated Successfully');
      navigate('/account');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Update Password`} />
          <div className='updatePasswordContainer'>
            <div className='updatePasswordBox'>
              <h2 className='updatePasswordHeading'>Update Password</h2>
              <form
                className='updatePasswordForm'
                onSubmit={updatePasswordSubmit}
              >
                <div className='updatePassword'>
                  <MdVpnKey />
                  <input
                    type='password'
                    placeholder='Old Password'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className='updatePassword'>
                  <MdLockOpen />
                  <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className='updatePassword'>
                  <MdLock />
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  value='Change Password'
                  className='updatePasswordBtn'
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
