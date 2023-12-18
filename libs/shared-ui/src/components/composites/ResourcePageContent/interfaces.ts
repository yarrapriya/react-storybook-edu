import { Timestamp } from '@bufbuild/protobuf'
import { ContentAttempt, TeacherContentResponse } from '@protos/learning_management/lms.db_pb'

export interface ContentIdAttempt {
  [contentid: string]: TeacherContentResponse
}

export const getLastAttemptedResponse = (attempts?: ContentAttempt[]) => {
  if (!attempts) {
    return undefined
  }
  attempts.sort((a, b) => new Timestamp(b.endTime).toDate().getTime() - new Timestamp(a.endTime).toDate().getTime());
  return attempts[0]
}

export function numberToRoman(num: number): string {
  if (num < 1 || num > 3999) {
    return num.toString();
  }

  let roman = '';
  const romanNumeralMap: { num: number, roman: string }[] = [
    { num: 1000, roman: 'm' },
    { num: 900, roman: 'cm' },
    { num: 500, roman: 'd' },
    { num: 400, roman: 'cd' },
    { num: 100, roman: 'c' },
    { num: 90, roman: 'xc' },
    { num: 50, roman: 'l' },
    { num: 40, roman: 'xl' },
    { num: 10, roman: 'x' },
    { num: 9, roman: 'ix' },
    { num: 5, roman: 'v' },
    { num: 4, roman: 'iv' },
    { num: 1, roman: 'i' }
  ];

  for (let i = 0; i < romanNumeralMap.length; i++) {
    while (num >= romanNumeralMap[i].num) {
      roman += romanNumeralMap[i].roman;
      num -= romanNumeralMap[i].num;
    }
  }
  return roman;
}
