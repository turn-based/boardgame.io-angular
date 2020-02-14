import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Example } from './examples';

@Component({
  template: `
    <ng-container *ngIf="component; else noConfig">
      <ng-container *ngComponentOutlet="component; injector: injector;"></ng-container>
    </ng-container>
    <ng-template #noConfig>Could not find game config</ng-template>
  `,
})
export class ExampleComponent {
  component: null | object = null;

  constructor(route: ActivatedRoute, public injector: Injector) {
    route.data.subscribe(({example}: { example: Example }) => {
      const p = Object.getPrototypeOf(example);
      if (p != null && p !== Object.prototype) {
        this.component = example;
      } else {
        this.component = null;
      }
    });
  }
}
