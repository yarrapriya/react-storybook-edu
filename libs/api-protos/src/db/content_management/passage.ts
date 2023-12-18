import {AbstractContentModel, isContentTypeModel} from './content';
import {
  HeadingType,
  ImageType,
  SubHeadingType,
  TextCenterType,
  TextLeftType,
  TextType,
  VideoType,
} from "./question";

/* Used in passage content */
export type PassageElementType =
  | TextType
  | TextLeftType
  | TextCenterType
  | HeadingType
  | SubHeadingType
  | ImageType
  | VideoType;

export type PassageTypeSer = "passage";
export interface PassageModel
  extends AbstractContentModel<PassageTypeSer, PassageElementType[]> {
  title: string;
  posterImgSrc?: string;
}
export const isPassageModel = (val?: unknown): val is PassageModel =>
  isContentTypeModel(val, "passage");

const checkType = <T>(obj: any, fieldsToCheck: (keyof T)[]): boolean => {
  if (obj != null) {
    let keys = Object.keys(obj);
    return (
      keys.length == fieldsToCheck.length &&
      fieldsToCheck.every((field) => keys.some((key) => key == field))
    );
  }
  return false;
};
