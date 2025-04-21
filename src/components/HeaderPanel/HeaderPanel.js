import React from 'react';
import './HeaderPanel.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { enableZoneLoginPanel } from '../../redux/AppUIStateReducer';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const HeaderPanel = ({ onLogout }) => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(enableZoneLoginPanel());
    onLogout(); // triggers setIsLoggedIn(false) in App.js
  };

  return (
    <header className="header-panel">
      <div className="header-left">
        <MenuBookIcon className="header-icon" />
        <span className="header-title">| Design Portfolio</span>
      </div>
      <nav className="header-nav">
        <a href="#home" className="nav-item">HOME</a>
        <a href="#about" className="nav-item">ABOUT</a>
        <a href="#services" className="nav-item">SERVICES</a>
        <a href="#contact" className="nav-item">CONTACT US</a>
        <LogoutIcon className="logout-icon" onClick={handleLogoutClick} />
      </nav>
    </header>
  );
};

export default HeaderPanel;
