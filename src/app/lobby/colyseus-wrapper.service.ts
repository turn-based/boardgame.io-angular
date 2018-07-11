import { Injectable, OnDestroy } from '@angular/core';
import { Client as ColyseusClient, DataChange, Room as ColyseusRoom } from 'colyseus.js';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { RoomAvailable } from 'colyseus.js/lib/Room';
import { HttpClient } from '@angular/common/http';
import { SERVER_HOST, SERVER_ORIGIN } from '../site-config';

export enum CONNECTION_STATUS {
  PRE_INIT = 'PRE_INIT',
  CONNECTING = 'CONNECTING',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  ERROR = 'ERROR',
}

@Injectable()
export class Room implements OnDestroy {
  private _connectionStatus$ = new BehaviorSubject<CONNECTION_STATUS>(CONNECTION_STATUS.CONNECTING);
  connectionStatus$ = this._connectionStatus$.asObservable();

  private _messages$ = new Subject();
  messages$ = this._messages$.asObservable();

  private _stateChanges$ = new Subject();
  stateChanges$ = this._stateChanges$.asObservable();

  room: ColyseusRoom<any>;

  constructor(private colyseusWrapper: ColyseusWrapperService, public name: string, private options?: any) {
    // this.init();
  }

  private init() {
    this.colyseusWrapper.connectionStatus$
      .pipe(
        filter((status) => status === CONNECTION_STATUS.OPEN),
        first(),
      )
      .subscribe(() => {
        this.room = this.colyseusWrapper.client.join(this.name, this.options);

        this.room.onJoin.add(() => {
          this._connectionStatus$.next(CONNECTION_STATUS.OPEN);
        });
        this.room.onError.add((error) => {
          console.error(error);
          this._connectionStatus$.next(CONNECTION_STATUS.ERROR);
        });
        this.room.onLeave.add(() => {
          this._connectionStatus$.next(CONNECTION_STATUS.CLOSE);
          this._connectionStatus$.complete();
        });

        this.room.onMessage.add(message => {
          this._messages$.next(message);
        });
        this.room.onStateChange.add(state => {
          this._stateChanges$.next(state);
        });
      });
  }

  listen(segments: string | Function): Observable<DataChange> {
    return this.connectionStatus$
      .pipe(
        filter(status => status === CONNECTION_STATUS.OPEN),
        first(),
        switchMap(() =>
          new Observable(subscriber => {
            const listener = this.room.listen(segments, (change: DataChange) => {
              subscriber.next(change);
            });
            return () => {
              this.room.removeListener(listener);
            };
          })
        ),
      );
  }

  send(data: any) {
    this.connectionStatus$
      .pipe(
        filter(status => status === CONNECTION_STATUS.OPEN),
        first(),
      ).subscribe(() => {
      this.room.send(data);
    });
  }

  ngOnDestroy() {
    console.log('room OnDestroy');
    if (this.room != null) {
      this.room.leave();
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ColyseusWrapperService implements OnDestroy {
  private _connectionStatus$ = new BehaviorSubject<CONNECTION_STATUS>(CONNECTION_STATUS.PRE_INIT);
  connectionStatus$ = this._connectionStatus$.asObservable();
  client: ColyseusClient;

  constructor(private http: HttpClient) {
    this.init();
  }

  private init() {
    this._connectionStatus$.next(CONNECTION_STATUS.CONNECTING);

    this.client = new ColyseusClient(`ws://${SERVER_HOST}`);

    this.client.onOpen.add(() => {
      this._connectionStatus$.next(CONNECTION_STATUS.OPEN);
    });

    this.client.onClose.add(() => {
      this._connectionStatus$.next(CONNECTION_STATUS.CLOSE);
      this._connectionStatus$.complete();
    });
    this.client.onError.add((error) => {
      console.error(error);
      this._connectionStatus$.next(CONNECTION_STATUS.ERROR);
    });
  }

  join(roomName: string, options?: any) {
    return new Room(this, roomName, options);
  }

  getAvailableRooms(roomName: string): Promise<RoomAvailable[]> {
    return new Promise((resolve, reject) => {
      this.client.getAvailableRooms(roomName, (rooms: RoomAvailable[], err?: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(rooms);
        }
      });
    });
  }

  getRoomList() {
    return this.http.get(`${SERVER_ORIGIN}/colyseus/api`);
  }
  ngOnDestroy() {
    if (this.client != null) {
      this.client.close();
    }
  }
}
