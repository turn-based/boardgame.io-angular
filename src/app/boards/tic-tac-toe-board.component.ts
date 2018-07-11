import { Component, Input } from '@angular/core';

@Component({
  selector: 'tb-tic-tac-toe-board',
  template: `
    <div>
      <table class="tic-tac-toe-board">
        <tr *ngFor="let i of [0, 1, 2]">
          <ng-container *ngFor="let j of [0, 1, 2]">
            <td *ngxInit="3 * i + j as id" [ngClass]="{active: isCellActive(id)}" (click)="onClick(id)">{{G.cells[id]}}</td>
          </ng-container>
        </tr>
      </table>
      <div *ngIf="!isPreview && playerID !== null">Player: {{playerID}}</div>
      <ng-container *ngIf="ctx.gameover">
        <div class="winner">
          {{ctx.gameover.winner !== undefined ? 'Winner: ' + ctx.gameover.winner : 'Draw!'}}
        </div>
      </ng-container>
      <!--<div *ngIf="!isPreview && isMultiplayer && !isConnected">Disconnected</div>-->
    </div>
  `,
  styleUrls: ['./tic-tac-toe-board.component.scss']
})
export class TicTacToeBoardComponent {
  @Input() G: any;
  @Input() ctx: any;
  @Input() moves: any;
  @Input() playerID: string;
  @Input() isActive: boolean;
  @Input() isMultiplayer: boolean;
  @Input() isConnected: boolean;
  @Input() isPreview: boolean;

  onClick(id) {
    if (this.isCellActive(id)) {
      this.moves.clickCell(id);
    }
  }

  isCellActive(id) {
    return this.isActive && this.G.cells[id] === null;
  }
}
