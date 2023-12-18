import { SubjectList } from '@protos/user_management/ums.login.apis_pb';

export const subjectsWithClass = [
  { subject: 'English', icon: 'english', class: '1A' },
  { subject: 'English', icon: 'english', class: '2C' },
  { subject: 'Maths', icon: 'maths', class: '3A' },
  { subject: 'Maths', icon: 'maths', class: '3B' },
  { subject: 'Marathi', icon: 'marathi', class: '3C' },
  { subject: 'Marathi', icon: 'marathi', class: '3D' },
  { subject: 'Science', icon: 'science', class: '8A' },
  { subject: 'Science', icon: 'science', class: '8B' },

  { subject: 'Science', icon: 'science', class: '8B' },
  { subject: 'Science', icon: 'science', class: '8B' },
  { subject: 'Science', icon: 'science', class: '8B' },
  { subject: 'Science', icon: 'science', class: '8B' },
  { subject: 'Science', icon: 'science', class: '8B' },
  { subject: 'Science', icon: 'science', class: '8B' },
  { subject: 'Science', icon: 'science', class: '8B' },
];
export const subjectsIcon = [
  { subject: 'English', icon: 'english' },
  { subject: 'Science', icon: 'science' },
  { subject: 'Maths', icon: 'maths' },
  { subject: 'Marathi', icon: 'marathi' },
  { subject: 'Social Science', icon: 'socialScience' },
  { subject: 'Vocab Victory', icon: 'vocab' },
];
export const getSubjectsMap = () => {
  const subjectMap: Record<string, SubjectList> = {};

  defaultSubjects.forEach(
    (subject) => (subjectMap[subject.subject] = new SubjectList(subject))
  );
  return subjectMap;
};

const defaultSubjects = [
  {
    subject: 0,
    subjectName: 'Undefined',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 1,
    subjectName: 'Mathematics',
    textColor: '#007CDC',
    iconUrl: 'maths',
  },
  {
    subject: 2,
    subjectName: 'Science',
    textColor: '#007CDC',
    iconUrl: 'science',
  },
  {
    subject: 3,
    subjectName: 'Physics',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 4,
    subjectName: 'Chemistry',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 5,
    subjectName: 'Biology',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 6,
    subjectName: 'English',
    textColor: '#007CDC',
    iconUrl: 'english',
  },
  {
    subject: 7,
    subjectName: 'English Grammar',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 8,
    subjectName: 'English Literature',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 9,
    subjectName: 'English Language',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 10,
    subjectName: 'History',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 11,
    subjectName: 'Geography',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 12,
    subjectName: 'Information and Communication Technology',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 13,
    subjectName: 'Environmental Studies',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 14,
    subjectName: 'Social Science',
    textColor: '#007CDC',
    iconUrl: 'socialScience',
  },
  {
    subject: 15,
    subjectName: 'Civics',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 16,
    subjectName: 'Urdu',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 17,
    subjectName: 'Hindi',
    textColor: '#007CDC',
    iconUrl: 'hindi',
  },
  {
    subject: 18,
    subjectName: 'Sanskrit',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 19,
    subjectName: 'Marathi',
    textColor: '#007CDC',
    iconUrl: 'marathi',
  },
  {
    subject: 20,
    subjectName: 'Gujarati',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 21,
    subjectName: 'Economics',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 22,
    subjectName: 'General Knowledge',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 23,
    subjectName: 'Business Studies',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 24,
    subjectName: 'Accountancy',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 25,
    subjectName: 'Statistics',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 26,
    subjectName: 'Logical Reasoning',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 27,
    subjectName: 'Vocabulary',
    textColor: '#007CDC',
    iconUrl: 'vocab',
  },
  {
    subject: 28,
    subjectName: 'Games',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 29,
    subjectName: 'Aptitude',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 30,
    subjectName: 'General Studies',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 31,
    subjectName: 'Foreign Language',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 32,
    subjectName: 'Sample',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 33,
    subjectName: 'Indian Studies',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 34,
    subjectName: 'Entertainment',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 35,
    subjectName: 'Sports',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 36,
    subjectName: 'SBI PO Exam',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 37,
    subjectName: 'IBPS PO Exam',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 38,
    subjectName: 'Bank PO Exam',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
  {
    subject: 39,
    subjectName: 'Government Exams',
    textColor: '#007CDC',
    iconUrl: 'book',
  },
];

// You can add more subjects following the same format if needed.

// You can add more subjects following the same format if needed.
