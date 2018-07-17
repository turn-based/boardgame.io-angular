import { Injectable } from '@angular/core';
import { Auth0UserProfile, WebAuth } from 'auth0-js';
import { of, Subscription, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  userProfilePromise: Promise<Auth0UserProfile>;
  private auth0: WebAuth;
  userProfile: Auth0UserProfile;

  private refreshSub: Subscription;

  constructor() {
    this.auth0 = new WebAuth({
      clientID: '3S1HVNJBUm8k7VBVfylSFPmQ2kjbA0Fk',
      domain: 'amitport.auth0.com',
      responseType: 'token id_token',
      audience:  'https://api.turn-based.com',
      redirectUri: `${window.location.origin}/callback`,
      scope: 'openid profile email'
    });
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult);
        } else if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public getProfile(): Promise<Auth0UserProfile> {
    if (this.userProfilePromise) {
      return this.userProfilePromise;
    }

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    return this.userProfilePromise = new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) {
          reject(err);
        } else {
          if (profile) {
            this.userProfile = profile;
          }
          resolve(profile);
        }
      });
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.scheduleRenewal();
  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    this.refreshSub = timer(expiresAt - Date.now()).subscribe(
      () => {
        this.renewToken();
        this.scheduleRenewal();
      }
    );
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  public logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    delete this.userProfilePromise;
    this.unscheduleRenewal();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return Date.now() < expiresAt;
  }

}

