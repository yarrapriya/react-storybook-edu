import { PersonAuthType } from "./common";
import {AbstractContentModel, isContentTypeModel} from './content';
import { PersistableObject } from "./meta";
import {
  VideoType
} from "./question";

export type ContentVideoElementType = VideoType;

export type ContentVideoTypeSer = "content-video";

export interface ContentVideoModel
  extends AbstractContentModel<ContentVideoTypeSer, ContentVideoElementType[]> {
  title: string;
  description: string;
  solutionOfQuesCId?: string; // this is used to map the question cId of which the video is a solution
}
export const isContentVideoModel = (val?: unknown): val is ContentVideoModel =>
  isContentTypeModel(val, "content-video");
export const isContentVideoSolutionModel = (
  val: ContentVideoModel
): Boolean => {
  if (val.solutionOfQuesCId == undefined) return false;
  else return true;
};

// const sampleContentContentVideoUnit: ContentVideoModel = {
//     id: "8568658546446546",
//     type: "content-video",
//     title: "The Force of Dhoni",
//     description: "ContentVideo of Dhoni hitting a six in the world cup final is used to show real world application of force and how it changes the speed and direction of objects.",
//     content: [
//         {
//             video_url: "g6.s.living-non-living-things.p1_cbse/video/multicellular-organisms-ad31b7bbe4-1280x720.mp4",
//             thumbnail: "g6.s.living-non-living-things.p1_cbse/img/amoeba-657a5df854-450x356.mp4",
//             video_name: "string",
//             credit: "string"
//         }
//     ],
//     contentMeta: {}
// }

export interface PlayPauseTime {
  playTime: number; // all times in seconds
  pauseTime?: number;
}

export interface ContentVideoViewTimes {
  videoDuration: number;
  totalViewTime: number;
  viewTimes: PlayPauseTime[];
}

export interface ContentVideoViewStats extends ContentVideoViewTimes {
  contentId: string;
  personId: string;
  personType: PersonAuthType;
}

export interface ContentVideoViewStatsPersistable
  extends ContentVideoViewStats,
    PersistableObject {}
