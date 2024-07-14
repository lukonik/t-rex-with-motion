import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-converter';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'handpose';

  drawer = viewChild(MatDrawer);

  private dialog = inject(MatDialog);

  videoState = inject(VideoState);
  modelState = inject(ModelState);

  constructor() {}

  async ngOnInit() {}

  async ngAfterViewInit() {
    this.videoState.checkPermission().subscribe(async (stream) => {
      const video = document.getElementById('video') as any;
      video.srcObject = stream;

      this.modelState.initialize().subscribe(() => {
      
            const event = new KeyboardEvent('keydown', {
              key: ' ',
              code: 'Space',
              keyCode: 32,
            });
            document.dispatchEvent(event);

            this.modelState.proceed(video).subscribe((gesture) => {
              if (gesture === DetectorTypesEnum.SwipeUp) {
                const event = new KeyboardEvent('keydown', {
                  key: ' ',
                  code: 'Space',
                  keyCode: 32,
                });
                document.dispatchEvent(event);
              } else if (gesture === DetectorTypesEnum.SwipeRight) {
                ((window as any).runner as any).restart();
              }
            });
         
      });

    });
  }
}

