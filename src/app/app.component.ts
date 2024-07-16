import { AfterViewInit, Component, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import fp from 'fingerpose';
import { MatDialog } from '@angular/material/dialog';
import { AskVideoPermissionComponent } from './ask-video-permission/ask-video-permission.component';
import { VideoState } from './state/video.state';
import { ModelLoadingComponent } from './model-loading/model-loading.component';
import { ModelState } from './state/model.state';
import { DetectorTypesEnum } from './state/detectors/detector-types.enum';
import { TRexGameComponent } from './t-rex-game/t-rex-game.component';
import isMobile from "is-mobile";
import { MobileNotSupportedComponent } from './mobile-not-supported/mobile-not-supported.component';
import { GameState } from './state/game.state';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule,TRexGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'handpose';

  drawer = viewChild(MatDrawer);

  private dialog = inject(MatDialog);

  videoState = inject(VideoState);
  modelState = inject(ModelState);
  gameState=inject(GameState);

  startGame=signal(false);

  async ngOnInit() {}

  async ngAfterViewInit() {
    if(isMobile()){
      this.dialog.open(MobileNotSupportedComponent,{
        disableClose:true
      });
      return;
    }

  
    this.videoState.checkPermission().subscribe(async (stream) => {
      const video = document.getElementById('video') as any;
      video.srcObject = stream;

      this.modelState.initialize().subscribe(() => {
      
        this.dialog.open(InfoComponent).afterClosed().subscribe(()=>{
          this.startGame.set(true)
        })
    

            this.modelState.proceed(video).subscribe((gesture) => {
              if (gesture === DetectorTypesEnum.SwipeUp) {
                if(this.gameState.isGameOver()){
                  this.gameState.restart();
                }
                else{
                  this.gameState.jump();
                 
                }
               
              }
            });
         
      });

    });
  }
}

