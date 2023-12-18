import {AbstractContentModel, isContentTypeModel} from './content';

export function isPositiveInt(val: string | number): boolean {
  const newVal = typeof val == "string" ? parseInt(val) : val;
  return !isNaN(newVal) && newVal > 0 && Number.isSafeInteger(newVal);
}

export type InstructionType = { [x: string]: string };

export type InstructionScreenNoType =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";
export const isInstructionScreenKeyType = (
  val: string
): val is InstructionScreenNoType => isPositiveInt(val);

export type InstructionScreens = {
  [screenNo in InstructionScreenNoType]?: InstructionType[];
};

export type InstructionsTypeSer = "instructions";

export interface InstructionsModel
  extends AbstractContentModel<InstructionsTypeSer, InstructionScreens> {
  title: string;
  posterImgSrc?: string;
}

export const isInstructionsModel = (val?: unknown): val is InstructionsModel =>
  isContentTypeModel(val, "instructions");
