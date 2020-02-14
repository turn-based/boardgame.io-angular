import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Example } from './examples';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: `
    <ng-container *ngComponentOutlet="component$ | async; injector: injector;"></ng-container>
  `,
})
export class ExampleComponent {
  component$: Observable<object>;

  constructor(route: ActivatedRoute, public injector: Injector) {
    this.component$ = route.data.pipe(map(({example}: { example: Example }) => example));
  }
}
