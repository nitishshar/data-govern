export enum FormFieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  NUMBER = 'number',
  DATE = 'date'
}

export enum FeedDataCategory {
  PROFILE = 'profile',
  TECHNICAL = 'technical',
  CONTROL = 'control',
  SUPPORT = 'support'
}

export interface FormField {
  type: FormFieldType;
  label: string;
  name: string;
  information?: string;
  placeholder?: string;
  required: boolean;
  value?: any;
  options?: Array<{ value: string; label: string }>;
  definition?: string;
  metadataCategory?: string;
  feedDataCategory: FeedDataCategory;
  teamResponsible?: string;
  validations?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  order: number;
}

export interface FormSection {
  title: string;
  category: FeedDataCategory;
  fields: FormField[];
}

export interface ChangeDetails {
  targetDeploymentDate: Date | null;
  reviewalDate: Date | null;
  status: string;
  changeType: string;
  changeDescription: string;
  jiraKey: string;
}

export interface FeedAttribute {
  feedName: string;
  attributeName: string;
  technicalDataType: string;
  technicalDataValues: string;
  collibraCatalogId: string;
  systemDataElement: string;
  materiallyDerived: boolean;
  kde: boolean;
}

export interface Commentary {
  userId: string;
  time: Date;
  comments: string;
}

export interface AuditLog {
  field_name: string;
  previous_value: any;
  new_value: any;
  timestamp: Date;
  user_id: string;
}

export interface FeedFormData {
  title: string;
  description: string;
  feedDetails: {
    feedProfileData: Record<string, any>;
    feedTechnicalData: Record<string, any>;
    feedControlData: Record<string, any>;
    feedSupportData: Record<string, any>;
    attributes: FeedAttribute[];
    changeDataDetail: ChangeDetails;
    commentaries: Commentary[];
    audit: AuditLog[];
  }
}
