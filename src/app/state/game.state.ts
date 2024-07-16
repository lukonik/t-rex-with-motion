import { Injectable, signal } from '@angular/core';
import "./index.js";
declare var  Runner:any;

@Injectable({
    providedIn:'root'
})
export class GameState{
    isGameOver = signal(false);
    private runner:any;
    constructor(){
       
    }

    init(){
        window.addEventListener("message",({data})=>{
            if(data.event === 'gameOver'){
                this.isGameOver.set(true);
            }
            else if(data.event ==='startGame'){
                this.isGameOver.set(false);
            }
        })
      this.runner = new Runner('.interstitial-wrapper');  
      setTimeout(()=>{
        this.jump();
      },100);
    }

    restart(){
       this.runner.restart();
    }

    jump(){
        const event = new KeyboardEvent('keydown', {
            key: ' ',
            code: 'Space',
            keyCode: 32,
          });
          document.dispatchEvent(event);
    }
}