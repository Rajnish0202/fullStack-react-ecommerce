import './ForgotPassword.css';
import Loader from '../layout/Loader/Loader';
import { MdMailOutline } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const alert = useAlert();

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('email', email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Forgot Password`} />
          <div className='forgotPasswordContainer'>
            <div className='forgotPasswordBox'>
              <h2 className='forgotPasswordHeading'>Forgot Password</h2>
              <form
                className='forgotPasswordForm'
                onSubmit={forgotPasswordSubmit}
              >
                <div className='forgotPasswordEmail'>
                  <MdMailOutline />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  value='Send'
                  className='forgotPasswordBtn'
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
