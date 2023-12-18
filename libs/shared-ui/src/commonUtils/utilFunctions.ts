import { Message, PlainMessage, Timestamp } from '@bufbuild/protobuf';
import {
  DifficultyLevelEnum,
  ResourceCategoryEnum,
  Resource_ResourceEnum,
} from '@protos/content_management/content.db_pb';
import {
  SubjectList,
  TeachClassSubjects,
} from '@protos/user_management/ums.login.apis_pb';

export function isValidMobileNumber(input: string): boolean {
  // Number can start with either 6, 7, 8, or 9.
  // The number can also start with "+91" followed by 10 digits. This is optional
  // const indianMobileNumberRegex = /^(\+91)?[6-9]\d{9}$/;
  const indianMobileNumberRegex = new RegExp('^[6-9][0-9]{7,11}$');
  return indianMobileNumberRegex.test(input);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
interface IlocalStorageKeys {
  userId: string;
  token: string;
  subjectId: string;
  role: 'teacher' | 'student';
  auth: 'true' | 'false';
}
export function setLocalStorage(key: keyof IlocalStorageKeys, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function deleteLocalStorage(key: keyof IlocalStorageKeys) {
  localStorage.removeItem(key);
}
export function clearLocalStorageKeys() {
  const keysToClear: Array<keyof IlocalStorageKeys> = Object.keys(
    localStorage
  ) as Array<keyof IlocalStorageKeys>;
  console.log('keysToClear', keysToClear);
  keysToClear.forEach((key) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  });
  // localStorage.clear();
}

export function getLocalStorage(key: keyof IlocalStorageKeys) {
  const item = localStorage.getItem(key);
  if (item === null || item === undefined || item === '') {
    return null;
  }
  return JSON.parse(item);
}

export const getHumanReadableTimestampString = (
  timeStamp?: PlainMessage<Timestamp> | Timestamp
) => {
  if (!timeStamp) {
    return undefined;
  }
  const date = new Timestamp(timeStamp).toDate();
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const diffInDays = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else if (diffInDays <= 7) {
    const daysAgo = diffInDays === 1 ? 'day' : 'days';
    return `${diffInDays} ${daysAgo} ago`;
  } else {
    // Format the date to human-readable format
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  }
};

/**
 * Convert any Message to a PlainMessage - a clone as a plain object without
 * methods.
 */
export function toPlainMessage<T extends Message<T>>(
  message: T
): PlainMessage<T> {
  const val = structuredClone(message);
  return val as PlainMessage<T>;
}

export function arrayToPlainMessageArray<T extends Message<T>>(
  messages?: T[]
): PlainMessage<T>[] | undefined {
  return messages?.map((message) => {
    const plainMessage = structuredClone(message);
    return plainMessage as PlainMessage<T>;
  });
}
export const getDifficultyLevelString = (
  level: DifficultyLevelEnum | undefined
): string => {
  switch (level) {
    case DifficultyLevelEnum.DIFFICULTY_LEVEL_UNDEFINED:
      return 'Undefined';
    case DifficultyLevelEnum.DIFFICULTY_LEVEL_HIGH:
      return 'Hard';
    case DifficultyLevelEnum.DIFFICULTY_LEVEL_MEDIUM:
      return 'Medium';
    case DifficultyLevelEnum.DIFFICULTY_LEVEL_LOW:
      return 'Easy';
    default:
      return 'Invalid';
  }
};
export const formatSecondsToDateTimeString = (
  seconds: bigint | undefined
): string => {
  if (seconds === undefined) {
    return 'Nil';
  }
  const milliseconds = Number(seconds) * 1000;
  const dateObj = new Date(milliseconds);

  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[monthIndex];

  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  const formattedDate = `${day} ${month}, ${formattedHours}:${minutes
    .toString()
    .padStart(2, '0')}${amOrPm}`;
  return formattedDate;
};
export const formatTimeFromDeadline = (
  remainingSeconds: bigint | undefined
): string => {
  if (remainingSeconds === undefined) {
    return 'Nil';
  }

  const days = Math.floor(Number(remainingSeconds) / (60 * 60 * 24));
  const hours = Math.floor(
    (Number(remainingSeconds) % (60 * 60 * 24)) / (60 * 60)
  );
  const minutes = Math.floor((Number(remainingSeconds) % (60 * 60)) / 60);

  const formattedTime = `${days}D : ${hours
    .toString()
    .padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m`;
  return formattedTime;
};
export const formatRemainingTime = (
  targetDateStr: Timestamp | undefined
): string => {
  if (!targetDateStr) {
    return 'Nil';
  }
  const targetDate = new Timestamp(targetDateStr).toDate();
  const currentTime = new Date();
  const timeDifferenceMs = targetDate.getTime() - currentTime.getTime();
  if (timeDifferenceMs <= 0) {
    return '00D : 00h : 00m';
  }
  const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
  );
  const formattedTime = `${days.toString().padStart(2, '0')}D : ${hours
    .toString()
    .padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m`;
  return formattedTime;
};
export const formatDateAsDayMonth = (
  targetDateStr: Timestamp | undefined
): string => {
  if (!targetDateStr) {
    return 'Nil';
  }
  const targetDate = new Timestamp(targetDateStr).toDate();
  const day = targetDate.getDate();
  const month = targetDate.toLocaleString('default', { month: 'short' });

  const dayWithSuffix =
    day +
    (day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
          ? 'rd'
          : 'th');

  const formattedDate = `${dayWithSuffix} ${month}`;
  return formattedDate;
};

