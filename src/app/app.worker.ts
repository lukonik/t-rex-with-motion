/// <reference lib="webworker" />

import { Hand } from '@tensorflow-models/hand-pose-detection';
import { BaseDetector } from './state/detectors/base-detector';
import { DetectorTypesEnum } from './state/detectors/detector-types.enum';
import { FingerTypes } from './state/detectors/finger-types.enum';


 class SwipeRightDetector implements BaseDetector {
 

  private _fingerTipStates = new Map<FingerTypes, number | null>([
    [FingerTypes.IndexFingerTip, null],
    [FingerTypes.IndexFingerDIP, null],
    [FingerTypes.MiddleFingerTip, null],
    [FingerTypes.MiddleFingerDIP, null],
    [FingerTypes.RingFingerTip, null],
    [FingerTypes.RingFingerDIP, null],
  ]);

  detect(hands: Hand[]): DetectorTypesEnum {
    if (!hands.length) {
      return DetectorTypesEnum.None;
    }
    let isSwipeRight = false;

    const keypoints = hands.map((h) => h.keypoints).flat();
    for (const fingerType of this._fingerTipStates.keys()) {
      const keypoint = keypoints.find((key) => key.name === fingerType);
      const fingerState = this._fingerTipStates.get(fingerType);
      if (keypoint) {
        const newX = keypoint.x;

        if (fingerState === null) {
          this._fingerTipStates.set(fingerType, newX);
          continue;
        }
        if (this.isSwipeUp(fingerType, newX)) {
          this._fingerTipStates.set(fingerType, newX);
          isSwipeRight = true;
        } else {
          this._fingerTipStates.set(fingerType, newX);
        }
      }
    }

    return isSwipeRight ? DetectorTypesEnum.SwipeRight : DetectorTypesEnum.None;
  }

  reset(): void {
    for (const fingerType of this._fingerTipStates.keys()) {
      this._fingerTipStates.set(fingerType,null);
    }
  }

  private isSwipeUp(type: FingerTypes, newX: number) {
    const prevX = this._fingerTipStates.get(type);
    if (prevX === null || prevX === undefined) {
      return false;
    }
    return prevX - newX > 10;
  }
}



 class SwipeUpDetector implements BaseDetector {
  prevY: number | null = null;

  private _fingerTipStates = new Map<FingerTypes, number | null>([
    [FingerTypes.IndexFingerTip, null],
    [FingerTypes.IndexFingerDIP, null],
    [FingerTypes.MiddleFingerTip, null],
    [FingerTypes.MiddleFingerDIP, null],
    [FingerTypes.RingFingerTip, null],
    [FingerTypes.RingFingerDIP, null],
  ]);

  detect(hands: Hand[]): DetectorTypesEnum {
    if (!hands.length) {
      return DetectorTypesEnum.None;
    }
    let isSwipeUp = false;

    const keypoints = hands.map((h) => h.keypoints).flat();
    for (const fingerType of this._fingerTipStates.keys()) {
      const keypoint = keypoints.find((key) => key.name === fingerType);
      const fingerState = this._fingerTipStates.get(fingerType);
      if (keypoint) {
        const newY = keypoint.y;

        if (fingerState === null) {
          this._fingerTipStates.set(fingerType, newY);
          continue;
        }
        if (this.isSwipeUp(fingerType, newY)) {
          this._fingerTipStates.set(fingerType, newY);
          isSwipeUp = true;
        } else {
          this._fingerTipStates.set(fingerType, newY);
        }
      }
    }

    return isSwipeUp ? DetectorTypesEnum.SwipeUp : DetectorTypesEnum.None;
  }

  private isSwipeUp(type: FingerTypes, newY: number) {
    const prevY = this._fingerTipStates.get(type);
    if (prevY === null || prevY === undefined) {
      return false;
    }
    return prevY - newY > 10;
  }
  reset(): void {
    for (const fingerType of this._fingerTipStates.keys()) {
      this._fingerTipStates.set(fingerType,null);
    }
  }
}


const gestureDetectors = [new SwipeRightDetector(),new SwipeUpDetector()];


addEventListener('message', ({ data }) => {
  if(data.event ==='gameOver'){
    for(const gestureDetector of gestureDetectors){
      gestureDetector.reset()
    }
  }
  else if(data.event==='hand'){
    for(const gestureDetector of gestureDetectors){
      const detected = gestureDetector.detect(data.data);
      if (detected !== DetectorTypesEnum.None) {
        postMessage(detected);
        break;
      }
    }
  }

});
