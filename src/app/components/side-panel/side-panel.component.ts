import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuditLog, Commentary } from '../interfaces/form-field.interface';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, MatDividerModule],
  template: `
    <div class="side-panel">
      <mat-tab-group>
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>history</mat-icon>
            <span>Audit Trail</span>
          </ng-template>
          <div class="tab-content audit-trail">
            <div class="audit-item" *ngFor="let log of auditLogs">
              <div class="audit-header">
                <span class="timestamp">{{ log.timestamp | date:'short' }}</span>
                <span class="user-id">{{ log.user_id }}</span>
              </div>
              <div class="audit-details">
                <div class="field">{{ log.field_name }}</div>
                <div class="change">
                  <span class="old">{{ log.previous_value }}</span>
                  <mat-icon>arrow_forward</mat-icon>
                  <span class="new">{{ log.new_value }}</span>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>comment</mat-icon>
            <span>Comments</span>
          </ng-template>
          <div class="tab-content comments">
            <div class="comment-item" *ngFor="let comment of commentaries">
              <div class="comment-header">
                <span class="user-id">{{ comment.userId }}</span>
                <span class="timestamp">{{ comment.time | date:'short' }}</span>
              </div>
              <div class="comment-text">{{ comment.comments }}</div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .side-panel {
      width: 300px;
      height: 100%;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      background: #fff;
    }

    ::ng-deep .mat-mdc-tab-group {
      height: 100%;
      
      .mat-mdc-tab-label {
        height: 48px;
        padding: 0 16px;
        
        mat-icon {
          margin-right: 8px;
        }
      }
    }

    .tab-content {
      padding: 16px;
      height: calc(100vh - 48px);
      overflow-y: auto;
    }

    .audit-item, .comment-item {
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 4px;
      background: #f8f9fa;
      font-size: 0.875rem;
    }

    .audit-header, .comment-header {
      display: flex;
      justify-content: space-between;
      color: rgba(0, 0, 0, 0.6);
      font-size: 0.75rem;
      margin-bottom: 4px;
    }

    .audit-details {
      .field {
        color: #009bda;
        font-weight: 500;
        margin-bottom: 4px;
      }

      .change {
        display: flex;
        align-items: center;
        gap: 8px;
        
        mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
          color: rgba(0, 0, 0, 0.38);
        }

        .old {
          color: #d32f2f;
          text-decoration: line-through;
        }

        .new {
          color: #2e7d32;
        }
      }
    }

    .comment-text {
      color: rgba(0, 0, 0, 0.87);
      line-height: 1.4;
    }
  `]
})
export class SidePanelComponent {
  @Input() auditLogs: AuditLog[] = [];
  @Input() commentaries: Commentary[] = [];
}