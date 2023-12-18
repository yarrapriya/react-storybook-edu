import { LmsHomewokTeacherAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ActionsPopup,
  IStyles,
  QuestionContainerWithSolution,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import {
  DifficultyLevelEnum,
  Question,
} from '@protos/content_management/content.db_pb';
import { TaskInfoModel } from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../reduxStore/reduxHooks';
import { setToastInfo } from '../../../Home/reducer/homeDashboard.slice';
import {
  addModuleFilteredQuestion,
  deleteModuleFilteredQuestionsById,
  setModuleFilteredQuestions,
  setQuestionsCount,
  setSelectedTasksInfo,
} from '../../reducer/homework.slice';
import {
  createQuestionCountForDifficultyLevel,
  moveQuestionId,
  rearrangeTaskInfoArrayAfterDeletion,
  rearrangeTaskInfoArrayAfterMove,
} from '../functions';
import InterractiveButtonGroup from './InterractiveButtonGroup';
const styles: IStyles = {
  root: {
    bgcolor: 'common.white',
    padding: { xs: pxToRem(20), md: pxTovW(17) },
  },
  heading: {
    padding: { md: pxTovW(17) },
    borderBottom: '1px solid lightgrey',
  },
  questionsContainer: {
    width: '100%',
    padding: pxTovW(20),
    display: 'flex',
    flexDirection: 'column',
    gap: pxTovW(10),
    boxSizing: 'border-box',
  },
  questionWrapper: {
    // margin: pxTovW(20),
    // height: {xs: pxToRem(250), md: pxTovW(470)},
    // width: { md: pxTovW(944) },
    width: '100%',
    // bgcolor: 'neutral.lightBlue',
    position: 'relative',
    border: '1px solid #CED2FC',
    marginBottom: { xs: pxToRem(20), md: pxTovW(30) },
    borderRadius: {
      xs: pxToRem(15),
      md: pxTovW(15),
    },
    overflow: 'hidden',
  },
  questionDetailsWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: {
      xs: pxToRem(5),
      md: pxTovW(5),
    },
  },
  marksWrapper: {
    padding: {
      xs: `${pxToRem(5)} ${pxToRem(13)}`,
      md: `${pxTovW(7)} ${pxTovW(11)}`,
    },
    borderRadius: {
      xs: pxToRem(16),
      md: pxTovW(35),
    },
    marginLeft: {
      xs: pxToRem(10),
      md: pxTovW(14),
    },
    border: '1px solid #CEEAFF',
  },
  marks: {
    fontWeight: 700,
  },
  questionPart: {
    padding: {
      xs: `${pxToRem(24)} ${pxToRem(11)}`,
      md: `${pxTovW(24)} ${pxTovW(50)}`,
    },
  },
  correctAnswerWrapper: {
    borderTop: '1px solid #CED2FC',
    padding: {
      xs: `${pxToRem(15)} ${pxToRem(13)}`,
      md: `${pxTovW(24)} ${pxTovW(30)}`,
    },
    backgroundColor: '#F3F9FE',
  },
};
interface IProps {
  title: string | React.ReactNode;
  subtitle?: string;
}
export default function QuestionsList(props: IProps) {
  const { title, subtitle } = props;
  const dispatch = useAppDispatch();
  const { module_filtered_questions, selected_tasks_info, fetched_hw_details } =
    deserify(useAppSelector((state) => state.homework));
  const { class_subject_info } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );
  const teacher_id = getLocalStorage('userId');
  const { module_id } = useParams();
  const [quesLoading, setQuesLoading] = useState(false);
  const [quesError, setQuesError] = useState(false);
  const [idTobeDeleted, setIdtobeDeleted] = useState('');
  const [actionPopupState, setActionPopupState] = useState(false);

  useEffect(() => {
    if (module_filtered_questions?.questions) {
      // setQuestionsList(module_filtered_questions.questions);
    }
  }, [module_filtered_questions]);

  const deletePopupOpen = (questionIdToDelete?: string) => {
    if (!questionIdToDelete) {
      return;
    }
    setIdtobeDeleted(questionIdToDelete);
    setActionPopupState(true);
  };
  const handleDeleteQuestion = (questionIdToDelete?: string) => {
    if (!questionIdToDelete) {
      return;
    }
    dispatch(deleteModuleFilteredQuestionsById(questionIdToDelete));
    if (selected_tasks_info) {
      const res = rearrangeTaskInfoArrayAfterDeletion(
        questionIdToDelete,
        selected_tasks_info
      );
      dispatch(setSelectedTasksInfo(res));
    }
    dispatch(setQuestionsCount());
    setActionPopupState(false);
  };
  function mapQuestionsBySequence(
    questions: Question[],
    task_info_array?: TaskInfoModel[]
  ): Question[] {
    if (!task_info_array) {
      return questions;
    }
    const newTaskArray = task_info_array.slice();
    newTaskArray.sort((a, b) => a.sequence - b.sequence);
    const sortedQuestionIds = newTaskArray.map((task) => task.questionId);
    const mappedQuestions = sortedQuestionIds.map((questionId) => {
      const question = questions.find(
        (question) => question.questionId === questionId
      );
      return new Question({ ...question });
    });
    return mappedQuestions;
  }
  const replaceQuestion = async (ques: Question) => {
    try {
      if (
        !ques.questionMeta ||
        ques.questionMeta.difficultyLevel ===
        DifficultyLevelEnum.DIFFICULTY_LEVEL_UNDEFINED
      ) {
        return;
      }

      const newQuestionCount = createQuestionCountForDifficultyLevel(
        ques?.questionMeta.difficultyLevel
      );
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.getModuleQuestionsWithFilters(
          {
            teacherId: teacher_id,
            subjectId: class_subject_info?.subjectId,
            moduleId: Number(module_id),
            requiredDifficultyLevelsCountInfo: newQuestionCount,
            qIdsToBeIgnored: module_filtered_questions
              ? module_filtered_questions.questions.map(
                (e) => e.questionId || ''
              )
              : undefined,
          }
        );
      if (response.data?.questions && ques.questionId) {
        //validating that question ids should not be duplicated (now not needed due to qIdsToBeIgnored)
        // const newQues = response.data?.questions.find(
        //   (que) => que.questionId !== ques.questionId
        // );
        // const quesAlreadyExist = module_filtered_questions?.questions.find(
        //   (ques) => ques.questionId === newQues?.questionId
        // );
        // if (
        //   !newQues ||
        //   !newQues.questionId ||
        //   !selected_tasks_info ||
        //   quesAlreadyExist
        // ) {
        //   dispatch(
        //     setToastInfo({
        //       variant: 'info',
        //       label: 'not able to replace the question',
        //       open: true,
        //     })
        //   );
        //   return;
        // }
        const newQues2 = response.data.questions[0];
        const quesAlreadyExist = module_filtered_questions?.questions.find(
          (ques) => ques.questionId === newQues2?.questionId
        );
        if (
          !newQues2 ||
          !newQues2.questionId ||
          !selected_tasks_info ||
          quesAlreadyExist
        ) {
          dispatch(
            setToastInfo({
              variant: 'info',
              label: 'not able to replace the question',
              open: true,
            })
          );
          return;
        }
        const newSelectedTasksInfo = moveQuestionId({
          selectedTasksInfoInput: selected_tasks_info,
          oldQuestionId: ques.questionId,
          newQuestionId: newQues2.questionId,
        });
        dispatch(deleteModuleFilteredQuestionsById(ques.questionId));
        dispatch(addModuleFilteredQuestion(newQues2));
        dispatch(setSelectedTasksInfo(newSelectedTasksInfo));
        dispatch(setQuestionsCount());
      }
      dispatch(
        setToastInfo({
          variant: 'info',
          label: 'question replaced successfully',
          open: true,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setToastInfo({
          variant: 'error',
          label: 'question not replaced successfully',
          open: true,
        })
      );
    }
  };
  const canEdit = () => {
    if (fetched_hw_details) {
      if (fetched_hw_details.teacherId === BigInt(teacher_id)) {
        return true;
      }
      return false;
    }
    return true;
  };

  const onDragEnd = (result: any) => {
    // console.log(result);
    if (!result.destination) return; // Dropped outside the list

    const questionsList = module_filtered_questions?.questions;
    if (!questionsList) {
      return;
    }

    const oldIndex = result.source.index;
    const newIndex = result.destination.index;
    const draggedQues = questionsList[oldIndex];
    const newQuestions = [...questionsList];
    // Remove the dragged ques from its old position
    newQuestions.splice(oldIndex, 1);
    // Insert the dragged ques at the new position
    newQuestions.splice(newIndex, 0, draggedQues);
    // console.log('questionsList2', newQuestions);
    // setQuestionsList(newQuestions);
    dispatch(setModuleFilteredQuestions({ questions: newQuestions }));
    const newTaskSequence = rearrangeTaskInfoArrayAfterMove(
      newQuestions,
      selected_tasks_info
    );
    dispatch(setSelectedTasksInfo(newTaskSequence));
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.heading}>
        <Box>{title}</Box>
        {subtitle && (
          <Typography
            sx={{ fontSize: { xs: pxToRem(14), md: pxTovW(24) } }}
            color="text.disabled"
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box sx={styles.questionsContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {mapQuestionsBySequence(
                  module_filtered_questions?.questions || [],
                  selected_tasks_info
                ).map((ques, index: number) => {
                  const questionContent = ques.question;
                  const questionCase = questionContent?.model.case;
                  if (!questionCase) {
                    return null;
                  }
                  return (
                    <Draggable
                      key={'ques_' + index}
                      draggableId={'ques_' + index}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            marginTop: { xs: pxToRem(20), md: pxTovW(30) },
                            marginBottom: { xs: pxToRem(20), md: pxTovW(30) },
                            position: 'relative',
                          }}
                        >
                          <QuestionContainerWithSolution
                            questionNumber={index + 1}
                            headerRightElement={
                              canEdit() ? (
                                <InterractiveButtonGroup
                                  index={index}
                                  handleDeletion={() =>
                                    deletePopupOpen(ques.questionId)
                                  }
                                  handleReplace={() => replaceQuestion(ques)}
                                />
                              ) : (
                                <></>
                              )
                            }
                            question={ques}
                            showQuestionStats
                            showAnswer
                          />
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <ActionsPopup
        open={actionPopupState}
        fontSmall={true}
        iconName="delete"
        popupText="Are you sure you want to delete this question"
        handleClose={() => setActionPopupState(false)}
        noClickHandler={() => setActionPopupState(false)}
        yesClickHandler={() => handleDeleteQuestion(idTobeDeleted)}
      />
    </Box>
  );
}
