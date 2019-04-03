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
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
        });
    }

    compareDate(value : any){
        const latestDate = new Date (value);
        const now = new Date();
        const timeDiff = Math.abs(now.getTime() - latestDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if(diffDays > 180){
          return true;
        }else{
          return false;
        }
    }

    changesDateFormat(date : any){

        const monthNames = [
          "Januari", "Februari", "Maret","April", "Mei", "Juni", "Juli","Agustus", "September", "Oktober","November", "Desember"
        ];
    
        const data = new Date(date);
        const year = data.getFullYear();
        const month = data.getMonth();
        const date2 = data.getDate();
        let hours = String(data.getHours());
        let minutes = String(data.getMinutes());

        hours = (hours.length == 1) ? "0"+hours : hours; 
        minutes = (minutes.length == 1) ? "0"+minutes : minutes; 

        return date2 +" "+ monthNames[month] +" "+ year +", "+ hours+":"+ minutes;
    }

}