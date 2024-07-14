import { Hand } from '@tensorflow-models/hand-pose-detection';
import { BaseDetector } from './base-detector';
import { DetectorTypesEnum } from './detector-types.enum';
import { FingerTypes } from './finger-types.enum';

export class SwipeRightDetector implements BaseDetector {
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

  private isSwipeUp(type: FingerTypes, newX: number) {
    const prevX = this._fingerTipStates.get(type);
    if (prevX === null || prevX === undefined) {
      return false;
    }
    return prevX - newX > 10;
  }
}
