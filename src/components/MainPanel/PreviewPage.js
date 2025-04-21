import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import './PreviewPage.css';
import ClassicBlue from '../Templates/ClassicBlue';
import DarkTheme from '../Templates/DarkTheme';
import Divider from "@mui/material/Divider";
import {Button} from '@mui/material';
import ReplyIcon from "@mui/icons-material/Reply";
import { enableZoneMainPanel } from '../../redux/AppUIStateReducer';
import { useDispatch } from 'react-redux';
import './PreviewPage.css';

const PreviewPage = () => {
  const dispatch = useDispatch();
    const username = useSelector(state=>state.previewReducer.userName);
    const [portfolioData, setPortfolioData] = useState(null);
    const backToMainPanel = () => {
        dispatch( enableZoneMainPanel());
    }
    useEffect(() => {
        const fetchPortfolio = async () => {
          try {
            const response = await fetch(`https://portfolio-builder-sii7.onrender.com/api/portfolio/${username}`);
            const data = await response.json();
            console.log(data)
            setPortfolioData(data);
          } catch (error) {
            console.error('Error fetching portfolio:', error);
          }
        };
    
        fetchPortfolio();
  }, [username]);

  const renderTemplate = () => {
    switch (portfolioData?.template) {
      case 'ClassicBlue':
        return <ClassicBlue data={portfolioData} />;
      case 'DarkMode':
        return <DarkTheme data={portfolioData} />;
      default:
        return <div>Unknown template selected</div>;
    }
  };

  return (
    <div className="preview-page">
      <Button onClick={backToMainPanel} startIcon={<ReplyIcon />} className='back-button'>
              Back to Section
          </Button>
          <Divider/>
      <div className="template-container">
      {portfolioData ? renderTemplate() : <p>Loading portfolio...</p>}
    </div>
    </div>
  );
};

export default PreviewPage;
