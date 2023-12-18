import {
  DifficultyLevelEnum,
  Question,
} from '@protos/content_management/content.db_pb';
import { TaskInfo } from '@protos/learning_management/lms.db_pb';
import {
  ModuleFilteredQuestions,
  TaskInfoModel,
} from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { IRequiredQuestionCountInfoForDifficultyLevel } from '../reducer/homework.slice';

export function updateApiResponse(
  apiResponse: ModuleFilteredQuestions,
  previousApiResponse: ModuleFilteredQuestions,
  newQuestionsCount: IRequiredQuestionCountInfoForDifficultyLevel
): ModuleFilteredQuestions {
  const previousQuestionsCount = {
    noOfLowQuestions: 0,
    noOfMediumQuestions: 0,
    noOfHighQuestions: 0,
  };
  // Calculate the previous count of each difficulty level in the existing response
  for (const question of previousApiResponse.questions) {
    const difficultyLevel =
      question.questionMeta?.difficultyLevel ||
      DifficultyLevelEnum.DIFFICULTY_LEVEL_UNDEFINED;
    incrementDifficultyLevelCount(previousQuestionsCount, difficultyLevel);
  }
  const updatedQuestions: Question[] = [];

  // Helper function to add questions to the updatedQuestions array based on their difficulty level and available count
  const addSubractQuestions = (
    difficulty: DifficultyLevelEnum,
    oldDifficultyCount: number,
    newDifficultyCount: number
  ) => {
    const existingQuestions = previousApiResponse.questions.filter(
      (q) => q.questionMeta?.difficultyLevel === difficulty
    );
    if (oldDifficultyCount > newDifficultyCount) {
      updatedQuestions.push(...existingQuestions.slice(0, newDifficultyCount));
    } else if (oldDifficultyCount < newDifficultyCount) {
      const newQuestions = apiResponse.questions
        .filter((q) => q.questionMeta?.difficultyLevel === difficulty)
        .filter(
          (q) =>
            !existingQuestions.some(
              (existingQ) => existingQ.questionId === q.questionId
            )
        );
      updatedQuestions.push(
        ...existingQuestions,
        ...newQuestions.slice(0, newDifficultyCount - oldDifficultyCount)
      );
    } else {
      updatedQuestions.push(...existingQuestions);
    }

    // console.log(
    //   'module_addSubractQuestions',
    //   difficulty,
    //   existingQuestions,
    //   oldDifficultyCount,
    //   newDifficultyCount,
    //   updatedQuestions
    // );
  };
  addSubractQuestions(
    DifficultyLevelEnum.DIFFICULTY_LEVEL_LOW,
    previousQuestionsCount.noOfLowQuestions,
    newQuestionsCount.noOfLowQuestions
  );
  addSubractQuestions(
    DifficultyLevelEnum.DIFFICULTY_LEVEL_MEDIUM,

    previousQuestionsCount.noOfMediumQuestions,
    newQuestionsCount.noOfMediumQuestions
  );
  addSubractQuestions(
    DifficultyLevelEnum.DIFFICULTY_LEVEL_HIGH,
    previousQuestionsCount.noOfHighQuestions,
    newQuestionsCount.noOfHighQuestions
  );
  return { questions: updatedQuestions } as ModuleFilteredQuestions;
}

const incrementDifficultyLevelCount = (
  countObject: {
    noOfLowQuestions: number;
    noOfMediumQuestions: number;
    noOfHighQuestions: number;
  },
  difficulty: DifficultyLevelEnum
) => {
  if (difficulty === DifficultyLevelEnum.DIFFICULTY_LEVEL_LOW) {
    countObject.noOfLowQuestions++;
  } else if (difficulty === DifficultyLevelEnum.DIFFICULTY_LEVEL_MEDIUM) {
    countObject.noOfMediumQuestions++;
  } else if (difficulty === DifficultyLevelEnum.DIFFICULTY_LEVEL_HIGH) {
    countObject.noOfHighQuestions++;
  }
};

export const createTaskInfoModel = (questions: Question[]): TaskInfoModel[] => {
  const arr = questions
    .filter((question) => !!question.questionId)
    .map((question, index) => {
      return new TaskInfoModel({
        questionId: question.questionId
          ? question.questionId
          : index.toString(),
        sequence: index + 1,
      });
    });
  return arr;
};

export const rearrangeTaskInfoArrayAfterDeletion = (
  deletedQuestionId: string,
  task_info_array_input?: TaskInfoModel[]
) => {
  const task_info_array = structuredClone(task_info_array_input);
  if (!task_info_array) {
    return;
  }
  const indexToDelete = task_info_array.findIndex(
    (task) => task.questionId === deletedQuestionId
  );
  if (indexToDelete !== -1) {
    task_info_array.splice(indexToDelete, 1);
  }
  // Sort the array based on the 'sequence' property in ascending order
  task_info_array.sort((a, b) => a.sequence - b.sequence);
  // Update the sequence numbers to ensure they are consecutive
  task_info_array.forEach((task, index) => {
    task.sequence = index + 1;
  });
  return task_info_array;
};

