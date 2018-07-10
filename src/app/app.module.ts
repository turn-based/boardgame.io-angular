import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamplesModule } from './examples/examples.module';
import { RouterModule } from '@angular/router';
import { LobbyModule } from './lobby/lobby.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ExamplesModule,
    LobbyModule,

    RouterModule.forRoot([{path: '', pathMatch: 'full', redirectTo: 'examples'}]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
