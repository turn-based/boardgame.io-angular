import { Component } from '@angular/core';
import { BioAngularService } from 'boardgame.io-angular';

@Component({
  selector: 'tb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'turn-based-client';

  constructor(t: BioAngularService) {

  }
}
