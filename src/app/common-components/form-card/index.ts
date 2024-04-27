import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ucea-form-card',
  templateUrl: 'index.html',
  styleUrl: 'index.scss',
  standalone: true,
  imports: [MatCardModule],
})
export class FormCard {}
