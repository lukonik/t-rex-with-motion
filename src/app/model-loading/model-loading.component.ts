import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-model-loading',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './model-loading.component.html',
  styleUrl: './model-loading.component.scss'
})
export class ModelLoadingComponent {

}
