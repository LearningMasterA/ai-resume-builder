import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { ResumeData, Experience } from '@/types/resume';

interface ExperienceFormProps {
  data: ResumeData;
  onUpdate: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onUpdate }) => {
  const [experience, setExperience] = useState<Experience[]>(data.experience);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      duration: '',
      responsibilities: '',
    };
    const updatedExperience = [...experience, newExperience];
    setExperience(updatedExperience);
    onUpdate(updatedExperience);
  };

  const removeExperience = (id: string) => {
    const updatedExperience = experience.filter(exp => exp.id !== id);
    setExperience(updatedExperience);
    onUpdate(updatedExperience);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    const updatedExperience = experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperience(updatedExperience);
    onUpdate(updatedExperience);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience} size="sm" className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <AnimatePresence>
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Experience {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      placeholder="Tech Solutions Inc."
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role/Position</Label>
                    <Input
                      placeholder="Senior Software Developer"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    placeholder="Jan 2022 - Present"
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Key Responsibilities & Achievements</Label>
                  <Textarea
                    placeholder="• Led development of key features that increased user engagement by 30%&#10;• Collaborated with cross-functional teams to deliver projects on time&#10;• Mentored junior developers and conducted code reviews"
                    value={exp.responsibilities}
                    onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {experience.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No work experience entries yet</p>
            <Button onClick={addExperience} className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default ExperienceForm;