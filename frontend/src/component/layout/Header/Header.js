import React from 'react';
import { ReactNavbar } from 'overlay-navbar';
import logo from '../../../images/logo.png';
import { MdAccountBox } from 'react-icons/md';
import { HiSearch } from 'react-icons/hi';
import { FiShoppingBag } from 'react-icons/fi';

const Header = () => {
  return (
    <ReactNavbar
      burgerColor='#eb4034'
      burgerColorHover='#a62d24'
      logo={logo}
      logoWidth='20vmax'
      navColor1='#fff'
      logoHoverColor='#eb4034'
      logoHoverSize='10px'
      link1Text='Home'
      link2Text='Products'
      link3Text='Contact'
      link4Text='About'
      link1Url='/'
      link2Url='/products'
      link3Url='/contact'
      link4Url='/about'
      link1Size='1.2vmax'
      link1Color='rgba(35,35,35,0.8)'
      nav1justifyContent='flex-end'
      nav2justifyContent='flex-end'
      nav3justifyContent='flex-start'
      nav4justifyContent='flex-start'
      link1ColorHover='#eb4034'
      link2ColorHover='#eb4034'
      link3ColorHover='#eb4034'
      link4ColorHover='#eb4034'
      link1Margin='1vmax'
      profileIconUrl='/login'
      profileIconColor='rgba(35,35,35,0.8)'
      searchIconColor='rgba(35,35,35,0.8)'
      cartIconColor='rgba(35,35,35,0.8)'
      profileIconColorHover='#eb4034'
      searchIconColorHover='#eb4034'
      cartIconColorHover='#eb4034'
      cartIconMargin='1vmax'
      profileIcon={true}
      ProfileIconElement={MdAccountBox}
      searchIcon={true}
      SearchIconElement={HiSearch}
      cartIcon={true}
      CartIconElement={FiShoppingBag}
    />
  );
};

export default Header;
