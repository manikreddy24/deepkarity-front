import React from 'react';

const ResumeDetails = ({ resume }) => {
  const parseJSONField = (field) => {
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch {
        return field;
      }
    }
    return field;
  };

  const workExperience = parseJSONField(resume.work_experience);
  const education = parseJSONField(resume.education);
  const technicalSkills = parseJSONField(resume.technical_skills);
  const softSkills = parseJSONField(resume.soft_skills);
  const projects = parseJSONField(resume.projects);
  const certifications = parseJSONField(resume.certifications);
  const upskillSuggestions = parseJSONField(resume.upskill_suggestions);

  return (
    <div className="resume-details">
      <h2>Resume Analysis Details</h2>
      
      <div className="section">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {resume.name || 'Not found'}</p>
        <p><strong>Email:</strong> {resume.email || 'Not found'}</p>
        <p><strong>Phone:</strong> {resume.phone || 'Not found'}</p>
        <p><strong>LinkedIn:</strong> {resume.linkedin_url || 'Not found'}</p>
        <p><strong>Portfolio:</strong> {resume.portfolio_url || 'Not found'}</p>
      </div>

      <div className="section">
        <h3>Summary</h3>
        <p>{resume.summary || 'No summary found'}</p>
      </div>

      {workExperience && workExperience.length > 0 && (
        <div className="section">
          <h3>Work Experience</h3>
          {workExperience.map((job, index) => (
            <div key={index} className="experience-item">
              <p><strong>{job.role}</strong> at {job.company} ({job.duration})</p>
              {job.description && Array.isArray(job.description) && (
                <ul>
                  {job.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="section">
          <h3>Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <p><strong>{edu.degree}</strong> - {edu.institution} ({edu.graduation_year})</p>
            </div>
          ))}
        </div>
      )}

      {technicalSkills && technicalSkills.length > 0 && (
        <div className="section">
          <h3>Technical Skills</h3>
          <div className="skills-list">
            {technicalSkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {softSkills && softSkills.length > 0 && (
        <div className="section">
          <h3>Soft Skills</h3>
          <div className="skills-list">
            {softSkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="section">
          <h3>Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <p><strong>{project.name}</strong></p>
              <p>{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="technologies">
                  <strong>Technologies:</strong>
                  <div className="skills-list">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="skill-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {certifications && certifications.length > 0 && (
        <div className="section">
          <h3>Certifications</h3>
          <ul>
            {certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="section">
        <h3>Resume Rating: {resume.resume_rating}/10</h3>
      </div>

      {resume.improvement_areas && (
        <div className="section">
          <h3>Areas for Improvement</h3>
          <p>{resume.improvement_areas}</p>
        </div>
      )}

      {upskillSuggestions && upskillSuggestions.length > 0 && (
        <div className="section">
          <h3>Upskill Suggestions</h3>
          <ul>
            {upskillSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeDetails;