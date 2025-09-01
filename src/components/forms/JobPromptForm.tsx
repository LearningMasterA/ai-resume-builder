import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResumeData, JobPrompt } from '@/types/resume';
import { FileText } from 'lucide-react';

interface JobPromptFormProps {
  data: ResumeData;
  onUpdate: (data: JobPrompt) => void;
}

const JobPromptForm: React.FC<JobPromptFormProps> = ({ data, onUpdate }) => {
  const { register, watch } = useForm<JobPrompt>({
    defaultValues: data.jobPrompt,
  });

  const watchedFields = watch();

  React.useEffect(() => {
    onUpdate(watchedFields);
  }, [watchedFields, onUpdate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <CardTitle>Job Description</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Paste the job description here to tailor your resume accordingly
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description / Requirements</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here. This will help you tailor your resume content to match the requirements..."
              rows={8}
              className="resize-none"
              {...register('jobDescription')}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobPromptForm;