import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';
import { 
  FeedFormData, 
  AuditLog, 
  FeedDetails,
  FeedAttribute,
  ChangeDetails,
  Commentary 
} from '../interfaces/feed-form.interface';

const STORAGE_KEYS = {
  FORM_DATA: 'feed_form_data',
  AUDIT_LOG: 'feed_form_audit'
} as const;

type CategoryData = Record<string, any> | AuditLog[] | FeedAttribute[] | ChangeDetails | Commentary[];

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private initialState = signal<FeedFormData | null>(null);
  private currentState = signal<FeedFormData | null>(null);
  auditLogs = signal<AuditLog[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const storedData = StorageUtil.get<FeedFormData>(STORAGE_KEYS.FORM_DATA);
      const storedAuditLogs = StorageUtil.get<AuditLog[]>(STORAGE_KEYS.AUDIT_LOG);
      
      if (storedData) {
        this.initialState.set(storedData);
        this.currentState.set(storedData);
      } else {
        this.initializeEmptyForm();
      }

      if (storedAuditLogs) {
        this.auditLogs.set(storedAuditLogs);
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
      this.initializeEmptyForm();
    }
  }

  private initializeEmptyForm(): void {
    const emptyForm: FeedFormData = {
      title: '',
      description: '',
      feedDetails: {
        feedProfileData: {},
        feedTechnicalData: {},
        feedControlData: {},
        feedSupportData: {},
        attributes: [],
        changeDataDetail: {
          targetDeploymentDate: null,
          reviewalDate: null,
          status: '',
          changeType: '',
          changeDescription: '',
          jiraKey: ''
        },
        commentaries: [],
        audit: []
      }
    };
    
    this.initialState.set(emptyForm);
    this.currentState.set(emptyForm);
  }

  saveForm(): Observable<boolean> {
    const current = this.currentState();
    if (!current) return of(false);

    try {
      StorageUtil.set(STORAGE_KEYS.FORM_DATA, current);
      StorageUtil.set(STORAGE_KEYS.AUDIT_LOG, this.auditLogs());
      return this.mockApiCall('saveForm', current);
    } catch (error) {
      console.error('Error saving form:', error);
      return of(false);
    }
  }

  submitForm(): Observable<boolean> {
    const current = this.currentState();
    if (!current) return of(false);
    return this.mockApiCall('submitForm', current);
  }

  updateField(category: keyof FeedDetails, fieldName: string, value: any): void {
    const current = this.currentState();
    if (!current) return;

    const newState: FeedFormData = {
      ...current,
      feedDetails: {
        ...current.feedDetails,
        [category]: {
          ...(current.feedDetails[category] as Record<string, any>),
          [fieldName]: value
        }
      }
    };

    this.currentState.set(newState);
    this.generateAuditLog(category, fieldName, value);
    StorageUtil.set(STORAGE_KEYS.FORM_DATA, newState);
  }

  private generateAuditLog(category: keyof FeedDetails, fieldName: string, newValue: any): void {
    const initial = this.initialState();
    if (!initial) return;

    const categoryData = initial.feedDetails[category] as Record<string, any>;
    const previousValue = categoryData ? categoryData[fieldName] : undefined;

    if (previousValue !== newValue) {
      const auditEntry: AuditLog = {
        field_name: `${category}.${fieldName}`,
        previous_value: previousValue,
        new_value: newValue,
        timestamp: new Date(),
        user_id: 'current-user'
      };

      this.auditLogs.update(logs => [...logs, auditEntry]);
      StorageUtil.set(STORAGE_KEYS.AUDIT_LOG, this.auditLogs());
    }
  }

  private mockApiCall(operation: string, data: any): Observable<boolean> {
    console.log(`Mock ${operation} API call with data:`, data);
    return of(true).pipe(delay(1000));
  }

  getCurrentState(): FeedFormData | null {
    return this.currentState();
  }

  clearStorage(): void {
    StorageUtil.remove(STORAGE_KEYS.FORM_DATA);
    StorageUtil.remove(STORAGE_KEYS.AUDIT_LOG);
    this.initializeEmptyForm();
    this.auditLogs.set([]);
  }
} 