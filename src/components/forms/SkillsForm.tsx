import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface SkillsFormProps {
  data: ResumeData;
  onUpdate: (data: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onUpdate }) => {
  const [skills, setSkills] = useState<string[]>(data.skills);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      onUpdate(updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const popularSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'HTML/CSS', 'SQL', 'Git', 'AWS', 'Docker', 'REST APIs',
    'Leadership', 'Communication', 'Problem Solving', 'Project Management'
  ];

  const addPopularSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      onUpdate(updatedSkills);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Add Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <Input
                id="skill"
                placeholder="e.g. JavaScript, Project Management"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addSkill} className="bg-primary hover:bg-primary-hover">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Popular Skills */}
          <div className="space-y-2">
            <Label>Popular Skills (Click to add)</Label>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => addPopularSkill(skill)}
                  disabled={skills.includes(skill)}
                  className="h-8 text-xs hover:bg-accent hover:text-accent-foreground"
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Your Skills ({skills.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="flex items-center space-x-1 bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No skills added yet. Add some skills above to get started!
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillsForm;