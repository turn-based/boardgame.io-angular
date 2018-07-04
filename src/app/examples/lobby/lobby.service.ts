import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  constructor(private http: HttpClient) {
  }

  getGameTypes(): Promise<string[]> {
    return this.http.get<string[]>('http://localhost:8001/games').toPromise();
  }

  createGame(gameType: string, params?: { numPlayers: number }): Promise<{ gameID: string }> {
    return this.http.post<{ gameID: string }>(`http://localhost:8001/games/${gameType}/create`, params).toPromise();
  }

  joinGame(gameType: string, gameId: string, params?: { playerID: number, playerName: string }): Promise<{ playerCredentials: string }> {
    return this.http.post<{ playerCredentials: string }>(`http://localhost:8001/games/${gameType}/${gameId}/join`, params).toPromise();
  }
}
