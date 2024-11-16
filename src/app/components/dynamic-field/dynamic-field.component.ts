import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormField } from '../../interfaces/form-field.interface';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <div class="form-field" [formGroup]="form">
      <label>{{field.label}}</label>
      <div class="field-container">
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
      </div>
    </div>
  `
})
export class DynamicFieldComponent {
  @Input() field!: FormField;
  @Input() form!: FormGroup;

  get control() {
    return this.form.get(this.field.name);
  }
} 