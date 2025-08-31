import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import { ResumeData } from '@/types/resume';

interface FormWizardProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onDataUpdate: (data: any, step: number) => void;
  resumeData: ResumeData;
}

const steps = [
  { title: 'Personal Info', component: PersonalInfoForm },
  { title: 'Education', component: EducationForm },
  { title: 'Experience', component: ExperienceForm },
  { title: 'Skills', component: SkillsForm },
  { title: 'Projects', component: ProjectsForm },
];

const FormWizard: React.FC<FormWizardProps> = ({
  currentStep,
  onStepChange,
  onDataUpdate,
  resumeData,
}) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Progress */}
      <div className="p-6 border-b border-border">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground">
            {steps[currentStep].title}
          </h2>
          <p className="text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            {steps.map((step, index) => (
              <span
                key={index}
                className={`cursor-pointer transition-colors ${
                  index <= currentStep ? 'text-primary font-medium' : ''
                }`}
                onClick={() => onStepChange(index)}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent
            data={resumeData}
            onUpdate={(data) => onDataUpdate(data, currentStep)}
          />
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-6 border-t border-border">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center bg-primary hover:bg-primary-hover"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormWizard;