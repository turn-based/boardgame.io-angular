import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_ORIGIN } from '../../site-config';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  constructor(private http: HttpClient) {
  }

  getGameTypes(): Promise<string[]> {
    return this.http.get<string[]>(`${SERVER_ORIGIN}/api/v1/games`).toPromise();
  }

  createGame(gameType: string, params?: { numPlayers: number }): Promise<{ gameID: string }> {
    return this.http.post<{ gameID: string }>(`${SERVER_ORIGIN}/api/v1/games/${gameType}/create`, params).toPromise();
  }

  joinGame(gameType: string, gameId: string, params?: { playerID: number, playerName: string }): Promise<{ playerCredentials: string }> {
    return this.http.post<{ playerCredentials: string }>(
      `${SERVER_ORIGIN}/api/v1/games/${gameType}/${gameId}/join`, params
    ).toPromise();
  }
}
