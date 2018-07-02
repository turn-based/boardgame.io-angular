import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamplesModule } from './examples/examples.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ExamplesModule,

    RouterModule.forRoot([{path: '', pathMatch: 'full', redirectTo: 'examples'}]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
