import { FormField, FormFieldType, FeedDataCategory, FormSection } from '../interfaces/form-field.interface';

export const FEED_DETAILS_CONFIG: FormField[] = [
  {
    type: FormFieldType.TEXT,
    label: 'Feed Name',
    name: 'feedName',
    information: 'Enter a unique name for the feed',
    placeholder: 'Enter feed name',
    required: true,
    feedDataCategory: FeedDataCategory.PROFILE,
    metadataCategory: 'Basic Info',
    teamResponsible: 'Data Team',
    validations: {
      required: true,
      pattern: '^[a-zA-Z0-9_-]*$',
      message: 'Feed name can only contain letters, numbers, underscores and hyphens'
    },
    order: 1
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Feed Description',
    name: 'feedDescription',
    information: 'Provide a detailed description of the feed',
    placeholder: 'Enter feed description',
    required: true,
    feedDataCategory: FeedDataCategory.PROFILE,
    metadataCategory: 'Basic Info',
    teamResponsible: 'Data Team',
    validations: {
      required: true
    },
    order: 2
  },
  {
    type: FormFieldType.SELECT,
    label: 'Data Classification',
    name: 'dataClassification',
    information: 'Select the appropriate data classification level',
    required: true,
    options: [
      { value: 'public', label: 'Public' },
      { value: 'internal', label: 'Internal' },
      { value: 'confidential', label: 'Confidential' },
      { value: 'restricted', label: 'Restricted' }
    ],
    feedDataCategory: FeedDataCategory.PROFILE,
    metadataCategory: 'Security',
    teamResponsible: 'Security Team',
    validations: {
      required: true
    },
    order: 3
  },
  {
    type: FormFieldType.TEXT,
    label: 'Source System',
    name: 'sourceSystem',
    information: 'Enter the source system name',
    placeholder: 'Enter source system',
    required: true,
    feedDataCategory: FeedDataCategory.TECHNICAL,
    metadataCategory: 'System Info',
    teamResponsible: 'Technical Team',
    validations: {
      required: true
    },
    order: 1
  },
  {
    type: FormFieldType.NUMBER,
    label: 'Expected Row Count',
    name: 'expectedRowCount',
    information: 'Enter the expected number of rows',
    placeholder: 'Enter row count',
    required: true,
    feedDataCategory: FeedDataCategory.TECHNICAL,
    metadataCategory: 'Performance',
    teamResponsible: 'Technical Team',
    validations: {
      required: true,
      min: 0,
      message: 'Row count must be a positive number'
    },
    order: 2
  }
  // Add more fields as needed...
];

// Helper function to group fields by category
export function groupFieldsByCategory(fields: FormField[]): FormSection[] {
  const groupedFields = fields.reduce((acc, field) => {
    const category = field.feedDataCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(field);
    return acc;
  }, {} as Record<FeedDataCategory, FormField[]>);

  return Object.entries(groupedFields).map(([category, fields]) => ({
    title: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
    category: category as FeedDataCategory,
    fields: fields.sort((a, b) => a.order - b.order)
  }));
} 