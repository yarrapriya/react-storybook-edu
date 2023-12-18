import { Timestamp } from '@bufbuild/protobuf';
import { IClassAndSubjectSelected } from '@geneo2-web/shared-ui';
import {
  DifficultyLevelEnum,
  Question_QuestionEnum,
  ResourceCategoryEnum,
  Resource_ResourceEnum,
} from '@protos/content_management/content.db_pb';
import { TeacherLoginResponseType } from '@protos/user_management/ums.login.apis_pb';
interface QuestionCounts {
  noOfLowQuestions: number;
  noOfMediumQuestions: number;
  noOfHighQuestions: number;
}

interface TimeRange {
  min: number;
  max: number;
}

export const calculateMinMaxTime = (
  questionsCount: QuestionCounts
): TimeRange => {
  const lowTimeRange: TimeRange = { min: 1, max: 2 };
  const mediumTimeRange: TimeRange = { min: 3, max: 4 };
  const highTimeRange: TimeRange = { min: 5, max: 6 };

  const totalMinTime =
    questionsCount.noOfLowQuestions * lowTimeRange.min +
    questionsCount.noOfMediumQuestions * mediumTimeRange.min +
    questionsCount.noOfHighQuestions * highTimeRange.min;

  const totalMaxTime =
    questionsCount.noOfLowQuestions * lowTimeRange.max +
    questionsCount.noOfMediumQuestions * mediumTimeRange.max +
    questionsCount.noOfHighQuestions * highTimeRange.max;

  return { min: totalMinTime, max: totalMaxTime };
};

export const totalNoQuestions = (questionsCount: QuestionCounts): number => {
  const totalQuestions =
    questionsCount.noOfLowQuestions +
    questionsCount.noOfMediumQuestions +
    questionsCount.noOfHighQuestions;
  return totalQuestions;
};

interface Info {
  icon: string;
  name: string;
}

export const resourceTypeName = (resourceType: Resource_ResourceEnum): Info => {
  const result: Info = { icon: '', name: '' };

  switch (resourceType) {
    case Resource_ResourceEnum.RESOURCE_TYPE_VIDEO:
      result.icon = 'video-green';
      result.name = 'Video';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_AUDIO:
      result.icon = '';
      result.name = 'Audio';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_READING:
      result.icon = 'reading-green';
      result.name = 'Reading';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_QUESTION_SET:
      result.icon = 'questions';
      result.name = 'Question Set';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_QUESTION:
      result.icon = 'questions';
      result.name = 'Question';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_PRACTICE:
      result.icon = 'test-green';
      result.name = 'Practice';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_TEST:
      result.icon = 'test-green';
      result.name = 'Test';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_ACTIVITY:
      result.icon = 'questions';
      result.name = 'Activity';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_SIMULATION:
      result.icon = '';
      result.name = 'Simulation';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_EXPLORIMENT:
      result.icon = '';
      result.name = 'Experiment';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_GAME:
      result.icon = '';
      result.name = 'Game';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_AR_VR:
      result.icon = '';
      result.name = 'AR VR';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_PPT:
      result.icon = '';
      result.name = 'PPT';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_E_BOOK:
      result.icon = '';
      result.name = 'E-Book';
      break;

    case Resource_ResourceEnum.RESOURCE_TYPE_PDF:
      result.icon = 'pdf-green';
      result.name = 'PDF';
      break;

    case 16:
      result.icon = '';
      result.name = 'Flashcards';
      break;

    case 17:
      result.icon = '';
      result.name = 'Mindmap';
      break;

    default:
      break;
  }

  return result;
};

export const toDifficultyEnum = (value: string | null): DifficultyLevelEnum => {
  switch (value) {
    case 'Easy':
      return DifficultyLevelEnum.DIFFICULTY_LEVEL_LOW;
    case 'Medium':
      return DifficultyLevelEnum.DIFFICULTY_LEVEL_MEDIUM;
    case 'Hard':
      return DifficultyLevelEnum.DIFFICULTY_LEVEL_HIGH;
    default:
      return DifficultyLevelEnum.DIFFICULTY_LEVEL_UNDEFINED;
  }
};

