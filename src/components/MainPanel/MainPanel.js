import React from 'react';
import { useDispatch } from 'react-redux';
import './MainPanel.css';
import HeaderPanel from '../HeaderPanel/HeaderPanel';
import { enableZoneCreatePage, enableZoneExplorePage, enableZonePreviewPage } from '../../redux/AppUIStateReducer';
// import { setPortfolioMode } from '../redux/portfolioSlice';

const MainPanel = () => {
  const dispatch = useDispatch();

  const handleClick = (mode) => {
    if(mode==='create'){
       dispatch(enableZoneCreatePage());
    }

    if(mode==='explore'){
      dispatch(enableZoneExplorePage());
    }
    
    if(mode==='share'){
      console.log('inshare');
      dispatch(enableZonePreviewPage());
    }

  };

  return (
    <>
    {/* <HeaderPanel/> */}
    <div className="main-panel">
      <h1>
        Welcome to <span className="highlight">DesFolio</span>!
      </h1>
      <p className="subtitle">
        Showcase your skills, projects, and achievements in a beautifully designed portfolio.
      </p>
      <div className="card-container">
        <div className="card">
          <h3>Create Your Portfolio</h3>
          <p>Build a professional portfolio with projects, skills, and certifications.</p>
          <button className="btn blue" onClick={() => handleClick('create')}>Get Started</button>
        </div>
        <div className="card">
          <h3>Explore Portfolios</h3>
          <p>Browse through portfolios of developers and tech enthusiasts.</p>
          <button className="btn green" onClick={() => handleClick('explore')}>View Portfolios</button>
        </div>
        <div className="card">
          <h3>Share Your Work</h3>
          <p>Easily share your portfolio with recruiters and peers.</p>
          <button className="btn yellow" onClick={() => handleClick('share')}>View My Portfolio</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MainPanel;