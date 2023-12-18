/********* RESPONSES *********/
//Reponse of one question/subactivity
export interface ContentAttempt {
  //time will store serialized dates
  startTime?: number;
  endTime?: number;
  answer?: string[]; //stores the answers marked if it was a question type
}

export interface ContentResponse {
  //Content Id
  content_id: string;
  //Attempts of the content
  attempts: ContentAttempt[];
}

/** Utility function to create a K:V from a list of strings */
export const strEnum = <T extends string>(o: Array<T>): { [K in T]: K } =>
  o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));

export const AcademicYearEnum = strEnum([
  '2017-2018',
  '2018-2019',
  '2019-2020',
  '2020-2021',
  '2021-2022',
  '2022-2023',
  '2023-2024',
]);
export type AcademicYearType = keyof typeof AcademicYearEnum;

//Map of content Id to responses
export type ContentListResponse = ContentResponse[];

//Supported session modes for resource responses
export type SessionModeEnum =
  | 'lesson'
  | 'learn'
  | 'assessment'
  | 'revise'
  | 'test'
  | 'practice';
export type SessionStatusEnum = 'ongoing' | 'exited' | 'completed';

export interface ResourceResponseModel {
  id: string;
  studentId: string;
  resourceId: string;
  contentIds: string[];
  response: ContentListResponse;
  sessionMode: SessionModeEnum;
  sessionStatus: SessionStatusEnum;
  academicYear: AcademicYearType;
}

export type SessionStatus = 'active' | 'ended';
export type SessionEndedByType = 'system' | 'teacher';
