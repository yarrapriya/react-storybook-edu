// import {LevelType, arrToRegEx, strEnum} from './common';

import {
  LevelType,
  TFAnswerType,
  arrToRegEx,
  isObjectLiteral,
  strEnum,
} from './common';

export type QuestionTypeSer = 'question';
export interface AbstractQuestionModel<T, C> {
  question_id: string;
  type: T;
  question_content: C;
  question_text: string;
  learning_outcomes: string[];
  question_meta: QuestionMetaInfo;
  teacher_profile_id?: string;
  created_on: Date;
  created_by: string;
  modified_on: Date;
  modified_by: string;
}

export interface QuestionMetaInfo {
  module: string[]; //DECIDE: ids or strings?
  learning_outcome: string[];
  bookId: string;
  difficulty_level?: LevelType;
  credits?: string[];
}
export interface BookContentInfo {
  book_name: string;
  book_page_number?: number;
  book_id?: string;
}

export type ImplementedQuestionModel =
  | FibModel
  | TfModel
  | McqSingleModel
  | McqMultipleModel
  | LongQuesModel
  | ShortQuesModel
  | MTFSingleQuesModel;

export interface TextType {
  text: string;
}
export interface TextLeftType {
  textLeft: string;
}
export interface TextCenterType {
  textCenter: string;
}
export interface HeadingType {
  heading: string;
}
export interface SubHeadingType {
  subHeading: string;
}

export interface ImageType {
  image_url: string;
  image_name: string;
  thumbnail: string;
  credit: string;
}

export interface ExtractType {
  extract: string;
}

export interface TableType {
  table: TableDataModel;
}

export interface VideoType {
  video_url: string;
  video_name: string;
  thumbnail: string;
  credit: string;
}

export interface AudioType {
  audio_url: string;
  audio_name: string;
  thumbnail: string;
  credit: string;
}

export type TableContentType = TextType | ImageType;

export interface TableDataModel {
  title?: string;
  has_header?: boolean;
  content: TableContentType[][];
  merged_cells: MergedCellsInfo[]; //relative to content of table component
}

export interface MergedCellsInfo {
  start: Cell;
  end: Cell;
}

export interface Cell {
  row: number;
  column: number;
}

export type ContentElementType =
  | TextType
  | TextCenterType
  | ImageType
  | TableType
  | ExtractType
  | TextLeftType
  | HeadingType;

export interface QuestionCommonContentModel {
  elements: ContentElementType[]; //array of {"text": "<content>"}, {"image": "<image url/id>"}
  time: number;
  marks: number[];
  solution?: SolutionElementType[];
  ans_explanation?: string[];
  hint?: string[];
}

export interface FibModel
  extends AbstractQuestionModel<'fib', FibContentModel> {}
export interface FibContentModel extends QuestionCommonContentModel {
  correct: string[][];
}

export interface TfModel extends AbstractQuestionModel<'tf', TfContentModel> {}
export interface TfContentModel extends QuestionCommonContentModel {
  correct: TFAnswerType;
}

export interface McqSingleModel
  extends AbstractQuestionModel<'mcq_s', McqSingleContentModel> {}
export interface McqSingleContentModel extends QuestionCommonContentModel {
  options: OptionsType[];
  correct: string;
}

export interface McqMultipleModel
  extends AbstractQuestionModel<'mcq_m', McqMultipleContentModel> {}
export interface McqMultipleContentModel extends QuestionCommonContentModel {
  options: OptionsType[];
  correct: string[];
}

export interface ArrangeQuestionModel
  extends AbstractQuestionModel<'arrange', ArrangeQuestionContentModel> {}
export interface ArrangeQuestionContentModel
  extends QuestionCommonContentModel {
  options: OptionsType[];
  correct: string[]; //Sequence is given here
}

export interface LongQuesModel
  extends AbstractQuestionModel<'long', LongQuesContentModel> {}
export interface LongQuesContentModel extends QuestionCommonContentModel {
  correct: string[];
}

export interface ShortQuesModel
  extends AbstractQuestionModel<'short', FibContentModel> {}
export interface ShortQuesContentModel extends QuestionCommonContentModel {
  correct: string;
}

export interface MTFSingleQuesModel
  extends AbstractQuestionModel<'mtf_s', MTFSingleQuesContentModel> {}
