import { AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Client as RawClient, Debug } from 'boardgame.io/dist/client';

@Component({
  selector: 'bio-client',
  template: `
    <ng-container *ngIf="client">
      <ng-container *ngComponentOutlet="board;
                                            ndcDynamicInputs: getBoardInputs()">
      </ng-container>
    </ng-container>

    <bio-debug *ngIf="debug && client"
               [gamestate]="client.getState()"
               [gameID]="gameID"
               [playerID]="playerID"
               [isMultiplayer]="multiplayer !== undefined"
               [moves]="client.moves"
               [events]="client.events"
               [store]="client.store"
               [step]="client.step"
               [reset]="client.reset"
               [reducer]="client.reducer"
    ></bio-debug>
  `
})
export class ClientComponent implements OnInit, OnChanges, AfterContentInit {

  // class inputs (possible move to higher level initialization (e.g., class factory)
  @Input() game: any;
  @Input() numPlayers: number;
  @Input() board: any;
  @Input() multiplayer: any;
  @Input() ai: any;
  @Input() enhancer: any;

  // instance inputs
  @Input() gameID = 'default';
  @Input() playerID: string = null;
  @Input() credentials: string = null; // TODO this

  // overridable inputs (both class and instance)
  @Input() debug = true;

  client: any;

  ngOnInit() {
    this.client = RawClient({
      game: this.game,
      ai: this.ai,
      numPlayers: this.numPlayers,
      multiplayer: this.multiplayer,
      gameID: this.gameID,
      playerID: this.playerID,
      credentials: this.credentials,
      enhancer: this.enhancer,
    });

    // todo is this needed? (forceUpdate on react)
    // this.client.subscribe(() => {
    //   console.log('client.subscribe triggered (forceUpdate needed?)');
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.client) {
      // noinspection TsLint
      if (changes.gameID && changes.gameID.currentValue != changes.gameID.previousValue) {
        this.client.updateGameID(changes.gameID.currentValue);
      }
      // noinspection TsLint
      if (changes.playerID && changes.playerID.currentValue != changes.playerID.previousValue) {
        this.client.updatePlayerID(changes.playerID.currentValue);
      }
      // noinspection TsLint
      if (changes.credentials && changes.credentials.currentValue != changes.credentials.previousValue) {
        this.client.updateCredentials(changes.credentials.currentValue);
      }
    }
  }

  ngAfterContentInit() {
    this.client.connect();
  }

  getBoardInputs() {
    const state = this.client.getState();
    return {
      ...state,
      isMultiplayer: this.multiplayer !== undefined,
      moves: this.client.moves,
      events: this.client.events,
      gameID: this.gameID,
      playerID: this.playerID,
      reset: this.client.reset,
      undo: this.client.undo,
      redo: this.client.redo,
    };

  }

}
