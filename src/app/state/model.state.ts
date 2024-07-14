import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelLoadingComponent } from '../model-loading/model-loading.component';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
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
import { SwipeUpDetector } from './detectors/swipe-up-detector';
import { DetectorTypesEnum } from './detectors/detector-types.enum';
import fp from 'fingerpose';
import { SwipeRightDetector } from './detectors/swipe-right-detector';
const worker = new Worker(new URL('../app.worker', import.meta.url));
@Injectable({
  providedIn: 'root',
})
export class ModelState {
  dialog = inject(MatDialog);
  private _detector!: handPoseDetection.HandDetector;
  private _gestureDetectors = [new SwipeUpDetector(), new SwipeRightDetector()];

  initialize() {
    const dialogRef = this.dialog.open(ModelLoadingComponent);

    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'tfjs' as const,
    };
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
    worker.addEventListener('message',({data})=>{
      hands$.next(data);
    })
    function detect() {
      requestAnimationFrame(async () => {
        const hands = await self._detector.estimateHands(video);
        worker.postMessage(hands);
        

        detect();
      });
    }
    detect();

    return hands$.asObservable();
  }
}
