import { AfterViewInit, Component, inject } from '@angular/core';
import { GameState } from '../state/game.state';

@Component({
  selector: 'app-t-rex-game',
  standalone: true,
  imports: [],
  templateUrl: './t-rex-game.component.html',
  styleUrl: './t-rex-game.component.scss'
})
export class TRexGameComponent implements AfterViewInit {
  private gameState=inject(GameState);
  constructor(){
    
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.gameState.init();
    },100)
  }
}
