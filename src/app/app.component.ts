import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormBuilderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-gov';
}
