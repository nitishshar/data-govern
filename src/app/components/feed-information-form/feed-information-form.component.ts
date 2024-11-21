import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-feed-information-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule
  ],
  template: `
    <div class="feed-form-container">
      <!-- Left Section -->
      <div class="form-section">
        <h3>Feed Information:</h3>
        <div class="info-grid">
          <div class="info-row">
            <label>Feed ID:</label>
            <span>{{feedForm.get('feedId')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Feed Name:</label>
            <span>{{feedForm.get('feedName')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Feed Type:</label>
            <span>{{feedForm.get('feedType')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Feed Priority:</label>
            <span>{{feedForm.get('feedPriority')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Feed Source:</label>
            <span>{{feedForm.get('feedSource')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Feed Source EONID:</label>
            <span>{{feedForm.get('feedSourceEONID')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Feed Consumer:</label>
            <span>{{feedForm.get('feedConsumer')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Feed Consumer EONID:</label>
            <span>{{feedForm.get('feedConsumerEONID')?.value}}</span>
          </div>
        </div>

        <h3>Feed Description:</h3>
        <p class="description">{{feedForm.get('feedDescription')?.value}}</p>

        <h3>Feed Scope:</h3>
        <div class="info-grid">
          <div class="info-row">
            <label>Entity Scope:</label>
            <span>{{feedForm.get('entityScope')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Product:</label>
            <span>{{feedForm.get('product')?.value}}</span>
          </div>
        </div>
      </div>

      <!-- Middle Section -->
      <div class="form-section">
        <h3>Contact Information:</h3>
        <div class="info-grid">
          <div class="info-row">
            <label>Primary IT Contact:</label>
            <span>{{feedForm.get('primaryITContact')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Business Owner:</label>
            <span>{{feedForm.get('businessOwner')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Control Owner:</label>
            <span>{{feedForm.get('controlOwner')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Tech Owner:</label>
            <span>{{feedForm.get('techOwner')?.value}}</span>
          </div>
        </div>

        <h3>Control Information:</h3>
        <div class="info-grid">
          <div class="info-row">
            <label>Upstream Data Controls:</label>
            <span>{{feedForm.get('upstreamControls')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Fleet System Controls:</label>
            <span>{{feedForm.get('fleetControls')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Reporting Controls:</label>
            <span>{{feedForm.get('reportingControls')?.value}}</span>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="form-section">
        <h3>Entity Scopes:</h3>
        <div class="checkbox-grid">
          <mat-checkbox formControlName="firmwide">Firmwide</mat-checkbox>
          <mat-checkbox formControlName="msbna">MSBNA</mat-checkbox>
          <mat-checkbox formControlName="mspbna">MSPBNA</mat-checkbox>
          <mat-checkbox formControlName="otherNonUSBanks">Other Non-US Banks</mat-checkbox>
          <mat-checkbox formControlName="nonBankMSEs">Non-Bank MSEs</mat-checkbox>
          <mat-checkbox formControlName="msFrance">MS France</mat-checkbox>
          <mat-checkbox formControlName="msal">MSAL (0870)</mat-checkbox>
        </div>

        <h3>Change Status:</h3>
        <div class="checkbox-grid">
          <mat-checkbox formControlName="draft">DRAFT</mat-checkbox>
          <mat-checkbox formControlName="proposed">PROPOSED</mat-checkbox>
          <mat-checkbox formControlName="accepted">ACCEPTED</mat-checkbox>
          <mat-checkbox formControlName="rejected">REJECTED</mat-checkbox>
          <mat-checkbox formControlName="prodDeployed">PROD_DEPLOYED</mat-checkbox>
        </div>

        <h3>Additional Information:</h3>
        <div class="info-grid">
          <div class="info-row">
            <label>Target Deployment Date:</label>
            <span>{{feedForm.get('targetDeploymentDate')?.value | date}}</span>
          </div>
          <div class="info-row">
            <label>Date Reviewed:</label>
            <span>{{feedForm.get('dateReviewed')?.value | date}}</span>
          </div>
          <div class="info-row">
            <label>Status:</label>
            <span>{{feedForm.get('status')?.value}}</span>
          </div>
          <div class="info-row">
            <label>Jira/Rally ID:</label>
            <span>{{feedForm.get('jiraRallyId')?.value}}</span>
          </div>
        </div>
      </div>

      <!-- Additional Sections -->
      <div class="full-width-section">
        <h3>Reporting Usage:</h3>
        <p class="description">TBD</p>

        <h3>Description of Change:</h3>
        <p class="description">M31 FX Rates for all currencies held in Ref Data</p>

        <h3>Feed Being Replaced:</h3>
        <p class="description">{{feedForm.get('feedBeingReplaced')?.value}}</p>

        <h3>Feed Metadata:</h3>
        <div class="metadata-grid">
          <div class="metadata-section">
            <h4>Data Validation Thresholds</h4>
            <p>File_RowCount_Chk: File_Age_Chk: File_CheckSum_Chk</p>
            <p>Variances 10%/20%/30% up down - USER STORY TO CHANGE TO DETERMINE LOWER %</p>
          </div>
          
          <div class="metadata-section">
            <h4>Feed Details</h4>
            <div class="info-grid">
              <div class="info-row">
                <label>Feed Arrival ETA:</label>
                <span>BD1 NYSE Calendar Quarter End, Pulled by BODS</span>
              </div>
              <div class="info-row">
                <label>Frequency:</label>
                <span>Quarterly</span>
              </div>
              <div class="info-row">
                <label>Sourcing Method:</label>
                <span>Pull</span>
              </div>
            </div>
          </div>
        </div>

        <h3>Data Control Metadata:</h3>
        <div class="control-metadata-grid">
          <div class="info-row">
            <label>DGC Data Concept:</label>
            <span>[Data Concept]</span>
          </div>
          <div class="info-row">
            <label>System Authorized Re-Distributor:</label>
            <span>No</span>
          </div>
          <div class="info-row">
            <label>MNPI:</label>
            <span>No</span>
          </div>
          <div class="info-row">
            <label>PII:</label>
            <span>No</span>
          </div>
        </div>

        <h3>Signed Off By:</h3>
        <div class="signoff-grid">
          <mat-checkbox formControlName="dataSignoff">
            Data: Christine Chang-Geremski
          </mat-checkbox>
          <mat-checkbox formControlName="fleetSignoff">
            Fleet: Allan Phillips/Karan Hoondani/Patrick Deane
          </mat-checkbox>
          <mat-checkbox formControlName="financeFHCSignoff">
            Finance-FHC: John Goodenham Josh/Kyle Sultzer
          </mat-checkbox>
          <mat-checkbox formControlName="financeEMEASignoff">
            Finance-EMEA
          </mat-checkbox>
          <mat-checkbox formControlName="financeAPACSignoff">
            Finance-APAC
          </mat-checkbox>
          <mat-checkbox formControlName="capitalTechSignoff">
            Capital-Tech: Abhishek Kumar/Alistair Macdonald/Nick McCrea
          </mat-checkbox>
        </div>
      </div>
    </div>

    <!-- Feed Fields Table -->
    <div class="feed-fields-table">
      <h3>Feed Fields</h3>
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Data Type</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let field of feedFields">
            <td>{{field.name}}</td>
            <td>{{field.type}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .feed-form-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
      padding: 20px;
      background: #f5f5f5;
    }

    .form-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h3 {
      color: #333;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #009bda;
    }

    .info-grid {
      display: grid;
      gap: 12px;
    }

    .info-row {
      display: grid;
      grid-template-columns: 140px 1fr;
      align-items: center;
      
      label {
        font-weight: 500;
        color: #666;
      }

      span {
        color: #333;
      }
    }

    .checkbox-grid {
      display: grid;
      gap: 8px;
    }

    .description {
      padding: 12px;
      background: #f8f9fa;
      border-radius: 4px;
      margin: 12px 0;
    }

    .feed-fields-table {
      margin-top: 24px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f5f5f5;
          font-weight: 500;
        }
      }
    }

    .full-width-section {
      grid-column: 1 / -1;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-top: 24px;
    }

    .metadata-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin: 16px 0;
    }

    .metadata-section {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      
      h4 {
        color: #009bda;
        margin-bottom: 12px;
        font-size: 1rem;
      }

      p {
        margin-bottom: 8px;
        color: #666;
      }
    }

    .control-metadata-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      margin: 16px 0;
    }

    .signoff-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 12px;
      margin: 16px 0;
      
      ::ng-deep .mat-checkbox {
        margin-bottom: 8px;
      }
    }
  `]
})
export class FeedInformationFormComponent {
  feedForm: FormGroup;
  feedFields = [
    { name: 'EXTRACT_ID', type: 'Integer' },
    { name: 'FX_MARKET_DATE', type: 'Datetime' },
    { name: 'FX_RATE_FROM_CURRENCY', type: 'String' },
    { name: 'FX_RATE_TO_CURRENCY', type: 'String' },
    { name: 'NY_CLOSE_QUOTED_USD_FX_RATE', type: 'Float' },
    { name: 'FX_RATE_MULTIPLY_DIV_INDICATOR', type: 'String' }
  ];

