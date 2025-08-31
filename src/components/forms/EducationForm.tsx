import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { ResumeData, Education } from '@/types/resume';

interface EducationFormProps {
  data: ResumeData;
  onUpdate: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onUpdate }) => {
  const [education, setEducation] = useState<Education[]>(data.education);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      duration: '',
      achievements: '',
    };
    const updatedEducation = [...education, newEducation];
    setEducation(updatedEducation);
    onUpdate(updatedEducation);
  };

  const removeEducation = (id: string) => {
    const updatedEducation = education.filter(edu => edu.id !== id);
    setEducation(updatedEducation);
    onUpdate(updatedEducation);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updatedEducation = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducation(updatedEducation);
    onUpdate(updatedEducation);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} size="sm" className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <AnimatePresence>
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Education {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Degree/Certification</Label>
                    <Input
                      placeholder="Bachelor of Science in Computer Science"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>School/Institution</Label>
                    <Input
                      placeholder="University of Technology"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    placeholder="2020 - 2024"
                    value={edu.duration}
                    onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Achievements (Optional)</Label>
                  <Textarea
                    placeholder="Graduated Magna Cum Laude, Dean's List..."
                    value={edu.achievements}
                    onChange={(e) => updateEducation(edu.id, 'achievements', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {education.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No education entries yet</p>
            <Button onClick={addEducation} className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default EducationForm;