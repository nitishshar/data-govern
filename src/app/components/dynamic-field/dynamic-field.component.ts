import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormField } from '../../interfaces/form-field.interface';
import { FormStateService } from '../../services/form-state.service';
import { FeedDataCategoryMapping, FieldLayout } from '../../interfaces/feed-form.interface';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="field-container" [class]="'layout-' + layout" [formGroup]="form">
      <div class="field-header">
        <label>{{field.label}}</label>
        <mat-icon *ngIf="field.information" 
                  matTooltip="{{field.information}}"
                  class="info-icon">
          info
        </mat-icon>
      </div>
      
      <mat-form-field appearance="outline">
        <ng-container [ngSwitch]="field.type">
          <!-- Text Input -->
          <input *ngSwitchCase="'text'" 
                 matInput 
                 [formControlName]="field.name"
                 [placeholder]="field.placeholder || ''">
          
          <!-- Textarea -->
          <textarea *ngSwitchCase="'textarea'"
                   matInput 
                   [formControlName]="field.name"
                   [rows]="3"
                   [placeholder]="field.placeholder || ''"></textarea>
          
          <!-- Select -->
          <mat-select *ngSwitchCase="'select'"
                     [formControlName]="field.name"
                     [placeholder]="field.placeholder || ''">
            <mat-option *ngFor="let option of field.options" 
                       [value]="option.value">
              {{option.label}}
            </mat-option>
          </mat-select>

          <!-- Number Input -->
          <input *ngSwitchCase="'number'" 
                 matInput 
                 type="number"
                 [formControlName]="field.name"
                 [placeholder]="field.placeholder || ''">
        </ng-container>

        <!-- Error Messages -->
        <mat-error *ngIf="control?.errors?.['required']">
          Required
        </mat-error>
        <mat-error *ngIf="control?.errors?.['min']">
          Value must be greater than {{field.validations?.min}}
        </mat-error>
        <mat-error *ngIf="control?.errors?.['pattern']">
          {{field.validations?.message || 'Invalid format'}}
        </mat-error>
      </mat-form-field>

      <div class="field-metadata" *ngIf="layout === 'card'">
        <span class="metadata-item">
          <mat-icon>category</mat-icon>
          {{field.metadataCategory}}
        </span>
        <span class="metadata-item">
          <mat-icon>group</mat-icon>
          {{field.teamResponsible}}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .field-container {
      &.layout-card {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .field-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;

        .info-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          cursor: help;
        }
      }

      .field-metadata {
        margin-top: auto;
        padding-top: 0.5rem;
        display: flex;
        gap: 1rem;
        font-size: 0.875rem;
        color: rgba(0,0,0,0.6);

        .metadata-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;

          mat-icon {
            font-size: 16px;
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  `]
})
export class DynamicFieldComponent implements OnInit {
  @Input() field!: FormField;
  @Input() form!: FormGroup;
  @Input() layout: FieldLayout = FieldLayout.VERTICAL;
  @Input() showValidation = false;

  constructor(private formStateService: FormStateService) {}

  ngOnInit() {
    this.control?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      const category = FeedDataCategoryMapping[this.field.feedDataCategory];
      this.formStateService.updateField(category, this.field.name, value);
    });
  }

  get showError(): boolean {
    const control = this.control;
    return Boolean(
      this.showValidation && 
      control && 
      control.invalid
    );
  }

  get control() {
    return this.form.get(this.field.name);
  }
} 