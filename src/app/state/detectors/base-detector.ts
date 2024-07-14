import { Hand } from '@tensorflow-models/hand-pose-detection';
import { DetectorTypesEnum } from './detector-types.enum';

export abstract class BaseDetector {
  abstract detect(hands: Hand[]): DetectorTypesEnum;
}
