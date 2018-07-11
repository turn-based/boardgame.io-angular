import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ColyseusWrapperService, Room } from './colyseus-wrapper.service';

@Component({
  template: `
    <h3>roomId = {{room?.room?.id}}</h3>
    <div>invite others <a href="{{origin}}/rooms/{{roomId}}">{{origin}}/rooms/{{room?.room?.id}}</a></div>
    <div>{{ room?.room?.name }} {{ room?.room?.id }}</div>

    <div>{{ room?.room?.options | json }}</div>

    <div>{{ room?.room?.state | json }}</div>
  `,
})
export class RoomComponent {
  roomId: string;
  room: Room;
  origin = location.origin;

  constructor(route: ActivatedRoute, colyseus: ColyseusWrapperService) {
    route.paramMap
      .pipe(
        map(paramMap => paramMap.get('roomId')),
      ).subscribe(roomId => {
      if (this.room == null) {
        this.room = colyseus.join(roomId);
      } else if (this.room.room.id !== roomId) {
        this.room.room.leave();
        this.room = colyseus.join(roomId);
      }
    });
  }

}
