@Component({
  selector: 'app-feed-management',
  template: `
    <app-form-builder
      [initialData]="feedData"
      [isEditMode]="true"
      (formSubmit)="onFormSubmit($event)">
    </app-form-builder>
  `
})
export class FeedManagementComponent {
  feedData = {
    basicDetails: {
      title: 'Existing Feed',
      description: 'This is an existing feed'
    },
    changeDetails: {
      targetDeploymentDate: new Date(),
      status: 'Active'
      // ... other change details
    },
    feedProfileData: {
      // ... feed profile data
    },
    feedTechnicalData: {
      // ... technical data
    },
    // ... other sections
  };

  onFormSubmit(formData: any) {
    console.log('Updated form data:', formData);
    // Handle form submission
  }
} 