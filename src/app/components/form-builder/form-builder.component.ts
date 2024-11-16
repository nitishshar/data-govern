import { Component, OnInit, signal, computed } from '@angular/core';
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
import { FieldLayout } from '../../interfaces/field-layout.enum';
import { FEED_DETAILS_CONFIG, groupFieldsByCategory } from '../../constants/feed-details.config';
import { FormSection, FeedDataCategory, FormField } from '../../interfaces/form-field.interface';

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
export class FormBuilderComponent implements OnInit {
  protected readonly FieldLayout = FieldLayout;
  
  isLinear = false;
  basicDetailsForm!: FormGroup;
  feedDetailsForm!: FormGroup;
  feedAttributesForm!: FormGroup;
  feedDetailsConfig: FormSection[] = [];
  
  currentLayout = signal<FieldLayout>(FieldLayout.VERTICAL);
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

  constructor(private fb: FormBuilder) {
    this.feedDetailsConfig = groupFieldsByCategory(FEED_DETAILS_CONFIG);
  }

  ngOnInit() {
    this.initializeForms();
  }

  private initializeForms() {
    this.basicDetailsForm = this.fb.group({
      basicDetails: this.fb.group({
        title: [''],
        description: ['']
      }),
      changeDetails: this.fb.group({
        targetDeploymentDate: [null],
        reviewalDate: [null],
        status: [''],
        changeType: [''],
        changeDescription: [''],
        jiraKey: [''],
        dependencies: ['']
      })
    });

    this.feedDetailsForm = this.createFeedDetailsForm();
    this.feedAttributesForm = this.fb.group({});
  }

  private createFeedDetailsForm(): FormGroup {
    const formGroups: { [key: string]: FormGroup } = {};

    this.feedDetailsConfig.forEach((section: FormSection) => {
      const controls: { [key: string]: any } = {};
      
      section.fields.forEach(field => {
        controls[field.name] = [''];
      });

      const categoryKey = this.getSectionGroupName(section.category);
      formGroups[categoryKey] = this.fb.group(controls);
    });

    return this.fb.group(formGroups);
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
} 