export const rearrangeTaskInfoArrayAfterAddition = (
  addedQuestionId: string,
  task_info_array_input?: TaskInfoModel[]
) => {
  const task_info_array = structuredClone(task_info_array_input);
  if (!task_info_array) {
    return;
  }
  const maxSequence = task_info_array.reduce(
    (max, task) => (task.sequence > max ? task.sequence : max),
    0
  );
  task_info_array.push(
    new TaskInfoModel({
      questionId: addedQuestionId,
      sequence: maxSequence + 1,
    })
  );
  task_info_array.sort((a, b) => a.sequence - b.sequence);
  return task_info_array;
};
export const rearrangeTaskInfoArrayAfterMove = (
  newQuestions: Question[],
  task_info_array_input?: TaskInfoModel[]
) => {
  const task_info_array = structuredClone(task_info_array_input);
  if (!task_info_array) {
    return [];
  }
  // Create a mapping of questionId to index in the newQuestions array
  const questionIdToIndexMap: { [questionId: string]: number | undefined } = {};
  for (let i = 0; i < newQuestions.length; i++) {
    const question = newQuestions[i];
    if (question.questionId !== undefined) {
      questionIdToIndexMap[question.questionId] = i;
    }
  }
  // Update the sequence numbers based on the new ordering in newQuestions
  task_info_array.forEach((task) => {
    const newIndex = questionIdToIndexMap[task.questionId];
    if (newIndex !== undefined) {
      task.sequence = newIndex + 1;
    }
  });
  // Sort the array based on the updated 'sequence' property in ascending order
  task_info_array.sort((a, b) => a.sequence - b.sequence);
  return task_info_array;
};

export const moveQuestionId = ({
  selectedTasksInfoInput,
  oldQuestionId,
  newQuestionId,
}: {
  selectedTasksInfoInput: TaskInfoModel[];
  oldQuestionId: string;
  newQuestionId: string;
}): TaskInfoModel[] => {
  const targetSequence = selectedTasksInfoInput.reduce<number | null>(
    (sequence, taskInfo) => {
      if (taskInfo.questionId === oldQuestionId) {
        return taskInfo.sequence;
      }
      return sequence;
    },
    null
  );

  if (targetSequence === null) {
    return selectedTasksInfoInput; // No matching sequence found, return original array
  }
  const arr = selectedTasksInfoInput.map((taskInfo) => {
    if (taskInfo.sequence === targetSequence) {
      return new TaskInfoModel({
        ...taskInfo,
        questionId: newQuestionId,
      });
    }
    return taskInfo;
  });

  return arr;
};
export const createQuestionCountForDifficultyLevel = (
  difficultyLevel: DifficultyLevelEnum
): IRequiredQuestionCountInfoForDifficultyLevel => {
  const questions_count: IRequiredQuestionCountInfoForDifficultyLevel = {
    noOfLowQuestions: 0,
    noOfMediumQuestions: 0,
    noOfHighQuestions: 0,
  };
  switch (difficultyLevel) {
    case DifficultyLevelEnum.DIFFICULTY_LEVEL_HIGH:
      questions_count.noOfHighQuestions = 1;
      break;
    case DifficultyLevelEnum.DIFFICULTY_LEVEL_MEDIUM:
      questions_count.noOfMediumQuestions = 1;
      break;
    case DifficultyLevelEnum.DIFFICULTY_LEVEL_LOW:
      questions_count.noOfLowQuestions = 1;
      break;
    default:
      // Handle undefined or other cases if necessary
      break;
  }
  return questions_count;
};

export function convertToSequenceInfo(
  taskInfo: TaskInfo | undefined
): TaskInfoModel[] {
  if (!taskInfo) {
    return [];
  }
  const sequenceInfo = taskInfo.taskQuestionInfo.map((questionInfo) => {
    return new TaskInfoModel({
      questionId: questionInfo.questionId,
      sequence: questionInfo.sequence,
    });
  });
  return sequenceInfo;
}

export const calculateQuestionsCount = (
  questionsList: ModuleFilteredQuestions | undefined
): IRequiredQuestionCountInfoForDifficultyLevel => {
  const questions_count = {
    noOfLowQuestions: 0,
    noOfMediumQuestions: 0,
    noOfHighQuestions: 0,
  };
  if (!questionsList) {
    return questions_count;
  }
  const list = questionsList.questions;
  for (let i = 0; i < list.length; i++) {
    switch (list[i].questionMeta?.difficultyLevel) {
      case DifficultyLevelEnum.DIFFICULTY_LEVEL_HIGH:
        questions_count.noOfHighQuestions++;
        break;
      case DifficultyLevelEnum.DIFFICULTY_LEVEL_MEDIUM:
        questions_count.noOfMediumQuestions++;
        break;
      case DifficultyLevelEnum.DIFFICULTY_LEVEL_LOW:
        questions_count.noOfLowQuestions++;
        break;
      default:
        break;
    }
  }
  return questions_count;
};
