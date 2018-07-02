import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Debug } from 'boardgame.io/dist/react';
import * as uuid from 'uuid';

import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

export interface GameState {
  G: any;
  ctx: any;
  log: any;
  isActive?: boolean;
  _initial: any;
}

export interface DebugProps {
  gamestate: GameState;
  gameID: string;
  playerID?: string;
  isConnected?: boolean;
  isMultiplayer?: boolean;
  moves?: any;
  events?: any;
  restore?: Function;
  showLog?: boolean;
  store?: any;
  step?: Function;
  reset?: Function;
  reducer?: Function;
  overrideGameState?: Function;
  visualizeAI?: Function;
}

@Component({
  selector: 'bio-debug',
  template: '<span [id]="rootDomID"></span>'
})
export class DebugComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() gamestate: GameState;
  @Input() gameID: string;
  @Input() playerID?: string;
  @Input() isConnected?: boolean;
  @Input() isMultiplayer?: boolean;
  @Input() moves?: any;
  @Input() events?: any;
  @Input() restore?: Function;
  @Input() showLog?: boolean;
  @Input() store?: any;
  @Input() step?: Function;
  @Input() reset?: Function;
  @Input() reducer?: Function;
  @Input() overrideGameState?: Function;
  @Input() visualizeAI?: Function;

  rootDomID: string;

  protected getRootDomNode() {
    return document.getElementById(this.rootDomID);
  }

  protected getProps(): DebugProps {
    const {
      gamestate,
      gameID,
      playerID,
      isConnected,
      isMultiplayer,
      moves,
      events,
      restore,
      showLog,
      store,
      step,
      reset,
      reducer,
      overrideGameState,
      visualizeAI,
    } = this;
    return {
      gamestate,
      gameID,
      playerID,
      isConnected,
      isMultiplayer,
      moves,
      events,
      restore,
      showLog,
      store,
      step,
      reset,
      reducer,
      overrideGameState,
      visualizeAI,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(Debug, this.getProps()),
        this.getRootDomNode()
      );
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}
