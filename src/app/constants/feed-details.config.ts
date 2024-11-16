import { FormField, FormFieldType, FeedDataCategory, FormSection } from '../interfaces/form-field.interface';

export const FEED_DETAILS_CONFIG: FormField[] = [
  // Feed Profile Section
  {
    type: FormFieldType.TEXT,
    label: 'Feed Name',
    name: 'feedName',
    information: 'Unique identifier for the feed',
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
    information: 'Detailed description of the feed purpose and contents',
    placeholder: 'Enter feed description',
    required: true,
    feedDataCategory: FeedDataCategory.PROFILE,
    metadataCategory: 'Basic Info',
    teamResponsible: 'Data Team',
    validations: { required: true },
    order: 2
  },
  {
    type: FormFieldType.SELECT,
    label: 'Data Classification',
    name: 'dataClassification',
    information: 'Security classification level of the data',
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
    validations: { required: true },
    order: 3
  },

  // Technical Details Section
  {
    type: FormFieldType.TEXT,
    label: 'Source System',
    name: 'sourceSystem',
    information: 'Origin system of the data',
    placeholder: 'Enter source system',
    required: true,
    feedDataCategory: FeedDataCategory.TECHNICAL,
    metadataCategory: 'System Info',
    teamResponsible: 'Technical Team',
    validations: { required: true },
    order: 1
  },
  {
    type: FormFieldType.TEXT,
    label: 'Target System',
    name: 'targetSystem',
    information: 'Destination system for the data',
    placeholder: 'Enter target system',
    required: true,
    feedDataCategory: FeedDataCategory.TECHNICAL,
    metadataCategory: 'System Info',
    teamResponsible: 'Technical Team',
    validations: { required: true },
    order: 2
  },
  {
    type: FormFieldType.NUMBER,
    label: 'Expected Row Count',
    name: 'expectedRowCount',
    information: 'Approximate number of records expected',
    placeholder: 'Enter expected row count',
    required: true,
    feedDataCategory: FeedDataCategory.TECHNICAL,
    metadataCategory: 'Performance',
    teamResponsible: 'Technical Team',
    validations: {
      required: true,
      min: 0,
      message: 'Row count must be a positive number'
    },
    order: 3
  },
  {
    type: FormFieldType.SELECT,
    label: 'Feed Format',
    name: 'feedFormat',
    information: 'Data format of the feed',
    required: true,
    options: [
      { value: 'csv', label: 'CSV' },
      { value: 'json', label: 'JSON' },
      { value: 'xml', label: 'XML' },
      { value: 'parquet', label: 'Parquet' },
      { value: 'avro', label: 'Avro' }
    ],
    feedDataCategory: FeedDataCategory.TECHNICAL,
    metadataCategory: 'Format',
    teamResponsible: 'Technical Team',
    validations: { required: true },
    order: 4
  },

  // Control Section
  {
    type: FormFieldType.SELECT,
    label: 'Feed Frequency',
    name: 'feedFrequency',
    information: 'How often the feed is processed',
    required: true,
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'yearly', label: 'Yearly' },
      { value: 'adhoc', label: 'Ad-hoc' }
    ],
    feedDataCategory: FeedDataCategory.CONTROL,
    metadataCategory: 'Schedule',
    teamResponsible: 'Operations Team',
    validations: { required: true },
    order: 1
  },
  {
    type: FormFieldType.TEXT,
    label: 'SLA Window',
    name: 'slaWindow',
    information: 'Time window for feed processing',
    placeholder: 'e.g., 2 hours',
    required: true,
    feedDataCategory: FeedDataCategory.CONTROL,
    metadataCategory: 'Schedule',
    teamResponsible: 'Operations Team',
    validations: { required: true },
    order: 2
  },
  {
    type: FormFieldType.SELECT,
    label: 'Retention Period',
    name: 'retentionPeriod',
    information: 'How long to retain the data',
    required: true,
    options: [
      { value: '30days', label: '30 Days' },
      { value: '90days', label: '90 Days' },
      { value: '1year', label: '1 Year' },
      { value: '7years', label: '7 Years' },
      { value: 'permanent', label: 'Permanent' }
    ],
    feedDataCategory: FeedDataCategory.CONTROL,
    metadataCategory: 'Retention',
    teamResponsible: 'Data Governance Team',
    validations: { required: true },
    order: 3
  },

  // Support Section
  {
    type: FormFieldType.TEXT,
    label: 'Primary Contact',
    name: 'primaryContact',
    information: 'Main point of contact',
    placeholder: 'Enter email address',
    required: true,
    feedDataCategory: FeedDataCategory.SUPPORT,
    metadataCategory: 'Contact',
    teamResponsible: 'Support Team',
    validations: {
      required: true,
      pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
      message: 'Please enter a valid email address'
    },
    order: 1
  },
  {
    type: FormFieldType.TEXT,
    label: 'Secondary Contact',
    name: 'secondaryContact',
    information: 'Backup point of contact',
    placeholder: 'Enter email address',
    required: true,
    feedDataCategory: FeedDataCategory.SUPPORT,
    metadataCategory: 'Contact',
    teamResponsible: 'Support Team',
    validations: {
      required: true,
      pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
      message: 'Please enter a valid email address'
    },
    order: 2
  },
  {
    type: FormFieldType.TEXTAREA,
    label: 'Support Instructions',
    name: 'supportInstructions',
    information: 'Instructions for support team',
    placeholder: 'Enter support instructions',
    required: true,
    feedDataCategory: FeedDataCategory.SUPPORT,
    metadataCategory: 'Instructions',
    teamResponsible: 'Support Team',
    validations: { required: true },
    order: 3
  }
]; 

export function groupFieldsByCategory(fields: FormField[]): FormSection[] {
  // First, group fields by category
  const groupedFields = fields.reduce((acc, field) => {
    const category = field.feedDataCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(field);
    return acc;
  }, {} as Record<FeedDataCategory, FormField[]>);

  // Then convert to array of sections and sort fields by order
  return Object.entries(groupedFields).map(([category, fields]) => ({
    title: formatCategoryTitle(category),
    category: category as FeedDataCategory,
    fields: fields.sort((a, b) => a.order - b.order)
  }));
}

// Helper function to format category titles
function formatCategoryTitle(category: string): string {
  // Convert SNAKE_CASE to Title Case
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
} 