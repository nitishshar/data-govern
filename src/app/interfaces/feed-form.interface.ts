import { FeedDataCategory } from "./form-field.interface";

export type FormCategory = 
  | 'basicDetails'
  | 'changeDetails'
  | 'feedProfileData'
  | 'feedTechnicalData'
  | 'feedControlData'
  | 'feedSupportData';

export interface BasicDetails {
  title: string;
  description: string;
  [key: string]: any;
}

export interface ChangeDetails {
  targetDeploymentDate: Date | null;
  reviewalDate: Date | null;
  status: string;
  changeType: string;
  changeDescription: string;
  jiraKey: string;
  dependencies?: string;
  [key: string]: any;
}

export interface FeedDetails {
  feedProfileData: Record<string, any>;
  feedTechnicalData: Record<string, any>;
  feedControlData: Record<string, any>;
  feedSupportData: Record<string, any>;
  attributes: FeedAttribute[];
  commentaries: Commentary[];
  audit: AuditLog[];
  [key: string]: any;
}

export interface FeedFormData {
  basicDetails: BasicDetails;
  changeDetails: ChangeDetails;
  feedDetails: {
    feedProfileData: Record<string, any>;
    feedTechnicalData: Record<string, any>;
    feedControlData: Record<string, any>;
    feedSupportData: Record<string, any>;
    attributes: FeedAttribute[];
    commentaries: Commentary[];
    audit: AuditLog[];
  }
}

export interface FeedAttribute {
  name: string;
  value: any;
}

export interface Commentary {
  text: string;
  timestamp: Date;
  userId: string;
}

export interface AuditLog {
  field_name: string;
  previous_value: any;
  new_value: any;
  timestamp: Date;
  user_id: string;
}

export const FeedDataCategoryMapping: Record<FeedDataCategory, FormCategory> = {
  [FeedDataCategory.FEED_PROFILE]: 'feedProfileData',
  [FeedDataCategory.FEED_TECHNICAL]: 'feedTechnicalData',
  [FeedDataCategory.FEED_CONTROL]: 'feedControlData',
  [FeedDataCategory.FEED_SUPPORT]: 'feedSupportData'
}; 