  constructor(private fb: FormBuilder) {
    this.feedForm = this.fb.group({
      // Feed Information
      feedId: ['FINANCEDATAGOV-47'],
      feedName: ['FX Rates data feed'],
      feedType: ['API'],
      feedPriority: ['Critical'],
      feedSource: ['Finance Data Warehouse (FDW)'],
      feedSourceEONID: ['482'],
      feedConsumer: ['N/A'],
      feedConsumerEONID: [''],
      
      // Feed Description
      feedDescription: ['M31 NY end of day closing spot FX Rates'],
      
      // Feed Scope
      entityScope: ['Firmwide'],
      product: ['Ops Risk'],
      
      // Contact Information
      primaryITContact: ['Sridhar Yeda (norad_dev)'],
      businessOwner: ['Mario Iannotta'],
      controlOwner: ['Ranjan Rout'],
      techOwner: ['Alistair Macdonald'],
      
      // Control Information
      upstreamControls: ['Horkos Checks'],
      fleetControls: [''],
      reportingControls: ['N/A'],
      
      // Entity Scopes
      firmwide: [true],
      msbna: [false],
      mspbna: [false],
      otherNonUSBanks: [false],
      nonBankMSEs: [false],
      msFrance: [false],
      msal: [false],
      
      // Change Status
      draft: [true],
      proposed: [false],
      accepted: [false],
      rejected: [false],
      prodDeployed: [false],
      
      // Additional Information
      targetDeploymentDate: ['4/1/2024'],
      dateReviewed: [''],
      status: ['DRAFT'],
      jiraRallyId: [''],
      
      // Additional form controls
      feedBeingReplaced: [''],
      reportingUsage: ['TBD'],
      descriptionOfChange: ['M31 FX Rates for all currencies held in Ref Data'],
      
      // Metadata controls
      dataValidationThresholds: [''],
      feedArrivalETA: ['BD1 NYSE Calendar Quarter End, Pulled by BODS'],
      frequency: ['Quarterly'],
      sourcingMethod: ['Pull'],
      
      // Data Control Metadata
      dgcDataConcept: ['[Data Concept]'],
      systemAuthorizedRedistributor: ['No'],
      mnpi: ['No'],
      pii: ['No'],
      
      // Signoff checkboxes
      dataSignoff: [false],
      fleetSignoff: [false],
      financeFHCSignoff: [false],
      financeEMEASignoff: [false],
      financeAPACSignoff: [false],
      capitalTechSignoff: [false]
    });
  }
} 