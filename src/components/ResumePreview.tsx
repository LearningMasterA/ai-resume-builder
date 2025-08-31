import React from 'react';
import { motion } from 'framer-motion';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: ResumeTemplate;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template }) => {
  const getTemplateComponent = () => {
    switch (template) {
      case 'classic':
        return ClassicTemplate;
      case 'modern':
        return ModernTemplate;
      case 'minimal':
        return MinimalTemplate;
      default:
        return ModernTemplate;
    }
  };

  const TemplateComponent = getTemplateComponent();

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <h3 className="font-semibold text-foreground">Resume Preview</h3>
        <p className="text-sm text-muted-foreground capitalize">{template} Template</p>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[210mm] mx-auto"
          style={{ aspectRatio: '210/297' }} // A4 ratio
        >
          <div className="resume-page h-full">
            <TemplateComponent data={resumeData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePreview;