import './ResetPassword.css';
import Loader from '../layout/Loader/Loader';
import { MdLock, MdLockOpen } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const alert = useAlert();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('password', password);
    myForm.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password Reset Successfully');
      navigate('/login');
    }
  }, [dispatch, alert, error, success, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Reset Password`} />
          <div className='resetPasswordContainer'>
            <div className='resetPasswordBox'>
              <h2 className='resetPasswordHeading'>Reset Password</h2>
              <form
                className='resetPasswordForm'
                onSubmit={resetPasswordSubmit}
              >
                <div className='resetPassword'>
                  <MdLockOpen />
                  <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='resetPassword'>
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
                  value='Reset Password'
                  className='resetPasswordBtn'
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
