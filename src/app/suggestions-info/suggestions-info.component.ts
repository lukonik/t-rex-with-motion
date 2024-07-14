import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
@Component({
  selector: 'app-suggestions-info',
  standalone: true,
  imports: [MatButton, MatDialogClose],
  templateUrl: './suggestions-info.component.html',
  styleUrl: './suggestions-info.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SuggestionsInfoComponent {}
