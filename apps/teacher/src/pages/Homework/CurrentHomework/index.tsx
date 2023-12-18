import { useState } from 'react';
import ReviewHomeowork from '../ReviewHomework';
import SearchQuestions from '../SearchQuestions';

export default function CurrentHomework() {
  const [questionBankDisplayFlag, setQuestionBankDisplayFlag] =
    useState<boolean>(false);
  return questionBankDisplayFlag === false ? (
    <ReviewHomeowork setQuestionBankDisplayFlag={setQuestionBankDisplayFlag} />
  ) : (
    <SearchQuestions setQuestionBankDisplayFlag={setQuestionBankDisplayFlag} />
  );
}
