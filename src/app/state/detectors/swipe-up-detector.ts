import { Hand } from '@tensorflow-models/hand-pose-detection';
import { BaseDetector } from './base-detector';
import { DetectorTypesEnum } from './detector-types.enum';
import { FingerTypes } from './finger-types.enum';

export class SwipeUpDetector implements BaseDetector {
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
  