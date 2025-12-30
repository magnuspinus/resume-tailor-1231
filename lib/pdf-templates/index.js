import ResumeTemplate from './ResumeTemplate';

// Template registry - maps template IDs to React components
const templates = {
  'Resume': ResumeTemplate,
  // Add other templates as they are converted
  // 'Resume-Modern-Green': ModernGreenTemplate,
  // 'Resume-Tech-Teal': TechTealTemplate,
  // etc.
};

export const getTemplate = (templateId) => {
  // Default to 'Resume' if template not found
  const templateName = templateId || 'Resume';
  return templates[templateName] || templates['Resume'];
};

export default templates;

