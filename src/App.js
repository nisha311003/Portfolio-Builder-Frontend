import React, { useState, useEffect } from 'react';
import LoginForm from './components/Login/LoginForm';
import image1 from './components/Assessts/image1.jpeg';
import image2 from './components/Assessts/image2.jpeg';
import image3 from './components/Assessts/image3.jpeg';
import image4 from './components/Assessts/image4.jpeg';
import './App.css';
import RedirectLogicPage from './components/RedirectLogicPage/RedirectLogicPage';
import HeaderPanel from './components/HeaderPanel/HeaderPanel';

const backgroundImages = [
  image1,
  image2,
  image3,
  image4,
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log('User logged in');
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User logged out');
  };
  //Background image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000); // change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {!isLoggedIn ? (
        <RedirectLogicPage onLogin={handleLogin} />
      ) : (
        <>
        
        <div
          className="app-container"
          style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
        >
          <HeaderPanel onLogout={handleLogout} />
          <div className="horizontal-divider"></div>
          <div className="main-container">
            <RedirectLogicPage/>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default App;
