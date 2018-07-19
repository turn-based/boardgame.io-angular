import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRoom } from './types';
import { ActivatedRoute, Router } from '@angular/router';
import { ColyseusService } from './colyseus.service';

@Component({
  template: `
    <tb-room
      [room]="room"
      [BoardComponent]="BoardComponent"
      [Game]="Game"
      (playAgain)="playAgain()"
      (leave)="leave()">
    </tb-room>
  `,
})
export class MultiplayerPageComponent implements OnInit, OnDestroy {
  room: IRoom;
  BoardComponent: any;
  Game: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private colyseus: ColyseusService,
  ) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { room: { room: IRoom, BoardComponent: any, Game: any } }) => {
        if (this.room) {
          this.room.leave();
        }
        this.room = data.room.room;
        this.BoardComponent = data.room.BoardComponent;
        this.Game = data.room.Game;
      });
  }

  playAgain() {
    this.room.onLeave.addOnce(async () => {
      const room = await this.colyseus.joinWhenReady(this.room.name);
      delete this.room;

      this.router.navigate(['..', room.id], {relativeTo: this.route});
    });
    this.room.leave();
  }

  leave() {
    this.router.navigate(['../../lobby'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.room) {
      this.room.leave();
    }
  }
}
