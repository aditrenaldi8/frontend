import { NgModule } from '@angular/core';
import { MatButtonModule, 
  MatCheckboxModule,
  MatIconModule, 
  MatMenuModule, 
  MatSidenavModule,
  MatExpansionModule, 
  MatListModule, 
  MatFormFieldModule, 
  MatCardModule, 
  MatDividerModule, 
  MatInputModule, 
  MatGridListModule, 
  MatDialogModule,
  MatRadioModule,
  MatTableModule,
  MatButtonToggleModule,
  MatProgressBarModule,
  MatSnackBarModule} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { CdkTableModule } from '@angular/cdk/table';
import { SnackBarComponent } from '../shared/component/snack-bar/snack-bar.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    ChartsModule,
    MatTableModule,
    CdkTableModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    ChartsModule,
    MatTableModule,
    CdkTableModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  declarations: [SnackBarComponent],
  bootstrap:[
    SnackBarComponent 
  ],
})
export class SharedModule { }
