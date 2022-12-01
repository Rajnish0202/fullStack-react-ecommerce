import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer'>
      <div className='leftFooter'>
        <h4>Download Our APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt='playstore' />
        <img src={appStore} alt='appstore' />
      </div>
      <div className='midFooter'>
        <h1>React-Online.</h1>
        <p>High Quality is our first priority.</p>

        <p>Copyrights 2022 &copy; RajnishKumar</p>
      </div>
      <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href='https://github.com/Rajnish0202'>GitHub</a>
        <a href='https://www.instagram.com/rajnish.raichu92'>Instagram</a>
        <a href='https://www.facebook.com/rajnish.kumar.169067'>Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
