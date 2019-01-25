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
  MatRadioModule} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

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
    ChartsModule
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
    ChartsModule
  ],
})
export class SharedModule { }
