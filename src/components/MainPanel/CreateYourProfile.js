import React, { useState } from 'react';
import './CreateYourProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import AlertDialogBox from '../DialogBox/AlertDialogBox';
import { enableZoneMainPanel } from '../../redux/AppUIStateReducer';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@mui/material';


const templates = [
  {
    id: 'ClassicBlue',
    name: 'Classic Blue',
    description: 'A clean, modern layout with a blue theme.',
  },
  {
    id: 'MinimalWhite',
    name: 'Minimal White',
    description: 'A minimalistic design with a white background.',
  },
  {
    id: 'DarkMode',
    name: 'Dark Mode',
    description: 'A sleek design with a dark color scheme.',
  },
];

const designations = [
  'Undergraduate',
  'Postgraduate',
  'Associate Software Engineer',
  'Software Engineer',
  'Senior Software Engineer',
  'Tech Lead',
  'Manager',
];
const degrees = [
  'B.Tech',
  'M.Tech',
  'B.Sc',
  'M.Sc',
  'MBA',
  'PhD',
  'other'
];
const years = Array.from({ length: 30 }, (_, i) => (2000 + i).toString());

const CreateYourProfile = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    skills: '',
    education: [
      {
        degree: '',
        institution: '',
        passingYear: '',
      },
    ],
    projects: [{ title: '', description: '', githubLink: '', liveDemo: '' }],
    certifications: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'certifications') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...formData.education];
    updated[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      education: updated,
    }));
  };
  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: '', institution: '', passingYear: '' },
      ]
    }));
  };
  const handleRemoveEducation = (index) => {
    const updated = [...formData.education];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, education: updated }));
  };
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index][name] = value;
    setFormData((prev) => ({ ...prev, projects: updatedProjects }));
  };
  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: '', description: '', githubLink: '', liveDemo: '' },
      ],
    }));
  };
  const handleRemoveProject = (index) => {
    const updatedProjects = [...formData.projects];
    updatedProjects.splice(index, 1);
    setFormData((prev) => ({ ...prev, projects: updatedProjects }));
  };
  const token = useSelector((state) => state.auth?.token);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const portfolioData = {
      ...formData,
      template: selectedTemplate,
      skills: formData.skills.split(',').map(skill => skill.trim()),
    };
    console.log("Portfolio Data Being Sent:", portfolioData);
    console.log("Token used:", token);
    try {
      const { certifications, ...cleanedData } = portfolioData;
      const response = await fetch('https://portfolio-builder-sii7.onrender.com/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (response.ok) {
        const keyValueMessage = Object.entries(cleanedData)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');

        setAlertMessage(`Your Portfolio has been created \n\n${keyValueMessage}`);
      } else {
        setAlertMessage(data.error || 'Failed to create portfolio');
      }
    } catch (error) {
      setAlertMessage('An error occurred. Please try again');
      console.error('Error: ', error);
    }
    setAlertDialogOpen(true);
    processResponse("Your Portfolio has been created");
  };

  const handleCancel = () => {
    // Clear form or redirect logic can go here
    dispatch(enableZoneMainPanel());
  };

  const processResponse = (message) => {
    setAlertMessage(message);
    setAlertDialogOpen(true);
  };

  return (
    <div className="create-profile">
      <div className="profile-box">
        <h2>Create Your Portfolio</h2>

        <form onSubmit={handleSubmit} className="portfolio-form">
          <input name="name" placeholder="Your Name" onChange={handleChange} value={formData.name} required />
          <select
            name="designation"
            onChange={handleChange}
            value={formData.designation}
            required
          >
            <option value="">Select Designation</option>
            {designations.map((desig, idx) => (
              <option key={idx} value={desig}>{desig}</option>
            ))}
          </select>
          <textarea name="bio" placeholder="Short Bio" onChange={handleChange} value={formData.bio} required />
          <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} value={formData.skills} required />
          <div className='education-section'>
            <h3>Education</h3>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="education-entry">
                <select
                  name="degree"
                  onChange={(e) => handleEducationChange(e, idx)}
                  value={edu.degree}
                  required
                >
                  <option value="">Select Degree</option>
                  {degrees.map((deg, i) => (
                    <option key={i} value={deg}>{deg}</option>
                  ))}
                </select>

                <input
                  type="text"
                  name="institution"
                  placeholder="Institution Name"
                  onChange={(e) => handleEducationChange(e, idx)}
                  value={edu.institution}
                  required
                />

                <select
                  name="passingYear"
                  onChange={(e) => handleEducationChange(e, idx)}
                  value={edu.passingYear}
                  required
                >
                  <option value="">Select Year of Passing</option>
                  {years.map((year, i) => (
                    <option key={i} value={year}>{year}</option>
                  ))}
                </select>

                {formData.education.length > 1 && (
                  <button type="button" className='remove-btn' onClick={() => handleRemoveEducation(idx)}>
                    <MinusCircle size={18} style={{ marginRight: '5px' }} />
                    Remove Project
                  </button>
                )}
              </div>
            ))}

            <button type="button" className='add-btn'  onClick={handleAddEducation}>
            <PlusCircle size={18} style={{ marginRight: '5px' }} />
            Add Another Project
              </button>
          </div>

          {/* <textarea name="projects" placeholder="Projects (details separated by ; )" onChange={handleChange} value={formData.projects} required /> */}
          {/* File Upload for Certifications */}
          <div className="projects-section">
            <h3>Projects</h3>
            {formData.projects.map((project, idx) => (
              <div key={idx} className="project-form">
                <input
                  name="title"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => handleProjectChange(idx, e)}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleProjectChange(idx, e)}
                  required
                />
                <input
                  name="githubLink"
                  placeholder="GitHub Link"
                  value={project.githubLink}
                  onChange={(e) => handleProjectChange(idx, e)}
                  required
                />
                <input
                  name="liveDemo"
                  placeholder="Live Demo Link"
                  value={project.liveDemo}
                  onChange={(e) => handleProjectChange(idx, e)}
                  required
                />
                {formData.projects.length > 1 && (
                  <button type="button" className='remove-btn' onClick={() => handleRemoveProject(idx)}>
                    <MinusCircle size={18} style={{ marginRight: '5px' }} />
                    Remove Project
                    </button>
                )}
              </div>
            ))}

            <button type="button" className='add-btn' onClick={handleAddProject}>
            <PlusCircle size={18} style={{ marginRight: '5px' }} />
            Add Another Project
              </button>
          </div>
          <label className="file-label">
            Upload Certifications (PDF/JPG/PNG):
            <input
              type="file"
              name="certifications"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleChange}
            />
          </label>

          <h3>Select a Template:</h3>
          <div className="template-list">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className={`template-card ${selectedTemplate === tpl.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(tpl.id)}
              >
                <h4>{tpl.name}</h4>
                <p>{tpl.description}</p>
              </div>
            ))}
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">Create Portfolio</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>

      <AlertDialogBox
        message={alertMessage}
        open={isAlertDialogOpen}
        onClose={() => {
          setAlertDialogOpen(false);
          setFormData({
            name: '',
            title: '',
            bio: '',
            skills: '',
            education: [
              {
                degree: '',
                institution: '',
                passingYear: '',
              },
            ],
            projects: [{ title: '', description: '', githubLink: '', liveDemo: '' }],
            certifications: null,
          });
          setSelectedTemplate(null);
        }}
      />
    </div>
  );
};

export default CreateYourProfile;