export const toStringDifficulty = (
  difficulty: string | DifficultyLevelEnum
): string => {
  switch (difficulty) {
    case 'DIFFICULTY_LEVEL_LOW':
      return 'Easy';
    case 'DIFFICULTY_LEVEL_MEDIUM':
      return 'Medium';
    case 'DIFFICULTY_LEVEL_HIGH':
      return 'Hard';
    default:
      return 'DIFFICULTY_LEVEL_UNDEFINED';
  }
};

export const difficultyValuesArray = Object.values(DifficultyLevelEnum)
  .filter((e) => typeof e === 'string' && e !== 'DIFFICULTY_LEVEL_UNDEFINED')
  .map((value) => toStringDifficulty(value));

export const toQuestionEnum = (
  value?: string | null
): Question_QuestionEnum => {
  if (!value) {
    return Question_QuestionEnum.QUESTION_TYPE_UNDEFINED;
  }
  switch (value) {
    case 'Fill in the Blanks':
      return Question_QuestionEnum.QUESTION_TYPE_FIB;
    case 'Match the Following':
      return Question_QuestionEnum.QUESTION_TYPE_MTF;
    case 'Multiple Choice Single Answer':
      return Question_QuestionEnum.QUESTION_TYPE_MCQS;
    case 'Multiple Choice Multiple Answers':
      return Question_QuestionEnum.QUESTION_TYPE_MCQM;
    case 'True/False':
      return Question_QuestionEnum.QUESTION_TYPE_TF;
    case 'Short Answer':
      return Question_QuestionEnum.QUESTION_TYPE_SHORT;
    case 'Long Answer':
      return Question_QuestionEnum.QUESTION_TYPE_LONG;
    case 'Arrange in Order':
      return Question_QuestionEnum.QUESTION_TYPE_ARRANGE;
    case 'Very Short Answer':
      return Question_QuestionEnum.QUESTION_TYPE_VERY_SHORT;
    case 'Label':
      return Question_QuestionEnum.QUESTION_TYPE_LABEL;
    default:
      return Question_QuestionEnum.QUESTION_TYPE_UNDEFINED;
  }
};

export const toStringQuestion = (
  questionType: string | Question_QuestionEnum
): string => {
  switch (questionType) {
    case 'QUESTION_TYPE_FIB':
      return 'Fill in the Blanks';
    case 'QUESTION_TYPE_MTF':
      return 'Match the Following';
    case 'QUESTION_TYPE_MCQS':
      return 'Multiple Choice Single Answer';
    case 'QUESTION_TYPE_MCQM':
      return 'Multiple Choice Multiple Answers';
    case 'QUESTION_TYPE_TF':
      return 'True/False';
    case 'QUESTION_TYPE_SHORT':
      return 'Short Answer';
    case 'QUESTION_TYPE_LONG':
      return 'Long Answer';
    case 'QUESTION_TYPE_ARRANGE':
      return 'Arrange in Order';
    case 'QUESTION_TYPE_VERY_SHORT':
      return 'Very Short Answer';
    case 'QUESTION_TYPE_LABEL':
      return 'Label';
    default:
      return 'QUESTION_TYPE_UNDEFINED';
  }
};

export const questionValuesArray = Object.values(Question_QuestionEnum)
  .filter((e) => typeof e === 'string' && e !== 'QUESTION_TYPE_UNDEFINED')
  .filter((value) => {
    switch (value) {
      case 'QUESTION_TYPE_MTF':
      case 'QUESTION_TYPE_SHORT':
      case 'QUESTION_TYPE_LONG':
      case 'QUESTION_TYPE_ARRANGE':
      case 'QUESTION_TYPE_VERY_SHORT':
      case 'QUESTION_TYPE_LABEL':
        return false; // Exclude the commented values
      default:
        return true;
    }
  })
  .map((value) => toStringQuestion(value));

