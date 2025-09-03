import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData, SelfIntroduction } from '@/types/resume';

interface SelfIntroductionFormProps {
  data: ResumeData;
  onUpdate: (data: SelfIntroduction) => void;
}

const SelfIntroductionForm: React.FC<SelfIntroductionFormProps> = ({ data, onUpdate }) => {
  const [selfIntroduction, setSelfIntroduction] = useState<SelfIntroduction>(
    data.selfIntroduction || { description: '' }
  );

  const handleChange = (field: keyof SelfIntroduction, value: string) => {
    const updated = { ...selfIntroduction, [field]: value };
    setSelfIntroduction(updated);
    onUpdate(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="description">Self Introduction / Professional Summary</Label>
        <Textarea
          id="description"
          placeholder="Write a brief professional summary that highlights your key qualifications, experience, and career objectives..."
          value={selfIntroduction?.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={5}
          className="min-h-[120px]"
        />
        <p className="text-sm text-muted-foreground">
          Write 3-4 sentences that summarize your professional background and key strengths.
        </p>
      </div>
    </motion.div>
  );
};

export default SelfIntroductionForm;