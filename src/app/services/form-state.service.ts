import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';
import { 
  FeedFormData, 
  AuditLog, 
  FeedAttribute,
  ChangeDetails,
  Commentary, 
  FormCategory
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
  readonly debugMode = signal<boolean>(true);

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

  updateField(category: FormCategory, fieldName: string, value: any) {
    const current = this.currentState();
    if (!current) return;

    const previousValue = this.getFieldValue(category, fieldName);
    
    if (previousValue !== value) {
      const auditEntry: AuditLog = {
        field_name: `${category}.${fieldName}`,
        previous_value: previousValue ?? '',
        new_value: value,
        timestamp: new Date(),
        user_id: 'current-user'
      };

      this.auditLogs.update(logs => [...logs, auditEntry]);
      console.log('Field Change Audit:', auditEntry);
    }

    const newState = structuredClone(current);
    
    if (category === 'basicDetails') {
      newState.title = fieldName === 'title' ? value : newState.title;
      newState.description = fieldName === 'description' ? value : newState.description;
    } else if (category === 'changeDetails') {
      newState.feedDetails.changeDataDetail = {
        ...newState.feedDetails.changeDataDetail,
        [fieldName]: value
      };
    } else {
      newState.feedDetails = {
        ...newState.feedDetails,
        [category]: {
          ...newState.feedDetails[category],
          [fieldName]: value
        }
      };
    }
    
    this.currentState.set(newState);
  }

  private getFieldValue(category: FormCategory, fieldName: string): any {
    const state = this.currentState();
    if (!state) return undefined;

    if (category === 'basicDetails') {
      return fieldName === 'title' ? state.title : state.description;
    } else if (category === 'changeDetails') {
      return state.feedDetails.changeDataDetail[fieldName];
    } else {
      return state.feedDetails[category]?.[fieldName];
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

  getFinalFormData(): FeedFormData {
    const current = this.currentState();
    if (!current) throw new Error('No form data available');

    return {
      ...current,
      feedDetails: {
        ...current.feedDetails,
        audit: this.auditLogs()
      }
    };
  }
} 