import { PlainMessage } from '@bufbuild/protobuf';
import { SubjectList } from '@protos/user_management/ums.login.apis_pb';
export const subjectsIcon = [
  { subject: 'English', icon: 'english' },
  { subject: 'Science', icon: 'science' },
  { subject: 'Maths', icon: 'maths' },
  { subject: 'Marathi', icon: 'marathi' },
  { subject: 'Social Science', icon: 'socialScience' },
  { subject: 'Vocab Victory', icon: 'vocab' },
];

export const getSubjectsMap = (learnSubjects: PlainMessage<SubjectList>[]) => {
  const subjectMap: Record<string, SubjectList> = {};
  if (!learnSubjects || learnSubjects.length === 0) {
    return subjectMap
  }
  learnSubjects.forEach(subject => subjectMap[subject.subjectId] = new SubjectList(subject))
  return subjectMap;
}