// export const combineStartTimeAndDate = (startTimeObj: {
//   timeValue: string;
//   dateValue: string;
// }): string => {
//   const { timeValue, dateValue } = startTimeObj;
//   // Extract the year, month, and day from the startDate
//   const startDateObj = new Date(dateValue);
//   const year = startDateObj.getFullYear();
//   const month = startDateObj.getMonth() + 1; // Months are zero-based, so we add 1
//   const day = startDateObj.getDate();
//   // Parse the hours and minutes from the startTime
//   const [hours, minutes] = timeValue.split(':').map(Number);
//   // Create a new Date object with the combined components
//   const combinedDate = new Date(year, month - 1, day, hours, minutes);
//   // Get the ISO timestamp
//   const isoTimestamp = combinedDate.toISOString();
//   return isoTimestamp;
// };
export const combineStartTimeAndDate = (startTimeObj: {
  timeValue: string;
  dateValue: string;
}): string => {
  const { timeValue, dateValue } = startTimeObj;
  // Parse the provided dateValue as an ISO string (assumed to be in IST)
  const startDateObj = new Date(dateValue);
  // Extract the year, month, day, hours, and minutes from the startDate
  const year = startDateObj.getUTCFullYear();
  const month = startDateObj.getUTCMonth() + 1; // Months are zero-based, so we add 1
  const day = startDateObj.getUTCDate();
  const hours = startDateObj.getUTCHours();
  const minutes = startDateObj.getUTCMinutes();
  // Parse the hours and minutes from the startTime
  const [timeHours, timeMinutes] = timeValue.split(':').map(Number);
  // Create a new Date object with the combined components
  const combinedDate = new Date(year, month - 1, day, timeHours, timeMinutes);
  // Get the ISO timestamp in IST
  const isoTimestamp = combinedDate.toISOString();
  return isoTimestamp;
};

export function convertIsoStringToTimestamp(isoDateString: string): Timestamp {
  // Parse the ISO date string into a JavaScript Date object
  const dateObject = new Date(isoDateString);
  // Get the Unix timestamp (milliseconds since January 1, 1970)
  const unixTimestampMs = dateObject.getTime();
  // Create a google.protobuf.Timestamp object using the Unix timestamp
  const timestamp = new Timestamp();
  timestamp.seconds = BigInt(Math.floor(unixTimestampMs / 1000));
  timestamp.nanos = (unixTimestampMs % 1000) * 1000000;
  return timestamp;
}
export function convertTimeStringToTimestamp(timeString: string): Timestamp {
  // Split the time string to extract the hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);
  // Create a JavaScript Date object with the current date and extracted hours and minutes
  const currentDate = new Date();
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);
  // Get the Unix timestamp (milliseconds since January 1, 1970)
  const unixTimestampMs = currentDate.getTime();

  // Create a google.protobuf.Timestamp object using the Unix timestamp
  const timestamp = new Timestamp();
  timestamp.seconds = BigInt(Math.floor(unixTimestampMs / 1000));
  timestamp.nanos = (unixTimestampMs % 1000) * 1000000;
  return timestamp;
}
//
export const getResourceCategory = (
  categoryNumber: ResourceCategoryEnum
): string => {
  let returnValue = '';

  switch (categoryNumber) {
    case ResourceCategoryEnum.RESOURCE_CATEGORY_HOOK:
      returnValue = 'Hook';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_EXPLANATION:
      returnValue = 'Explanation';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_SOLVED_EXAMPLES:
      returnValue = 'Solved Examples';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_EXAMPLES:
      returnValue = 'Examples';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_PRACTICE:
      returnValue = 'Practice';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_REVISION:
      returnValue = 'Revision';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_REAL_LIFE_CONNECT:
      returnValue = 'Real Life Connect';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_ACTIVITY:
      returnValue = 'Activity';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_COMPETENCY_BASED_QUESTIONS:
      returnValue = 'Competency Based Questions';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_INTRODUCTION:
      returnValue = 'Introduction';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_COMPETITIVE_EXAM:
      returnValue = 'Competitive Exam';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_READING:
      returnValue = 'Reading';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_RECITATION:
      returnValue = 'Recitation';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_END_OF_CHAPTER:
      returnValue = 'End of Chapter';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_GRAMMAR:
      returnValue = 'Grammar';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_END_OF_POEM:
      returnValue = 'Poem';
      break;

    case ResourceCategoryEnum.RESOURCE_CATEGORY_TEST_PAPER:
      returnValue = 'Test Paper';
      break;

    default:
      break;
  }

  return returnValue;
};

export const findSectionIdFromClassSection = (user_info?: TeacherLoginResponseType, class_subject_info?: IClassAndSubjectSelected, section?: string, classId?: number) => {
  let sectionId: number | undefined;

  user_info?.teachClassSubjects.forEach((classData) => {
    classData.subjects.forEach((subjectData) => {
      if (class_subject_info?.section === section && class_subject_info?.classId == classId) {
        sectionId = class_subject_info?.sectionId;
      }
    });
  });

  return sectionId;
};
