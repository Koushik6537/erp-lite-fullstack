import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../core/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" *ngIf="spinner.loading | async">
      <div class="loader"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  constructor(public spinner: SpinnerService) {}
}