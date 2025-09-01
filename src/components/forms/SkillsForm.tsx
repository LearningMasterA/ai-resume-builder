import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { ResumeData, SkillCategory } from '@/types/resume';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SkillsFormProps {
  data: ResumeData;
  onUpdate: (data: SkillCategory[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onUpdate }) => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(data.skills);
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const defaultCategories = [
    'Languages', 'Frameworks', 'Tools', 'Databases', 'Cloud', 'DevOps', 'Soft Skills'
  ];

  const addSkill = () => {
    if (newSkill.trim() && selectedCategory) {
      const updatedCategories = [...skillCategories];
      const categoryIndex = updatedCategories.findIndex(cat => cat.name === selectedCategory);
      
      if (categoryIndex >= 0) {
        if (!updatedCategories[categoryIndex].skills.includes(newSkill.trim())) {
          updatedCategories[categoryIndex].skills.push(newSkill.trim());
        }
      } else {
        updatedCategories.push({
          name: selectedCategory,
          skills: [newSkill.trim()]
        });
      }
      
      setSkillCategories(updatedCategories);
      onUpdate(updatedCategories);
      setNewSkill('');
    }
  };

  const removeSkill = (categoryName: string, skillToRemove: string) => {
    const updatedCategories = skillCategories.map(category => {
      if (category.name === categoryName) {
        return {
          ...category,
          skills: category.skills.filter(skill => skill !== skillToRemove)
        };
      }
      return category;
    }).filter(category => category.skills.length > 0);
    
    setSkillCategories(updatedCategories);
    onUpdate(updatedCategories);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const popularSkillsByCategory = {
    'Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'HTML/CSS'],
    'Frameworks': ['React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Spring Boot'],
    'Tools': ['Git', 'VS Code', 'Jira', 'Figma', 'Postman'],
    'Databases': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
    'Cloud': ['AWS', 'Azure', 'Google Cloud', 'Firebase'],
    'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD'],
    'Soft Skills': ['Leadership', 'Communication', 'Problem Solving', 'Project Management']
  };

  const addPopularSkill = (skill: string, category: string) => {
    const updatedCategories = [...skillCategories];
    const categoryIndex = updatedCategories.findIndex(cat => cat.name === category);
    
    if (categoryIndex >= 0) {
      if (!updatedCategories[categoryIndex].skills.includes(skill)) {
        updatedCategories[categoryIndex].skills.push(skill);
      }
    } else {
      updatedCategories.push({
        name: category,
        skills: [skill]
      });
    }
    
    setSkillCategories(updatedCategories);
    onUpdate(updatedCategories);
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
          <CardTitle>Add Skills by Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {defaultCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <div className="flex space-x-2">
                <Input
                  id="skill"
                  placeholder="e.g. JavaScript, Docker"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!selectedCategory}
                />
                <Button 
                  onClick={addSkill} 
                  disabled={!selectedCategory || !newSkill.trim()}
                  className="bg-primary hover:bg-primary-hover"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Skills by Category */}
          <div className="space-y-4">
            <Label>Popular Skills by Category (Click to add)</Label>
            {Object.entries(popularSkillsByCategory).map(([category, skills]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium text-sm">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const existingCategory = skillCategories.find(cat => cat.name === category);
                    const isAdded = existingCategory?.skills.includes(skill) || false;
                    return (
                      <Button
                        key={skill}
                        variant="outline"
                        size="sm"
                        onClick={() => addPopularSkill(skill, category)}
                        disabled={isAdded}
                        className="h-8 text-xs hover:bg-accent hover:text-accent-foreground"
                      >
                        {skill}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Skills by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Your Skills by Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillCategories.length > 0 ? (
            <AnimatePresence>
              {skillCategories.map((category) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm">{category.name}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge 
                          key={skill}
                          variant="secondary"
                          className="flex items-center space-x-1 bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => removeSkill(category.name, skill)}
                            className="ml-1 hover:text-destructive transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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