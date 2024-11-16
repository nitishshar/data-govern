import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormField, FormFieldType, FeedDataCategory, FormSection } from '../../interfaces/form-field.interface';
import { FEED_DETAILS_CONFIG, groupFieldsByCategory } from '../../constants/feed-details.config';
import { FeedFormData } from '../../interfaces/feed-form.interface';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    DynamicFieldComponent
  ],
  templateUrl: './form-builder.component.html'
})
export class FormBuilderComponent implements OnInit {
  @Input() feedId?: string;
  @Input() savedData?: FeedFormData;

  basicDetailsForm!: FormGroup;
  feedDetailsForm!: FormGroup;
  feedAttributesForm!: FormGroup;
  feedDetailsConfig: FormSection[] = [];
  isLinear = false;
  isSaving = false;
  isEditMode = false;

  statuses = [
    'Draft',
    'In Review',
    'Approved',
    'Rejected'
  ];

  changeTypes = [
    'New Feed',
    'Modification',
    'Decommission'
  ];

  constructor(private fb: FormBuilder) {
    this.feedDetailsConfig = groupFieldsByCategory(FEED_DETAILS_CONFIG);
  }

  ngOnInit(): void {
    this.initializeForms();
    if (this.savedData) {
      this.loadSavedData(this.savedData);
    }
  }

  private initializeForms(): void {
    this.basicDetailsForm = this.createBasicDetailsForm();
    this.feedDetailsForm = this.createFeedDetailsForm();
    this.feedAttributesForm = this.createFeedAttributesForm();
  }

  private createBasicDetailsForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      changeDetails: this.fb.group({
        targetDeploymentDate: [null],
        reviewalDate: [null],
        status: [''],
        changeType: [''],
        changeDescription: [''],
        jiraKey: ['']
      })
    });
  }

  private createFeedDetailsForm(): FormGroup {
    const formGroups: { [key: string]: FormGroup } = {};

    this.feedDetailsConfig.forEach((section: FormSection) => {
      const controls: { [key: string]: FormControl } = {};
      
      section.fields.forEach((field: FormField) => {
        controls[field.name] = new FormControl('', this.getValidators(field));
      });

      const categoryKey = this.getSectionGroupName(section.category);
      formGroups[categoryKey] = this.fb.group(controls);
    });

    return this.fb.group(formGroups);
  }

  private getValidators(field: FormField) {
    const validators = [];
    
    if (field.validations?.required) {
      validators.push(Validators.required);
    }
    if (field.validations?.min !== undefined) {
      validators.push(Validators.min(field.validations.min));
    }
    if (field.validations?.max !== undefined) {
      validators.push(Validators.max(field.validations.max));
    }
    if (field.validations?.pattern) {
      validators.push(Validators.pattern(field.validations.pattern));
    }

    return validators;
  }

  private createFeedAttributesForm(): FormGroup {
    return this.fb.group({
      attributes: ['', Validators.required]
    });
  }

  private loadSavedData(data: FeedFormData): void {
    if (data) {
      this.basicDetailsForm.patchValue({
        title: data.title,
        description: data.description,
        changeDetails: data.feedDetails.changeDataDetail
      });

      if (data.feedDetails) {
        this.feedDetailsForm.patchValue(data.feedDetails);
      }
    }
  }

  isFormValid(): boolean {
    return this.basicDetailsForm.valid && 
           this.feedDetailsForm.valid && 
           this.feedAttributesForm.valid;
  }

  onSave(): void {
    if (this.isFormValid()) {
      this.isSaving = true;
      
      const formData: FeedFormData = {
        title: this.basicDetailsForm.get('title')?.value,
        description: this.basicDetailsForm.get('description')?.value,
        feedDetails: {
          ...this.feedDetailsForm.value,
          changeDataDetail: this.basicDetailsForm.get('changeDetails')?.value,
          attributes: [],
          commentaries: [],
          audit: []
        }
      };

      console.log('Saving form data:', formData);
      this.isSaving = false;
    }
  }

  getSectionGroupName(category: FeedDataCategory): string {
    return category.toLowerCase() + 'Data';
  }

  getFormGroup(category: FeedDataCategory): FormGroup {
    const groupName = this.getSectionGroupName(category);
    return this.feedDetailsForm.get(groupName) as FormGroup;
  }
} 