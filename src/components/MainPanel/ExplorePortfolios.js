import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import './ExplorePortfolios.css';
import Divider from "@mui/material/Divider";
import {Button} from '@mui/material';
import { enableZoneMainPanel } from '../../redux/AppUIStateReducer';
import { useDispatch } from 'react-redux';
import ReplyIcon from "@mui/icons-material/Reply";
import './ExplorePortfolios.css';

function PortfolioList() {
  const dispatch = useDispatch();
  const [portfolioMap, setPortfolioMap] = useState({});

  const backToMainPanel = () => {
    dispatch( enableZoneMainPanel());
}

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/emmabostian/developer-portfolios/master/README.md')
      .then(response => response.text())
      .then(markdown => {
        const html = marked(markdown);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'));

        const map = {};

        links.forEach(link => {
          const name = link.textContent.trim();
          const firstChar = name[0]

          if (firstChar >= 'A' && firstChar <= 'Z' && !name.match(/^[A-Z]$/)) {
            if (!map[firstChar]) {
              map[firstChar] = [];
            }

            if (map[firstChar].length < 5) {
              map[firstChar].push({
                name,
                url: link.href
              });
            }
          }
        });

        setPortfolioMap(map);
      })
      .catch(error => console.error('Error fetching portfolios:', error));
  }, []);

  return (
    <div className="container">
      <h2 className="heading">Developer Portfolios</h2>
      <div className="header-row">
          <Button onClick={backToMainPanel} startIcon={<ReplyIcon />} className='back-button'>
              Back to Section
          </Button>
        </div>
        <Divider />
      <div className='scroll-container'>
      <div className="grid">
        {Object.keys(portfolioMap).sort().map(letter => (
          <div className="card" key={letter}>
            <div className="card-header">{letter}</div>
            <ul className="portfolio-list">
              {portfolioMap[letter].map((portfolio, index) => (
                <li key={index}>
                  <a href={portfolio.url} target="_blank" rel="noopener noreferrer">
                    {portfolio.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default PortfolioList;
