import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResumeData, PersonalInfo } from '@/types/resume';

interface PersonalInfoFormProps {
  data: ResumeData;
  onUpdate: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onUpdate }) => {
  const { register, watch } = useForm<PersonalInfo>({
    defaultValues: data.personal,
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
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...register('fullName')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                {...register('phone')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="City, State, Country"
                {...register('address')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/johndoe"
                {...register('linkedin')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                placeholder="johndoe.com"
                {...register('website')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoForm;