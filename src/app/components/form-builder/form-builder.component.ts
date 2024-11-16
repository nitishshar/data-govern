import { Component, OnInit, signal, computed, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';

import { FEED_DETAILS_CONFIG, groupFieldsByCategory } from '../../constants/feed-details.config';
import { FormSection, FeedDataCategory, FormField } from '../../interfaces/form-field.interface';
import {  } from '../../constants/feed-details.config';
import { FormStateService } from '../../services/form-state.service';
import { FeedDataCategoryMapping, FormCategory } from '../../interfaces/feed-form.interface';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { FieldLayout } from '../../interfaces/feed-form.interface';


@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DynamicFieldComponent
  ],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {
  @Input() initialData?: any;
  @Input() isEditMode = false;
  @Output() formSubmit = new EventEmitter<any>();

  protected readonly FieldLayout = FieldLayout;
  
  isLinear = false;
  basicDetailsForm!: FormGroup;
  feedDetailsForm!: FormGroup;
  feedAttributesForm!: FormGroup;
  feedDetailsConfig: FormSection[] = [];
  
  currentLayout = signal<FieldLayout>(FieldLayout.EXPANSION);
  isSaving = signal<boolean>(false);
  showValidation = signal<boolean>(false);
  expandedPanels = signal<Set<string>>(new Set());

  isFormValid = computed(() => {
    if (!this.showValidation()) return true;
    return this.basicDetailsForm?.valid && 
           this.feedDetailsForm?.valid && 
           this.feedAttributesForm?.valid;
  });

  protected readonly statusOptions = [
    'Draft',
    'In Review',
    'Pending Approval',
    'Approved',
    'Rejected'
  ];

  protected readonly changeTypeOptions = [
    'New Feed',
    'Modification',
    'Decommission',
    'Emergency Change'
  ];

  private destroy$ = new Subject<void>();
  private formChanges = new Subject<{category: FormCategory; fieldName: string; value: any}>();

  protected readonly layoutOptions = [
    { value: FieldLayout.EXPANSION, icon: 'expand_more', label: 'Expansion View' },
    { value: FieldLayout.GRID, icon: 'grid_view', label: 'Grid View' },
    { value: FieldLayout.CARD, icon: 'dashboard', label: 'Card View' }
  ];

  protected basicSection = {
    icon: 'description',
    title: 'Basic Information'
  };

  protected changeDetailsSection = {
    icon: 'change_circle',
    title: 'Change Details'
  };

  constructor(private fb: FormBuilder, private formStateService: FormStateService) {
    this.feedDetailsConfig = groupFieldsByCategory(FEED_DETAILS_CONFIG);
    
    // Setup debounced form changes
    this.formChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(({category, fieldName, value}) => {
      this.formStateService.updateField(category, fieldName, value);
    });
  }

  ngOnInit() {
    this.initializeForms(); 
    if (this.initialData && this.isEditMode) {
      this.patchFormValues(this.initialData);
    }
    this.subscribeToFormChanges();
  }

  private initializeForms() {
    this.basicDetailsForm = this.createBasicDetailsForm();
    this.feedDetailsForm = this.createFeedDetailsForm();
    this.feedAttributesForm = this.fb.group({});
  }

  private createBasicDetailsForm(): FormGroup {
    return this.fb.group({
      basicDetails: this.fb.group({
        title: [this.initialData?.basicDetails?.title || '', Validators.required],
        description: [this.initialData?.basicDetails?.description || '', Validators.required]
      }),
      changeDetails: this.fb.group({
        targetDeploymentDate: [this.initialData?.changeDetails?.targetDeploymentDate || null],
        reviewalDate: [this.initialData?.changeDetails?.reviewalDate || null],
        status: [this.initialData?.changeDetails?.status || ''],
        changeType: [this.initialData?.changeDetails?.changeType || ''],
        changeDescription: [this.initialData?.changeDetails?.changeDescription || ''],
        jiraKey: [this.initialData?.changeDetails?.jiraKey || ''],
        dependencies: [this.initialData?.changeDetails?.dependencies || '']
      })
    });
  }

  private createFeedDetailsForm(): FormGroup {
    const formGroups: { [key: string]: FormGroup } = {};

    this.feedDetailsConfig.forEach((section: FormSection) => {
      const controls: { [key: string]: any } = {};
      const sectionKey = this.getSectionGroupName(section.category);
      
      section.fields.forEach(field => {
        const initialValue = this.initialData?.[sectionKey]?.[field.name] || '';
        const validators = this.getValidators(field);
        controls[field.name] = [initialValue, validators];
      });

      formGroups[sectionKey] = this.fb.group(controls);
    });

    return this.fb.group(formGroups);
  }

  public patchFormValues(data: any) {
    if (data.basicDetails || data.changeDetails) {
      this.basicDetailsForm.patchValue(data);
    }

    // Patch feed details form by section
    Object.keys(data).forEach(key => {
      if (key.endsWith('Data')) { // matches feedProfileData, feedTechnicalData, etc.
        const formGroup = this.feedDetailsForm.get(key);
        if (formGroup) {
          formGroup.patchValue(data[key]);
        }
      }
    });
  }

  // Add method to get current form values
  public getFormValues(): any {
    return {
      ...this.basicDetailsForm.value,
      ...this.feedDetailsForm.value
    };
  }

  // Add method to reset forms
  public resetForms() {
    this.basicDetailsForm.reset();
    this.feedDetailsForm.reset();
    this.feedAttributesForm.reset();
  }

  getFormGroup(sectionOrCategory: FormSection | FeedDataCategory): FormGroup {
    const category = typeof sectionOrCategory === 'object' 
      ? sectionOrCategory.category 
      : sectionOrCategory;
      
    const groupName = this.getSectionGroupName(category);
    const group = this.feedDetailsForm.get(groupName);
    if (!group) {
      throw new Error(`Form group ${groupName} not found`);
    }
    return group as FormGroup;
  }

  getSectionGroupName(category: FeedDataCategory): string {
    return category.toLowerCase() + 'Data';
  }

  private getValidators(field: FormField) {
    const validators = [];
    if (field.validations?.required) {
      validators.push(Validators.required);
    }
    if (field.validations?.min !== undefined) {
      validators.push(Validators.min(field.validations.min));
    }
    if (field.validations?.pattern) {
      validators.push(Validators.pattern(field.validations.pattern));
    }
    return validators;
  }

  togglePanel(panelId: string): void {
    const current = this.expandedPanels();
    const updated = new Set(current);
    if (updated.has(panelId)) {
      updated.delete(panelId);
    } else {
      updated.add(panelId);
    }
    this.expandedPanels.set(updated);
  }

  isPanelExpanded(panelId: string): boolean {
    return this.expandedPanels().has(panelId);
  }

  onLayoutChange(layout: FieldLayout): void {
    this.currentLayout.set(layout);
  }

  private addValidators() {
    const basicControls = ['title', 'description'];
    basicControls.forEach(key => {
      const control = this.basicDetailsForm.get(key);
      if (control) {
        control.setValidators([Validators.required]);
        control.updateValueAndValidity();
      }
    });

    const changeDetailsGroup = this.basicDetailsForm.get('changeDetails') as FormGroup;
    Object.keys(changeDetailsGroup.controls).forEach(key => {
      const control = changeDetailsGroup.get(key);
      if (control) {
        control.setValidators([Validators.required]);
        if (key === 'jiraKey') {
          control.setValidators([
            Validators.required,
            Validators.pattern('^[A-Z]+-[0-9]+$')
          ]);
        }
        control.updateValueAndValidity();
      }
    });

    this.feedDetailsConfig.forEach(section => {
      const group = this.getFormGroup(section);
      section.fields.forEach(field => {
        const control = group.get(field.name);
        if (control) {
          const validators = this.getValidators(field);
          control.setValidators(validators);
          control.updateValueAndValidity();
        }
      });
    });
  }

  async onSave(): Promise<void> {
    this.showValidation.set(true);
    this.addValidators();

    if (!this.basicDetailsForm.valid || !this.feedDetailsForm.valid || !this.feedAttributesForm.valid) {
      const allPanelIds = ['changeDetails', ...this.feedDetailsConfig.map(section => section.category)];
      this.expandedPanels.set(new Set(allPanelIds));
      return;
    }

    this.isSaving.set(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      this.isSaving.set(false);
    }
  }

  onSubmit() {
    this.showValidation.set(true);
    
    if (this.basicDetailsForm.valid && 
        this.feedDetailsForm.valid && 
        this.feedAttributesForm.valid) {
      
      const finalData = this.formStateService.getFinalFormData();
      
      if (this.formStateService.debugMode()) {
        console.log('Form Submission with Audit:', finalData);
      }
      
      this.formSubmit.emit(finalData);
    }
  }

  // Modify stepper navigation to not check validation
  canProceed(step: number): boolean {
    // Allow navigation between steps without validation
    return true;
  }

  private mapToFormCategory(category: string): FormCategory {
    if (category in FeedDataCategory) {
      return FeedDataCategoryMapping[category as FeedDataCategory];
    }
    return category as FormCategory;
  }

  private subscribeToFormChanges() {
    // Subscribe to basic details form controls individually
    const basicDetailsGroup = this.basicDetailsForm.get('basicDetails') as FormGroup;
    if (basicDetailsGroup) {
      Object.keys(basicDetailsGroup.controls).forEach(controlName => {
        basicDetailsGroup.get(controlName)?.valueChanges
          .pipe(takeUntil(this.destroy$))
          .subscribe(value => {
            this.formChanges.next({
              category: 'basicDetails',
              fieldName: controlName,
              value
            });
          });
      });
    }

    // Subscribe to change details form controls individually
    const changeDetailsGroup = this.basicDetailsForm.get('changeDetails') as FormGroup;
    if (changeDetailsGroup) {
      Object.keys(changeDetailsGroup.controls).forEach(controlName => {
        changeDetailsGroup.get(controlName)?.valueChanges
          .pipe(takeUntil(this.destroy$))
          .subscribe(value => {
            this.formChanges.next({
              category: 'changeDetails',
              fieldName: controlName,
              value
            });
          });
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onReset(): void {
    // Reset all forms to their initial state
    this.basicDetailsForm.reset();
    this.feedDetailsForm.reset();
    this.feedAttributesForm.reset();

    // Reset signals
    this.showValidation.set(false);
    this.expandedPanels.set(new Set());
    
    // If there's initial data, repopulate the forms
    if (this.initialData) {
      this.basicDetailsForm.patchValue(this.initialData);
      this.feedDetailsForm.patchValue(this.initialData);
      this.feedAttributesForm.patchValue(this.initialData);
    }
  }
} 