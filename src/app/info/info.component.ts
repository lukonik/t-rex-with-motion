import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatButton,MatDialogClose],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

}