export interface MTFSingleQuesContentModel extends QuestionCommonContentModel {
  left_options: OptionsType[]; //["a", "img_b", "c"]
  right_options: OptionsType[]; //["x", "img_y", "z"]
  correct_response_indices: string[][]; //["a": ["x", "img_y"], "b": ["img_y"], "c": ["z"]]
}

//Question Types
export const QuestionEnum = strEnum([
  'tf',
  'fib',
  'mcq_s',
  'mcq_m',
  'mtf_s',
  'mtf_m',
  'short',
  'long',
  'arrange',
]);
export type QuestionType = keyof typeof QuestionEnum;
export const questionTypeList = Object.keys(QuestionEnum) as QuestionType[];
export const qusetionTypeRegEx = arrToRegEx(questionTypeList);
export const isQuestionType = (val?: string): val is QuestionType =>
  !!val && qusetionTypeRegEx.test(val);
export const questionTypeTitle = (type: QuestionType): string => {
  switch (type) {
    case 'tf':
      return 'True False';
    case 'fib':
      return 'Fill in the blanks';
    case 'mcq_s':
      return 'MCQ Single';
    case 'mcq_m':
      return 'MCQ Multiple';
    case 'mtf_s':
      return 'MTF Single';
    case 'mtf_m':
      return 'MTF Multiple';
    case 'short':
      return 'Short';
    case 'long':
      return 'Long';
    case 'arrange':
      return 'Arrange';
  }
};

export type OptionsType = TextType | ImageType;
export type CorrectAnswerType = (string | string[])[];
export type QuestionContentElementType =
  | TextType
  | TextCenterType
  | ImageType
  | TableType
  | ExtractType;
export type SolutionElementType =
  | TextType
  | TextCenterType
  | ImageType
  | VideoType;

export interface QuestionContentModel {
  elements: QuestionContentElementType[]; //array of {"text": "<content>"}, {"image": "<image url/id>"}
  time: number;
  marks: number[];
  solution?: SolutionElementType[];
  verticalImage?: string;
  ansExplanation?: string[];
  hint?: string[];
}
export type ImplementedQuestionTypes = ImplementedQuestionModel['type'];
export const ImplementedQuestionTypeList: ImplementedQuestionTypes[] = [
  'fib',
  'tf',
  'mcq_s',
  'mcq_m',
];
export const isImplementedQuestionType = (
  type: QuestionType
): type is ImplementedQuestionTypes =>
  ImplementedQuestionTypeList.some((t) => t == type);
export const isImplementedQuestionModel = (
  val?: QuestionModel
): val is ImplementedQuestionModel => {
  return !!(
    val &&
    isObjectLiteral(val) &&
    isQuestionType(val.type) &&
    isImplementedQuestionType(val.type)
  );
};

export type NonImplementedQuestionModel = AbstractQuestionModel<
  NotImplementedQuestionTypes,
  QuestionContentModel
>;
export type NotImplementedQuestionTypes = Exclude<
  QuestionType,
  ImplementedQuestionModel['type']
>;

export type QuestionModel =
  | ImplementedQuestionModel
  | NonImplementedQuestionModel;
export const isQuestionModel = (val?: unknown): val is QuestionModel => {
  if (!val || !isObjectLiteral(val)) return false;
  const type = (val as { type: unknown }).type;
  return typeof type == 'string' && isQuestionType(type);
};

// export type ContentMapType = { [contentId: string]: ContentModelType }

// export const getContent = (contentMap: ContentMapType, cId: string): ContentModelType => {
//   const content = contentMap[cId]
//   if (!content) { throw Error(`Content ${cId} is missing in content map`) }
//   return content
// }

// export const getQuestion = (contentMap: ContentMapType, cId: string): QuestionModel => {
//     const content = getContent(contentMap, cId)
//     if (!isQuestionModel(content)) { throw Error(`Content '${cId}' is not a question`) }
//     return content
// }

// export const isSingleCorrectQuestions = (val?: unknown): val is QuestionModel => {
//     if (!val || !isObjectLiteral(val)) return false
//     const type = (val as { type: unknown }).type
//     return typeof type == "string" && (type == "mcq_s" || type == "tf")

// }
