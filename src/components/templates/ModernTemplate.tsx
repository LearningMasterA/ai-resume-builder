import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="h-full p-8 bg-white text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section - ATS Friendly */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-3 tracking-wide" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {data.personal.fullName || 'Your Name'}
        </h1>
        
        <div className="text-sm space-y-1" style={{ fontSize: '12px', lineHeight: '1.4' }}>
          <div className="flex justify-center items-center space-x-1">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.email && data.personal.phone && <span>•</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
          </div>
          {data.personal.address && <div>{data.personal.address}</div>}
          <div className="flex justify-center items-center space-x-1">
            {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
            {data.personal.linkedin && (data.personal.website || data.personal.github) && <span>•</span>}
            {data.personal.website && <span>{data.personal.website}</span>}
            {data.personal.website && data.personal.github && <span>•</span>}
            {data.personal.github && <span>{data.personal.github}</span>}
          </div>
        </div>
      </header>

      {/* Professional Experience Section */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="resume-section-header" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '12px' }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {exp.role}
                  </h3>
                  <span className="text-sm" style={{ fontSize: '12px' }}>
                    {exp.duration}
                  </span>
                </div>
                <p className="font-semibold mb-2" style={{ fontSize: '13px', fontWeight: '600' }}>
                  {exp.company}
                </p>
                <div className="text-sm" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  {exp.responsibilities.split('\n').filter(line => line.trim()).map((line, index) => (
                    <div key={index} className="mb-1">
                      {line.startsWith('•') ? line : `• ${line}`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="resume-section-header" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '12px' }}>
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {edu.degree}
                  </h3>
                  <span className="text-sm" style={{ fontSize: '12px' }}>
                    {edu.duration}
                  </span>
                </div>
                <p className="font-semibold" style={{ fontSize: '13px', fontWeight: '600' }}>
                  {edu.school}
                </p>
                {edu.achievements && (
                  <p className="text-sm mt-1" style={{ fontSize: '12px' }}>
                    {edu.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="resume-section-header" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '12px' }}>
            SKILLS
          </h2>
          <div className="text-sm" style={{ fontSize: '12px', lineHeight: '1.6' }}>
            {data.skills.map((category, index) => (
              <div key={category.name} className={index > 0 ? 'mt-2' : ''}>
                <strong>{category.name}:</strong> {category.skills.join(', ')}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="resume-section-header" style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '12px' }}>
            PROJECTS
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-base font-bold mb-1" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {project.title}
                </h3>
                <div className="text-sm" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  {project.description.split('\n').filter(line => line.trim()).map((line, index) => (
                    <div key={index} className="mb-1">
                      {line.startsWith('•') ? line : `• ${line}`}
                    </div>
                  ))}
                </div>
                {project.techStack.length > 0 && (
                  <p className="text-sm" style={{ fontSize: '11px' }}>
                    <strong>Technologies:</strong> {project.techStack.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;