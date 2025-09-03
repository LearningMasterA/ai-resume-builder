import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="h-full p-8 bg-white text-gray-900" style={{ fontFamily: 'Times New Roman, serif' }}>
      {/* Header Section - Traditional Format */}
      <header className="text-center mb-6 pb-4" style={{ borderBottom: '2px solid #000' }}>
        <h1 className="text-3xl font-bold mb-3" style={{ fontSize: '28px', fontWeight: 'bold' }}>
          {data.personal.fullName || 'Your Name'}
        </h1>
        
        <div className="text-sm space-y-1" style={{ fontSize: '12px', lineHeight: '1.4' }}>
          {data.personal.address && <div>{data.personal.address}</div>}
          <div className="flex justify-center space-x-3">
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.email && <span>{data.personal.email}</span>}
          </div>
          {(data.personal.linkedin || data.personal.website || data.personal.github) && (
            <div className="flex justify-center space-x-3">
              {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
              {data.personal.website && <span>{data.personal.website}</span>}
              {data.personal.github && <span>{data.personal.github}</span>}
            </div>
          )}
        </div>
      </header>

      {/* Self Introduction Section */}
      {data.selfIntroduction?.description && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-center" style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-center" style={{ fontSize: '12px', lineHeight: '1.5' }}>
            {data.selfIntroduction.description}
          </p>
        </section>
      )}

      {/* Professional Experience Section */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-center" style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {exp.role}
                  </h3>
                  <span className="text-sm italic" style={{ fontSize: '12px', fontStyle: 'italic' }}>
                    {exp.duration}
                  </span>
                </div>
                <p className="font-semibold mb-2" style={{ fontSize: '13px', fontWeight: '600' }}>
                  {exp.company}
                </p>
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
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 text-center" style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          EDUCATION
        </h2>
        {data.education.length > 0 ? (
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {edu.degree}
                  </h3>
                  <div className="text-right">
                    <span className="text-sm italic block" style={{ fontSize: '12px', fontStyle: 'italic' }}>
                      {edu.duration}
                    </span>
                    {edu.cgpa && (
                      <span className="text-sm italic" style={{ fontSize: '12px', fontStyle: 'italic', color: '#666' }}>
                        {edu.cgpa}
                      </span>
                    )}
                  </div>
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
        ) : (
          <p className="text-sm text-center text-gray-500" style={{ fontSize: '12px' }}>No education information provided</p>
        )}
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 text-center" style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          SKILLS
        </h2>
        <div className="text-center">
        {data.skills?.length > 0 ? (
          <div className="text-sm" style={{ fontSize: '12px', lineHeight: '1.6' }}>
            {data.skills.filter(category => category && category.skills).map((category, index) => (
              <div key={category.name || index} className={index > 0 ? 'mt-2' : ''}>
                <strong>{category.name}:</strong> {(category.skills || []).join(', ') || 'No skills listed'}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500" style={{ fontSize: '12px' }}>No skills information provided</p>
        )}
        </div>
      </section>

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-3 text-center" style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            PROJECTS
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-base font-bold mb-1" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {project.title}
                </h3>
                <div className="text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  {project.description.split('\n').filter(line => line.trim()).map((line, index) => (
                    <div key={index} className="mb-1">
                      {line.startsWith('•') ? line : `• ${line}`}
                    </div>
                  ))}
                </div>
                {(project.techStack || []).length > 0 && (
                  <p className="text-xs italic" style={{ fontSize: '11px', fontStyle: 'italic' }}>
                    Technologies: {(project.techStack || []).join(', ')}
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

export default ClassicTemplate;