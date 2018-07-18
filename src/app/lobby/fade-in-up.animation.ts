import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeInUp as fadeInUpBase } from 'ng-animate';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', useAnimation(fadeInUpBase, {params: {timing: '0.3', a: '12px'}}))
]);
