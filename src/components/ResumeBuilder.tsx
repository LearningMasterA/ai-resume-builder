import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormWizard from './FormWizard';
import ResumePreview from './ResumePreview';
import Header from './Header';
import { ResumeData } from '@/types/resume';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('resume-data', {
    personal: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    education: [],
    experience: [],
    skills: [],
    projects: []
  });
  const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'modern' | 'minimal'>('modern');
  const [isLoading, setIsLoading] = useState(false);

  const handleDataUpdate = (stepData: any, step: number) => {
    const stepKeys = ['personal', 'education', 'experience', 'skills', 'projects'];
    const stepKey = stepKeys[step];
    
    setResumeData(prev => ({
      ...prev,
      [stepKey]: stepData
    }));
  };

  const handleTemplateChange = async (template: 'classic' | 'modern' | 'minimal') => {
    setIsLoading(true);
    // Simulate template switching delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setSelectedTemplate(template);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
        resumeData={resumeData}
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl shadow-lg border border-border overflow-hidden"
          >
            <FormWizard
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              onDataUpdate={handleDataUpdate}
              resumeData={resumeData}
            />
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl shadow-lg border border-border overflow-hidden"
          >
            <div className="h-full relative">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Switching template...</p>
                    </div>
                  </motion.div>
                ) : (
                  <ResumePreview
                    key={selectedTemplate}
                    resumeData={resumeData}
                    template={selectedTemplate}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;