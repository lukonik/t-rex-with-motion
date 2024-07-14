import { HostListener, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelLoadingComponent } from '../model-loading/model-loading.component';
import '@tensorflow/tfjs-converter';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import {
  animationFrames,
  EMPTY,
  from,
  interval,
  Observable,
  repeat,
  Subject,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import fp from 'fingerpose';
import { DetectorTypesEnum } from './detectors/detector-types.enum';
import { SwipeUpDetector } from './detectors/swipe-up-detector';
const worker = new Worker(new URL('../app.worker', import.meta.url));
@Injectable({
  providedIn: 'root',
})
export class ModelState {
  dialog = inject(MatDialog);
  private _detector!: handPoseDetection.HandDetector;
  private _gestureDetectors = [new SwipeUpDetector()];

  initialize() {
    const dialogRef = this.dialog.open(ModelLoadingComponent);


    window.addEventListener("message",({data})=>{
      if(data.event==='gameOver'){
        worker.postMessage({event:'gameOver'})
      }
    })

    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig =  { runtime: 'mediapipe',  solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands/" } as any;
    return from(handPoseDetection.createDetector(model, detectorConfig)).pipe(
      tap((detector) => {
        this._detector = detector;
        dialogRef.close();
      })
    );
  }


  proceed(video: HTMLCanvasElement) {
    return this.detect(video);
  }

  private detect(video: HTMLCanvasElement) {
    const self = this;

    const hands$ = new Subject<DetectorTypesEnum>();
   
    function detect() {
      requestAnimationFrame(async () => {
        const hands = await self._detector.estimateHands(video);
        
        for(const gestureDetector of self._gestureDetectors){
          const detected = gestureDetector.detect(hands);
          if (detected !== DetectorTypesEnum.None) {
            hands$.next(detected)
          }
        }
        detect();
      });
    }
    detect();

    return hands$.asObservable();
  }
}
