import {AbstractContentModel, isContentTypeModel} from './content';
import {
  HeadingType,
  ImageType,
  SubHeadingType,
  TextCenterType,
  TextLeftType,
  TextType,
  VideoType
} from "./question";

/* Used in passage content */
export type MindMapElementType =
  | TextType
  | TextLeftType
  | TextCenterType
  | HeadingType
  | SubHeadingType
  | ImageType
  | VideoType;

export type MindMapTypeSer = "mindmap";
export interface MindMapModel
  extends AbstractContentModel<MindMapTypeSer, MindMapElementType[]> {
  title: string;
  posterImgSrc?: string;
}
export const isMindMapModel = (val?: unknown): val is MindMapModel =>
  isContentTypeModel(val, "mindmap");

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