// export const apiRequestWrapper = async <T>(
//   clientFunctionCallback: () => Promise<T>
// ): Promise<{ response: T | null; loading: boolean; error: any | null }> => {
//   let response: T | null = null;
//   let loading = true;
//   let error: any | null = null;
//   try {
//     response = await clientFunctionCallback();
//     loading = false;
//   } catch (err) {
//     error = err;
//     loading = false;
//   }

//   return { response, loading, error };
// };
export function transformResourceTypeEnumValue(val: Resource_ResourceEnum) {
  // Remove RESOURCE_CATEGORY_ from the starting of the enumValue
  const enumValue = Resource_ResourceEnum[val];
  const transformedValue = enumValue.replace('RESOURCE_TYPE_', '');

  // Remove underscores and capitalize the first letter of each word
  const words = transformedValue.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the capitalized words to form the final result
  const result = capitalizedWords.join(' ');

  return result;
}

export function transformResourceCategoryEnumValue(
  val: ResourceCategoryEnum
) {
  // Remove RESOURCE_CATEGORY_ from the starting of the enumValue
  const enumValue = ResourceCategoryEnum[val];
  const transformedValue = enumValue.replace('RESOURCE_CATEGORY_', '');

  // Remove underscores and capitalize the first letter of each word
  const words = transformedValue.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the capitalized words to form the final result
  const result = capitalizedWords.join(' ');

  return result;
}

export function getResourceEnumIcon(val: Resource_ResourceEnum) {
  // Remove RESOURCE_CATEGORY_ from the starting of the enumValue
  switch (val) {
    case Resource_ResourceEnum.RESOURCE_TYPE_VIDEO:
      return 'video-green';
    case Resource_ResourceEnum.RESOURCE_TYPE_READING:
      return 'reading-green';
    case Resource_ResourceEnum.RESOURCE_TYPE_PRACTICE:
      return 'test-green';
    case Resource_ResourceEnum.RESOURCE_TYPE_TEST:
      return 'test-green';
    case Resource_ResourceEnum.RESOURCE_TYPE_PDF:
      return 'pdf-green';
    case Resource_ResourceEnum.RESOURCE_TYPE_QUESTION:
      return 'questions';
    case Resource_ResourceEnum.RESOURCE_TYPE_QUESTION_SET:
      return 'questions';
    case Resource_ResourceEnum.RESOURCE_TYPE_ACTIVITY:
      return 'questions';
    default:
      return 'questions';
  }
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    // console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text to clipboard', err);
  }
}

export const getTeacherSubjectEnum = (
  subjectId?: number,
  teachClassSubjects?: TeachClassSubjects[]
) => {
  if (!subjectId || !teachClassSubjects) {
    return undefined;
  }
  for (let i = 0; i < teachClassSubjects.length; i++) {
    const teachClassSubject = teachClassSubjects[i];
    const subjects = teachClassSubject.subjects || [];
    for (let k = 0; k < subjects.length; k++) {
      const subject = subjects[k];
      if (subject.subjectId === subjectId) {
        return subject.subjectEnum;
      }
    }
  }
  return undefined;
};

export const getStudentSubjectEnum = (
  subjectId?: number,
  subjectList?: SubjectList[]
) => {
  if (!subjectId || !subjectList) {
    return undefined;
  }
  for (let j = 0; j < subjectList.length; j++) {
    const subject = subjectList[j];
    if (subject.subjectId === subjectId) {
      return subject.subjectEnum;
    }
  }
  return undefined;
};
