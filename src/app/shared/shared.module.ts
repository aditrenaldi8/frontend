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
  MatDialogModule} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';


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
    MatDialogModule
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
    MatDialogModule
  ],
})
export class SharedModule { }
