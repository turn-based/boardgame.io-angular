import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardgameIoModule } from 'boardgame.io-angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ExampleComponent } from './example.component';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,

    BoardgameIoModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot([
        {
          path: 'examples/:sectionId/:exampleName', component: ExampleComponent,
          resolve: {
            example: 'exampleResolver',
          },
        },
        {path: '', redirectTo: '/examples/Tic-Tac-Toe/Singleplayer', pathMatch: 'full'},
      ],
      // { enableTracing: ! environment.production },
    ),
  ],
  providers: [{
    provide: 'exampleResolver',
    useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => ({
      sectionId: route.paramMap.get('sectionId'),
      name: route.paramMap.get('exampleName'),
      // todo get the actual example
    })
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
