import { Component, Inject } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-alert',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.css',
  standalone: true,
})
export class CustomAlertComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message: string, title: string}
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
