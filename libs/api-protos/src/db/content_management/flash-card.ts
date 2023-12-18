/* Used in passage content */

import {AbstractContentModel, ContentMetaInfo, isContentTypeModel} from './content';
import {
  AudioType,
  HeadingType,
  ImageType,
  SubHeadingType,
  TextCenterType,
  TextLeftType,
  TextType,
  VideoType
} from "./question";

/* Used in flash card content */
export type FlashCardElementType =
  | TextType
  | TextLeftType
  | TextCenterType
  | HeadingType
  | SubHeadingType
  | ImageType
  | VideoType
  | AudioType;

export type FlashCardTypeSer = "fc";

export interface FlashCardContentType {
  front: FlashCardElementType[];
  back: FlashCardElementType[];
  hint?: string[];
}

export interface FlashCardModel
  extends AbstractContentModel<FlashCardTypeSer, FlashCardContentType> {}

export const isFlashCardModel = (val?: unknown): val is FlashCardModel =>
  isContentTypeModel(val, "fc");

export interface FlashCardContentMetaInfo extends ContentMetaInfo {}
