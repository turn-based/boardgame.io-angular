import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'bio-root',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
                   [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
                   [mode]="(isHandset$ | async) ? 'over' : 'side'"
                   [opened]="(isHandset$ | async) === false">
        <mat-toolbar>Examples</mat-toolbar>
        <mat-nav-list>
          <ng-container *ngFor="let exampleSection of exampleSections">
            <h3 matSubheader>{{exampleSection.id}}</h3>
            <a *ngFor="let exampleName of exampleSection.exampleNames" mat-list-item
               [routerLink]="['examples', exampleSection.id, exampleName]" routerLinkActive="active">{{exampleName}}</a>
          </ng-container>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span>
            <ng-container *ngIf="routerOutlet.activatedRouteData['example'] as example">
              {{example.sectionId}}: {{example.name}}
            </ng-container>
          </span>
        </mat-toolbar>
        <div style="padding: 24px">
          <router-outlet #routerOutlet="outlet"></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 304px;
    }

    .sidenav .mat-toolbar {
      background: inherit;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    [mat-list-item].active {
      background: var(--global-selected);
      /*background: #61dafb;*/
    }
  `]
})
export class NavigationComponent {
  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  exampleSections = [{
    id: 'Tic-Tac-Toe',
    exampleNames: ['Singleplayer', 'Multiplayer', 'Authenticated', 'Spectator']
  }, {
    id: 'Chess',
    exampleNames: ['Singleplayer', 'Multiplayer']
  }];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              router: Router) {
    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([event, isHandset]) => isHandset && event instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close());
  }
}
