import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FeedInformationFormComponent } from "./components/feed-information-form/feed-information-form.component";
import { CommentaryComponent } from './components/commentary/commentary.component';

interface Comment {
  timestamp: Date;
  userId: string;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormBuilderComponent, 
    FeedInformationFormComponent,
    CommentaryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-gov';
  loggedInUserId = 'SRIDHAR_Y'; // Simulating logged in user

  commentsList: Comment[] = [
    {
      timestamp: new Date('2024-03-20T10:30:00'),
      userId: 'MARIO_I',
      text: 'Initial review completed. Please update the validation thresholds as discussed.'
    },
    {
      timestamp: new Date('2024-03-20T11:15:00'),
      userId: 'RANJAN_R',
      text: 'Validation thresholds updated to include 10%/20%/30% variance checks.'
    },
    {
      timestamp: new Date('2024-03-20T14:20:00'),
      userId: 'ALISTAIR_M',
      text: 'Technical review completed. Feed structure looks good. Please proceed with UAT testing.'
    },
    {
      timestamp: new Date('2024-03-21T09:00:00'),
      userId: 'CHRISTINE_C',
      text: 'Data quality checks passed. Signing off on the data validation requirements.'
    },
    {
      timestamp: new Date('2024-03-21T15:45:00'),
      userId: 'ALLAN_P',
      text: 'Fleet team has reviewed and approved the integration approach.'
    }
  ];

  onCommentAdded(comment: Comment) {
    this.commentsList = [...this.commentsList, comment];
    // Here you would typically make an API call to save the comment
    console.log('New comment added:', comment);
  }
}
