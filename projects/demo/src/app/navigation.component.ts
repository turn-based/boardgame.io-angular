import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { exampleSections } from './examples';

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
            <mat-divider></mat-divider>
            <h3 matSubheader>{{exampleSection[0]}}</h3>
            <a *ngFor="let example of exampleSection[1]" mat-list-item
               [routerLink]="['examples', exampleSection[0], example.exampleName]" routerLinkActive="active">{{example.exampleName}}</a>
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
              {{example.sectionId}}: {{example.exampleName}}
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
    :host {
      position: fixed;
      top: 0px;
      right: 0px;
      width: 100%;
      height: 100%;
      margin: 0px;
    }

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
      width: auto;
      background: var(--global-selected);
      border-left: 4px solid var(--global-selected);
    }
  `]
})
export class NavigationComponent {
  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  // todo see https://github.com/angular/angular/issues/20995
  exampleSections = Object.entries(exampleSections);


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
