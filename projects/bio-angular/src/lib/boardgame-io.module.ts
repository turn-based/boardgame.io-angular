import { NgModule } from '@angular/core';
import { BioClientComponent } from './bio-client.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [BioClientComponent],
  imports: [
    CommonModule,
  ],
  exports: [BioClientComponent]
})
export class BoardgameIoModule { }
