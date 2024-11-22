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
    <div class="full-width-form">
      <!-- Top Row -->
      <div class="form-row top-row">
        <!-- Feed Information -->
        <div class="section feed-info">
          <h3>Feed Information</h3>
          <div class="info-grid">
            <div class="info-row">
              <label>Feed ID:</label>
              <span>{{feedForm.get('feedId')?.value}}</span>
              <label>Feed Name:</label>
              <span>{{feedForm.get('feedName')?.value}}</span>
              <label>Feed Type:</label>
              <span>{{feedForm.get('feedType')?.value}}</span>
            </div>
            <div class="info-row">
              <label>Feed Priority:</label>
              <span>{{feedForm.get('feedPriority')?.value}}</span>
              <label>Feed Source:</label>
              <span>{{feedForm.get('feedSource')?.value}}</span>
              <label>Feed Source EONID:</label>
              <span>{{feedForm.get('feedSourceEONID')?.value}}</span>
            </div>
            <div class="info-row">
              <label>Feed Consumer:</label>
              <span>{{feedForm.get('feedConsumer')?.value}}</span>
              <label>Feed Consumer EONID:</label>
              <span>{{feedForm.get('feedConsumerEONID')?.value}}</span>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="section contact-info">
          <h3>Contact Information</h3>
          <div class="info-grid">
            <div class="info-row">
              <label>Primary IT Contact:</label>
              <span>{{feedForm.get('primaryITContact')?.value}}</span>
              <label>Business Owner:</label>
              <span>{{feedForm.get('businessOwner')?.value}}</span>
            </div>
            <div class="info-row">
              <label>Control Owner:</label>
              <span>{{feedForm.get('controlOwner')?.value}}</span>
              <label>Tech Owner:</label>
              <span>{{feedForm.get('techOwner')?.value}}</span>
            </div>
          </div>
        </div>

        <!-- Entity Scopes & Status -->
        <div class="section status-section">
          <div class="split-section">
            <div>
              <h3>Entity Scopes</h3>
              <div class="checkbox-grid">
                <mat-checkbox formControlName="firmwide">Firmwide</mat-checkbox>
                <mat-checkbox formControlName="msbna">MSBNA</mat-checkbox>
                <mat-checkbox formControlName="mspbna">MSPBNA</mat-checkbox>
                <mat-checkbox formControlName="otherNonUSBanks">Other Non-US Banks</mat-checkbox>
                <mat-checkbox formControlName="nonBankMSEs">Non-Bank MSEs</mat-checkbox>
                <mat-checkbox formControlName="msFrance">MS France</mat-checkbox>
                <mat-checkbox formControlName="msal">MSAL (0870)</mat-checkbox>
              </div>
            </div>
            <div>
              <h3>Change Status</h3>
              <div class="checkbox-grid">
                <mat-checkbox formControlName="draft">DRAFT</mat-checkbox>
                <mat-checkbox formControlName="proposed">PROPOSED</mat-checkbox>
                <mat-checkbox formControlName="accepted">ACCEPTED</mat-checkbox>
                <mat-checkbox formControlName="rejected">REJECTED</mat-checkbox>
                <mat-checkbox formControlName="prodDeployed">PROD_DEPLOYED</mat-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Row -->
      <div class="form-row middle-row">
        <div class="section descriptions">
          <div class="split-section">
            <div>
              <h3>Feed Description</h3>
              <p class="description">{{feedForm.get('feedDescription')?.value}}</p>
              
              <h3>Feed Scope</h3>
              <div class="info-grid">
                <div class="info-row">
                  <label>Entity Scope:</label>
                  <span>{{feedForm.get('entityScope')?.value}}</span>
                  <label>Product:</label>
                  <span>{{feedForm.get('product')?.value}}</span>
                </div>
              </div>
            </div>
            <div>
              <h3>Reporting Usage</h3>
              <p class="description">{{feedForm.get('reportingUsage')?.value}}</p>
              
              <h3>Description of Change</h3>
              <p class="description">{{feedForm.get('descriptionOfChange')?.value}}</p>
              
              <h3>Feed Being Replaced</h3>
              <p class="description">{{feedForm.get('feedBeingReplaced')?.value}}</p>
            </div>
          </div>
        </div>

        <div class="section controls">
          <h3>Control Information</h3>
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
      </div>

      <!-- Bottom Row -->
      <div class="form-row bottom-row">
        <div class="section metadata">
          <h3>Feed Metadata</h3>
          <div class="split-section">
            <div>
              <h4>Data Validation Thresholds</h4>
              <p>{{feedForm.get('dataValidationThresholds')?.value}}</p>
              <p>Variances 10%/20%/30% up down - USER STORY TO CHANGE TO DETERMINE LOWER %</p>
            </div>
            <div>
              <div class="info-grid">
                <div class="info-row">
                  <label>Feed Arrival ETA:</label>
                  <span>{{feedForm.get('feedArrivalETA')?.value}}</span>
                </div>
                <div class="info-row">
                  <label>Frequency:</label>
                  <span>{{feedForm.get('frequency')?.value}}</span>
                </div>
                <div class="info-row">
                  <label>Sourcing Method:</label>
                  <span>{{feedForm.get('sourcingMethod')?.value}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section data-control">
          <h3>Data Control Metadata</h3>
          <div class="info-grid">
            <div class="info-row">
              <label>DGC Data Concept:</label>
              <span>{{feedForm.get('dgcDataConcept')?.value}}</span>
              <label>System Authorized Re-Distributor:</label>
              <span>{{feedForm.get('systemAuthorizedRedistributor')?.value}}</span>
            </div>
            <div class="info-row">
              <label>MNPI:</label>
              <span>{{feedForm.get('mnpi')?.value}}</span>
              <label>PII:</label>
              <span>{{feedForm.get('pii')?.value}}</span>
            </div>
          </div>
        </div>

        <div class="section feed-fields">
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

        <div class="section signoff">
          <h3>Signed Off By</h3>
          <div class="signoff-grid">
            <mat-checkbox formControlName="dataSignoff">Data: Christine Chang-Geremski</mat-checkbox>
            <mat-checkbox formControlName="fleetSignoff">Fleet: Allan Phillips/Karan Hoondani/Patrick Deane</mat-checkbox>
            <mat-checkbox formControlName="financeFHCSignoff">Finance-FHC: John Goodenham Josh/Kyle Sultzer</mat-checkbox>
            <mat-checkbox formControlName="financeEMEASignoff">Finance-EMEA</mat-checkbox>
            <mat-checkbox formControlName="financeAPACSignoff">Finance-APAC</mat-checkbox>
            <mat-checkbox formControlName="capitalTechSignoff">Capital-Tech: Abhishek Kumar/Alistair Macdonald/Nick McCrea</mat-checkbox>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .full-width-form {
      padding: 16px;
      background: #f5f5f5;
      width: 100%;
      box-sizing: border-box;
    }

    .form-row {
      display: grid;
      gap: 16px;
      margin-bottom: 16px;
    }

    .top-row {
      grid-template-columns: 2fr 2fr 3fr;
    }

    .middle-row {
      grid-template-columns: 3fr 2fr;
    }

    .bottom-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .section {
      background: white;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .split-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    h3 {
      color: #333;
      font-size: 0.9rem;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 2px solid #009bda;
    }

    h4 {
      color: #009bda;
      font-size: 0.85rem;
      margin-bottom: 8px;
    }

    .info-grid {
      display: grid;
      gap: 8px;
    }

    .info-row {
      display: grid;
      grid-template-columns: auto 1fr auto 1fr;
      gap: 8px;
      align-items: center;
      
      label {
        font-weight: 500;
        color: #666;
        font-size: 0.8rem;
        white-space: nowrap;
      }

      span {
        color: #333;
        font-size: 0.8rem;
      }
    }

    .checkbox-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 4px;
      
      ::ng-deep .mat-checkbox {
        font-size: 0.8rem;
      }
    }

    .description {
      padding: 8px;
      background: #f8f9fa;
      border-radius: 4px;
      margin: 4px 0;
      font-size: 0.8rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8rem;

      th, td {
        padding: 6px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      th {
        background: #f5f5f5;
        font-weight: 500;
      }
    }

    .signoff-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 4px;
      
      ::ng-deep .mat-checkbox {
        font-size: 0.8rem;
      }
    }

    .feed-fields {
      grid-column: 1 / -1;
    }

    .signoff {
      grid-column: 1 / -1;
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