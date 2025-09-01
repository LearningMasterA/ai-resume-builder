import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, FileSpreadsheet, Moon, Sun } from 'lucide-react';
import { ResumeData, ResumeTemplate } from '@/types/resume';

interface HeaderProps {
  selectedTemplate: ResumeTemplate;
  onTemplateChange: (template: ResumeTemplate) => void;
  resumeData: ResumeData;
}

const Header: React.FC<HeaderProps> = ({ selectedTemplate, onTemplateChange, resumeData }) => {
  const { theme, setTheme } = useTheme();
  
  const handleExport = (format: 'pdf' | 'word' | 'text') => {
    // TODO: Implement export functionality
    console.log(`Exporting as ${format}...`);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border-b border-border sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Resume Builder</h1>
              <p className="text-xs text-muted-foreground">ATS-Friendly Templates</p>
            </div>
          </div>

          {/* Template Selector & Export Options */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 p-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Template Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Template:</span>
              <Select value={selectedTemplate} onValueChange={onTemplateChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('word')}
                className="hover:bg-success hover:text-success-foreground"
              >
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                Word
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;