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
export type ExperimentElementType =
  | TextType
  | TextLeftType
  | TextCenterType
  | HeadingType
  | SubHeadingType
  | ImageType
  | VideoType;

export type ExperimentTypeSer = "experiment";
export interface ExperimentModel
  extends AbstractContentModel<ExperimentTypeSer, ExperimentElementType[]> {
  title: string;
  posterImgSrc?: string;
}
export const isExperimentModel = (val?: unknown): val is ExperimentModel =>
  isContentTypeModel(val, "experiment");

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
