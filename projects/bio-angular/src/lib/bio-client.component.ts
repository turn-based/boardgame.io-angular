// tslint:disable-next-line:no-reference
/// <reference path="./boardgame.io.d.ts" />

import { Component, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Client } from 'boardgame.io/client';
import { BoardConfig, GameConfig, GameScope, OBSERVABLE_BOARD_CONFIG } from './config';

@Component({
  selector: 'bio-client',
  template: `
      <ng-container *ngIf="config; else waitConfig">
          <ng-container *ngIf="client?.getState(); let state; else waitState">
              <ng-container *ngComponentOutlet="config.board; injector: boardInjector;"></ng-container>
          </ng-container>
      </ng-container>

      <ng-template #waitConfig>waiting for config...</ng-template>
      <ng-template #waitState>waiting for state...</ng-template>
  `,
  styles: [],
})
export class BioClientComponent implements OnInit, OnDestroy, OnChanges {
  @Input() gameID: any = 'default';
  @Input() playerID: any = null;
  @Input() credentials: any = null;
  @Input() debug = false;

  config: GameConfig | false = false;
  private subscriptions = new Subscription();
  client: any;
  private boardConfigSubject = new BehaviorSubject<BoardConfig | false>(false);
  boardInjector: Injector;
  private unsubscribeBgioClient: any;

  constructor(private bio: GameScope, injector: Injector) {
    this.boardInjector =
      Injector.create({
        providers: [{provide: OBSERVABLE_BOARD_CONFIG, useValue: this.boardConfigSubject.asObservable()}],
        parent: injector,
        name: 'boardInjector'
      });
  }

  ngOnInit() {
    this.subscriptions.add(this.bio.configObservable.subscribe((config) => {
      if (!config && this.config) {
        // todo teardown logic
        delete this.client;
      }
      this.config = config;
      if (config) {
        // noinspection PointlessBooleanExpressionJS
        this.client = Client({
          ...config,
          gameID: this.gameID,
          playerID: this.playerID,
          credentials: this.credentials,
          debug: config.debug === false ? false : this.debug,
        });
        this.unsubscribeBgioClient = this.client.subscribe(() => this.updateBoardConfig());
        this.client.start();
      }
      this.updateBoardConfig();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.client) {
      this.client.stop();
    }
    this.boardConfigSubject.complete();
    this.unsubscribeBgioClient();
  }

  updateBoardConfig() {
    const boardConfig = this.config && this.client ? {
      ...this.client.getState(),
      isMultiplayer: !!(this.config && this.config.multiplayer),
      moves: this.client.moves,
      events: this.client.events,
      gameID: this.gameID,
      playerID: this.playerID,
      step: this.client.step,
      reset: this.client.reset,
      undo: this.client.undo,
      redo: this.client.redo,
      gameMetadata: this.client.gameMetadata,
    } : false;
    this.boardConfigSubject.next(boardConfig);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateBoardConfig();

    if (this.client) {
      // tslint:disable-next-line:triple-equals
      if (changes.gameID && changes.gameID.currentValue != changes.gameID.previousValue) {
        this.client.updateGameID(changes.gameID.currentValue);
      }

      // tslint:disable-next-line:triple-equals
      if (changes.playerID && changes.playerID.currentValue != changes.playerID.previousValue) {
        this.client.updatePlayerID(changes.playerID.currentValue);
      }

      // tslint:disable-next-line:triple-equals
      if (changes.credentials && changes.credentials.currentValue != changes.credentials.previousValue) {
        this.client.updateCredentials(changes.credentials.currentValue);
      }
    }
  }
}
