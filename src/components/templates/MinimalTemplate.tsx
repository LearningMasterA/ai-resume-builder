import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="h-full p-8 bg-white text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section - Clean Minimal */}
      <header className="mb-8">
        <h1 className="text-3xl font-light mb-4" style={{ fontSize: '32px', fontWeight: '300', letterSpacing: '1px' }}>
          {data.personal.fullName || 'Your Name'}
        </h1>
        
        <div className="text-sm space-y-1" style={{ fontSize: '12px', lineHeight: '1.4', color: '#666' }}>
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.address && <div>{data.personal.address}</div>}
          {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
          {data.personal.website && <div>{data.personal.website}</div>}
        </div>
      </header>

      {/* Professional Experience Section */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-light mb-4" style={{ fontSize: '16px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
            EXPERIENCE
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-2">
                  <h3 className="text-base font-medium" style={{ fontSize: '14px', fontWeight: '500' }}>
                    {exp.role}
                  </h3>
                  <div className="flex justify-between text-sm" style={{ fontSize: '12px', color: '#666' }}>
                    <span>{exp.company}</span>
                    <span>{exp.duration}</span>
                  </div>
                </div>
                <div className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>
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
        <section className="mb-8">
          <h2 className="text-lg font-light mb-4" style={{ fontSize: '16px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
            EDUCATION
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-base font-medium" style={{ fontSize: '14px', fontWeight: '500' }}>
                  {edu.degree}
                </h3>
                <div className="flex justify-between text-sm" style={{ fontSize: '12px', color: '#666' }}>
                  <span>{edu.school}</span>
                  <span>{edu.duration}</span>
                </div>
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
        <section className="mb-8">
          <h2 className="text-lg font-light mb-4" style={{ fontSize: '16px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
            SKILLS
          </h2>
          <div className="text-sm" style={{ fontSize: '12px', lineHeight: '1.6' }}>
            {data.skills.join(' • ')}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-lg font-light mb-4" style={{ fontSize: '16px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
            PROJECTS
          </h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-base font-medium mb-1" style={{ fontSize: '14px', fontWeight: '500' }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-2" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  {project.description}
                </p>
                {project.techStack.length > 0 && (
                  <p className="text-xs" style={{ fontSize: '11px', color: '#666' }}>
                    {project.techStack.join(' • ')}
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

export default MinimalTemplate;