import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../shared/component/snack-bar/snack-bar.component';

@Injectable()
export class AppHelper {
    constructor(
        private snackBar : MatSnackBar
    ) {
    }

    openSnackBar() {
        console.log('snackbar')
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 1000,
        });
    }

}