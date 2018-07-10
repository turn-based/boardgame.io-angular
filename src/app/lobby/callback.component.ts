import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="loading">
      <img src="assets/loading.svg" alt="loading">
    </div>
  `,
  styles: [`
    .loading {
      position: absolute;
      display: flex;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
    }
  `],
})
export class CallbackComponent {
  constructor(auth: AuthService, router: Router) {
    auth.handleAuthentication()
      .then(() => {
        router.navigate(['/lobby'], {replaceUrl: true});
      })
      .catch((err) => {
        router.navigate(['/lobby'], {replaceUrl: true});
        alert(`Error: ${err.error}. Check the console for further details.`);
      });
  }
}
