import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface Signee {
  team: string;
  officialSignee: string[];
  isImpacted: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-official-signees',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './official-signees.component.html',
  styles: [`
    table {
      width: 100%;
    }
    
    mat-form-field {
      width: 100%;
    }
    
    .fleet-selector {
      margin: 20px 0;
    }
    
    :host ::ng-deep .mat-mdc-form-field-infix {
      min-height: 40px !important;
    }
  `]
})
export class OfficialSigneesComponent implements OnInit {
  form: FormGroup;
  fleets = ['Fleet A', 'Fleet B', 'Fleet C'];
  
  availableSignees = [
    'John Smith',
    'Jane Doe',
    'Robert Johnson',
    'Maria Garcia',
    'David Wilson',
    'Sarah Brown'
  ];

  signees: Signee[] = [
    { team: 'Team 1', officialSignee: [], isImpacted: 'Yes', isSelected: false },
    { team: 'Team 2', officialSignee: [], isImpacted: 'No', isSelected: false }
  ];
  
  dataSource = new MatTableDataSource<Signee>(this.signees);
  displayedColumns: string[] = ['select', 'team', 'officialSignee', 'isImpacted'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fleet: ['']
    });
  }

  ngOnInit(): void {
    this.form.get('fleet')?.valueChanges.subscribe(value => {
      console.log('Selected Fleet:', value);
      // Update the table data based on fleet selection if needed
    });
  }

  onSigneeChange(signee: Signee) {
    signee.isSelected = signee.officialSignee.length > 0;
  }
}
