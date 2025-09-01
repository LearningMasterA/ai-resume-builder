import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { ResumeData, Project } from '@/types/resume';

interface ProjectsFormProps {
  data: ResumeData;
  onUpdate: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onUpdate }) => {
  const [projects, setProjects] = useState<Project[]>(data.projects);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      techStack: [],
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    onUpdate(updatedProjects);
  };

  const removeProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    onUpdate(updatedProjects);
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
    onUpdate(updatedProjects);
  };

  const addTechToProject = (projectId: string, tech: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project && tech.trim() && !project.techStack.includes(tech.trim())) {
      updateProject(projectId, 'techStack', [...project.techStack, tech.trim()]);
    }
  };

  const removeTechFromProject = (projectId: string, techToRemove: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'techStack', project.techStack.filter(tech => tech !== techToRemove));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button onClick={addProject} size="sm" className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Project {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    placeholder="E-commerce Platform"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  />
                </div>

                {/* Tech Stack - Moved above description */}
                <div className="space-y-2">
                  <Label>Tech Stack</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add technology (press Enter)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          addTechToProject(project.id, input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).parentElement?.querySelector('input');
                        if (input) {
                          addTechToProject(project.id, input.value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="flex items-center space-x-1 bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          <span>{tech}</span>
                          <button
                            onClick={() => removeTechFromProject(project.id, tech)}
                            className="ml-1 hover:text-destructive transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Project Description</Label>
                  <Textarea
                    placeholder="Built a full-stack e-commerce platform with user authentication&#10;Implemented payment processing and inventory management&#10;Features include real-time chat support and analytics dashboard"
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter each point on a new line. Bullet points will be added automatically.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {projects.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No projects added yet</p>
            <Button onClick={addProject} className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default ProjectsForm;