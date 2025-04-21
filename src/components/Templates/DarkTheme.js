import React from 'react';
import './DarkTheme.css';

const DarkTheme = ({ data }) => {
  return (
    <div className="dark-theme-container">
      <div className="dark-header">
        <h1>{data.name}</h1>
        <p>{data.bio}</p>
      </div>

      <div className="dark-section">
        <h2 className="dark-section-title">Education</h2>
        {data.education.map((edu, index) => (
          <div key={edu._id || index} className="dark-card">
            <strong>{edu.degree}</strong> at {edu.institution} ({edu.passingYear})
          </div>
        ))}
      </div>

      <div className="dark-section">
        <h2 className="dark-section-title">Skills</h2>
        {data.skills.map((skill, index) => (
          <div key={index} className="dark-skill-bar">
            <span>{skill}</span>
            <div className="dark-progress">
              <div className="dark-progress-fill"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="dark-section">
        <h2 className="dark-section-title">Projects</h2>
        {data.projects.map((project) => (
          <div key={project._id} className="dark-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <a href={project.githubLink} target="_blank" rel="noreferrer">GitHub</a> |{' '}
              <a href={project.liveDemo} target="_blank" rel="noreferrer">Live Demo</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DarkTheme;
