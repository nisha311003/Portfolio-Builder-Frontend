import React from 'react';
import './ClassicBlue.css';

const ClassicBlue = ({ data }) => {
  return (
    <div className="classic-blue-container">
      <div className="header">
        <h1>{data.name}</h1>
        <p>{data.bio}</p>
      </div>

      <div className="section">
        <h2 className="section-title">Education</h2>
        {data.education.map((edu, index) => (
          <div key={edu._id || index} className="card">
            <strong>{edu.degree}</strong> at {edu.institution} ({edu.passingYear})
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Skills</h2>
        {data.skills.map((skill, index) => (
          <div key={index} className="skill-bar">
            <span>{skill}</span>
            <div className="progress">
              <div className="progress-fill"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">Projects</h2>
        {data.projects.map((project) => (
          <div key={project._id} className="card">
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

export default ClassicBlue;
