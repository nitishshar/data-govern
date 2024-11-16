export interface FeedFormData {
  title: string;
  description: string;
  feedDetails: FeedDetails;
}

export interface FeedDetails {
  feedProfileData: Record<string, any>;
  feedTechnicalData: Record<string, any>;
  feedControlData: Record<string, any>;
  feedSupportData: Record<string, any>;
  attributes: FeedAttribute[];
  changeDataDetail: ChangeDetails;
  commentaries: Commentary[];
  audit: AuditLog[];
}

export interface FeedAttribute {
  name: string;
  value: any;
}

export interface ChangeDetails {
  targetDeploymentDate: Date | null;
  reviewalDate: Date | null;
  status: string;
  changeType: string;
  changeDescription: string;
  jiraKey: string;
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