import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';
import {
  FeedFormData,
  AuditLog,
  FeedAttribute,
  ChangeDetails,
  Commentary,
  FormCategory,
} from '../interfaces/feed-form.interface';

const STORAGE_KEYS = {
  FORM_DATA: 'feed_form_data',
  AUDIT_LOG: 'feed_form_audit',
} as const;

type CategoryData =
  | Record<string, any>
  | AuditLog[]
  | FeedAttribute[]
  | ChangeDetails
  | Commentary[];

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private initialState = signal<FeedFormData | null>(null);
  private currentState = signal<FeedFormData | null>(null);
  private auditLogs = signal<AuditLog[]>([]);
  readonly debugMode = signal<boolean>(true);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const storedData = StorageUtil.get<FeedFormData>(STORAGE_KEYS.FORM_DATA);
      const storedAuditLogs = StorageUtil.get<AuditLog[]>(
        STORAGE_KEYS.AUDIT_LOG
      );

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
      basicDetails: {
        title: '',
        description: '',
      },
      changeDetails: {
        targetDeploymentDate: null,
        reviewalDate: null,
        status: '',
        changeType: '',
        changeDescription: '',
        jiraKey: '',
        dependencies: '',
      },
      feedDetails: {
        feedProfileData: {},
        feedTechnicalData: {},
        feedControlData: {},
        feedSupportData: {},
        attributes: [],
        commentaries: [],
        audit: [],
      },
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

  private getInitialFieldValue(category: FormCategory, fieldName: string): any {
    const state = this.initialState();
    if (!state) return undefined;

    switch (category) {
      case 'basicDetails':
        return state.basicDetails?.[fieldName];
      case 'changeDetails':
        return state.changeDetails?.[fieldName];
      default:
        return state.feedDetails?.[category]?.[fieldName];
    }
  }

  updateField(category: FormCategory, fieldName: string, value: any) {
    const current = this.currentState();
    if (!current) return;

    const initialValue = this.getInitialFieldValue(category, fieldName);

    if (initialValue !== value) {
      const fieldIdentifier = `${category}.${fieldName}`;
      const auditEntry: AuditLog = {
        field_name: fieldIdentifier,
        previous_value: initialValue ?? '',
        new_value: value,
        timestamp: new Date(),
        user_id: 'current-user',
      };

      this.auditLogs.update((logs) => {
        const existingIndex = logs.findIndex(
          (log) => log.field_name === fieldIdentifier
        );
        if (existingIndex >= 0) {
          const updatedLogs = [...logs];
          updatedLogs[existingIndex] = auditEntry;
          return updatedLogs;
        }
        return [...logs, auditEntry];
      });
    }

    const newState = structuredClone(current);

    switch (category) {
      case 'basicDetails':
        newState.basicDetails = {
          ...newState.basicDetails,
          [fieldName]: value,
        };
        break;
      case 'changeDetails':
        newState.changeDetails = {
          ...newState.changeDetails,
          [fieldName]: value,
        };
        break;
      default:
        newState.feedDetails = {
          ...newState.feedDetails,
          [category]: {
            ...newState.feedDetails[category],
            [fieldName]: value,
          },
        };
    }

    this.currentState.set(newState);
    StorageUtil.set(STORAGE_KEYS.FORM_DATA, newState);
    StorageUtil.set(STORAGE_KEYS.AUDIT_LOG, this.auditLogs());
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
        audit: this.auditLogs(),
      },
    };
  }
}
