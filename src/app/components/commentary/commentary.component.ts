import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Commentary } from '../../interfaces/feed-form.interface';



@Component({
  selector: 'app-commentary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="commentary-container">
      <!-- Existing Comments -->
      <div class="comments-section">
        <div class="comment-card" *ngFor="let comment of comments">
          <div class="comment-header">
            <mat-icon>account_circle</mat-icon>
            <span class="timestamp">{{comment.timestamp | date:'medium'}}</span>
            <span class="user-id">{{comment.userId}}</span>
          </div>
          <div class="comment-body">
            {{comment.text}}
          </div>
        </div>
      </div>

      <!-- New Comment Input -->
      <div class="new-comment-section">
        <mat-form-field appearance="outline" class="comment-input">
          <mat-label>Add a comment</mat-label>
          <textarea 
            matInput 
            [(ngModel)]="newComment" 
            placeholder="Type your comment here..."
            rows="3">
          </textarea>
        </mat-form-field>
        <button 
          mat-raised-button 
          color="primary" 
          [disabled]="!newComment.trim()"
          (click)="addComment()">
          Add Comment
        </button>
      </div>
    </div>
  `,
  styles: [`
    .commentary-container {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      height: 100%;
      background: linear-gradient(145deg, #f0f0f0, #ffffff);
    }

    .comments-section {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-right: 8px;
    }

    .comment-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      transform: perspective(1000px) rotateX(0deg);
      transition: all 0.3s ease;
      box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(0, 155, 218, 0.1);

      &:hover {
        transform: perspective(1000px) rotateX(2deg) translateY(-2px);
        box-shadow: 
          0 8px 12px rgba(0, 0, 0, 0.12),
          0 3px 6px rgba(0, 0, 0, 0.08);
      }

      .comment-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(0, 155, 218, 0.1);

        mat-icon {
          color: #009bda;
        }

        .timestamp {
          color: rgba(0, 0, 0, 0.6);
          font-size: 0.875rem;
        }

        .user-id {
          color: #009bda;
          font-weight: 500;
          margin-left: auto;
        }
      }

      .comment-body {
        color: rgba(0, 0, 0, 0.87);
        line-height: 1.5;
        white-space: pre-wrap;
      }
    }

    .new-comment-section {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.08);
      transform: perspective(1000px) rotateX(0deg);
      transition: all 0.3s ease;

      &:focus-within {
        transform: perspective(1000px) rotateX(2deg) translateY(-2px);
        box-shadow: 
          0 8px 12px rgba(0, 0, 0, 0.12),
          0 3px 6px rgba(0, 0, 0, 0.08);
      }

      .comment-input {
        width: 100%;
        margin-bottom: 16px;
      }

      button {
        float: right;
      }
    }
  `]
})
export class CommentaryComponent {
  @Input() comments: Commentary[] = [];
  @Input() currentUserId: string = 'default_user';
  @Output() commentAdded = new EventEmitter<Commentary>();

  newComment: string = '';

  addComment() {
    if (this.newComment.trim()) {
      const comment: Commentary = {
        timestamp: new Date(),
        userId: this.currentUserId,
        text: this.newComment.trim()
      };
      
      this.commentAdded.emit(comment);
      this.newComment = '';
    }
  }
} 

// <app-commentary
//   [comments]="commentsList"
//   [currentUserId]="loggedInUserId"
//   (commentAdded)="onCommentAdded($event)">
// </app-commentary>

// onCommentAdded(comment: Comment) {
//     this.commentsList.push(comment);
//     // Here you would typically save the comment to your backend
//   }
// }