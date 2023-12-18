import {GradeType, BoardType, LevelType, ContentContextType, isObjectLiteral} from './common'
import {ContentVideoModel, isContentVideoModel} from './content-video'
import {ExperimentModel} from './experiment'
import {FlashCardModel} from './flash-card'
import {InstructionsModel, isInstructionsModel} from './instruction'
import {MindMapModel} from './mindmap'
import {PassageModel, isPassageModel} from './passage'
import {QuestionModel, isQuestionModel} from './question'

export interface AbstractContentModel<T, C> {
  content_id: string
  type: T ,
  content: C,
  content_text: string
  learning_outcome_ids: string[]
  teacher_profile_id: string
  created_on: Date
  created_by: string
  modified_on: Date
  modified_by: string
}



export interface ContentMetaInfo {
  topics?: string[]
  subTopics?: string[]
  grade?: GradeType[]
  board?: BoardType[]
  book?: string[]
  interests?: string[]
  skills?: string[]
  contextualization?: ContentContextType
  level?: LevelType
  credits?: string[]
}

//Union of each type of content
export type ContentModelType = PassageModel | ExperimentModel | ContentVideoModel | FlashCardModel | MindMapModel | InstructionsModel

export type ContentType = ContentModelType['type'];


export const isContentTypeModel = (
  val: unknown,
  type: ContentType
): boolean => {
  if (!val || !isObjectLiteral(val)) return false;
  const objType = (val as { type: unknown }).type;
  return typeof type == "string" && type == objType;
};

export const isContentModel = (val: unknown): val is ContentModelType => {
  return isPassageModel(val) ||  isInstructionsModel(val) || isContentVideoModel(val)
}
