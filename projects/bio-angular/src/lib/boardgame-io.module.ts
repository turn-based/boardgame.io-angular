import { NgModule } from '@angular/core';
import { ClientComponent } from './bio-client.component';
import { CommonModule } from '@angular/common';
import { DynamicModule } from 'ng-dynamic-component';
import { DebugComponent } from './bio-debug.component';

@NgModule({
  imports: [
    CommonModule,

    DynamicModule.withComponents(null),
  ],
  declarations: [ClientComponent, DebugComponent],
  exports: [ClientComponent]
})
export class BoardgameIoModule { }
