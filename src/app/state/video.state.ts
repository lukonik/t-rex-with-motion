import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, from, Subject, tap, throwError, timeout } from 'rxjs';
import { AskVideoPermissionComponent } from '../ask-video-permission/ask-video-permission.component';
import { DialogRef } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root',
})
export class VideoState {
  snackbar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  checkPermission() {

    //If in 100ms the media was not available
    //probably it's because the permission is not granted
    //so we show ask for permission popup
    let dialogRef: undefined | MatDialogRef<unknown>;
    const permissionTimeoutId = setTimeout(() => {
      dialogRef = this.dialog.open(AskVideoPermissionComponent);
    }, 300);

    return from(navigator.mediaDevices.getUserMedia({ video: true })).pipe(
      tap(() => {
        clearTimeout(permissionTimeoutId);
        dialogRef?.close()
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
