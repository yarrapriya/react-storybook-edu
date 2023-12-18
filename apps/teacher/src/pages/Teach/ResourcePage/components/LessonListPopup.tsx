import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Modal,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {
  LessonCommonAPIServiceV1Client,
  LessonTeachAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  ChapterCard,
  IStyles,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW
} from '@geneo2-web/shared-ui';
import { CreationStatusEnum } from '@protos/content_management/content.db_pb';
import { LessonInfo } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { CreateLpPopup } from '../../../../components/CreateLpPopup';
import { useAppDispatch } from '../../../../reduxStore/reduxHooks';
import { setToastInfo } from '../../../Home/reducer/homeDashboard.slice';

const styles: IStyles = {
  modal: {
    width: { xs: '100%', md: 'max-content' },
    margin: 'auto',
    pt: { md: pxTovW(100) },
    display: { xs: 'flex', md: 'block' },
    alignItems: 'flex-end',
  },

  root: {
    // border: '3px solid red',
    boxSizing: 'border-box',
    p: {
      xs: `${pxToRem(15)} ${pxToRem(20)}`,
      md: `${pxTovW(17)} ${pxTovW(20)}`,
    },
    width: { xs: '100%', md: pxTovW(528) },
    height: { xs: '60%', md: pxTovW(685) },
    // maxHeight: { md: pxTovW(685) },
    bgcolor: '#FFFFFF',
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
    overflowY: 'scroll',
  },

  headingBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  createButton: {
    '&.MuiButtonBase-root': {
      p: {
        xs: `${pxToRem(10)} ${pxToRem(15)}`,
        md: `${pxTovW(8)} ${pxTovW(25)}`,
      },
    },
  },

  cardMapperBox: {
    mt: { xs: pxToRem(15), md: pxTovW(0) },
  },

  chapterCardStyle: {
    width: '100%',
    borderTop: '1px solid red',
    borderColor: '#E6E6E6',
    mt: { xs: pxToRem(5), md: pxTovW(15) },
    pt: { xs: pxToRem(5), md: pxTovW(0) },
  },
};

interface IProps {
  popupState: boolean;
  setPopupState: Dispatch<SetStateAction<boolean>>;
  topic_id?: string;
  subject_id?: string;
  resource_id?: string;
  setCreateLoaderState: Dispatch<SetStateAction<boolean>>;
  section_id?: number;
}
export const LessonListPopup = ({
  popupState,
  setPopupState,
  topic_id,
  subject_id,
  resource_id,
  setCreateLoaderState,
  section_id
}: IProps) => {
  const teacher_id = getLocalStorage('userId');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [createLpState, setCreateLpState] = useState(false);
  const dispatch = useAppDispatch();

  const [lessonPlanList, setLessonPlanList] = useState<LessonInfo[]>([]);
  async function fetchLessonsByModule(topicId: string) {
    try {
      // setLoading(true);

      const response =
        await LessonCommonAPIServiceV1Client.fetchLessonsByModule({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          // subjectId: Number(subjectId),
          // chapterId: Number(chapterId),
          moduleId: Number(topicId),
          sectionId: section_id
        });

      if (response?.data) {
        const data = response.data;
        // console.log('fetchLessonsByModule', data);
        const lessonlist = resource_id
          ? data.lessons.filter((val) => !val.resourceIds.includes(resource_id))
          : data.lessons;
        const lessons = lessonlist.sort((a, b) => {
          const aTime = a.createdOn?.toDate().getTime() || 0;
          const bTime = b.createdOn?.toDate().getTime() || 0;
          return bTime - aTime;
        });
        setLessonPlanList(lessons);
        // console.log(typeof data, data);
        // dispatch(setLessonsByModule(data));
      } else {
        // setError(new Error('Login failed'));
      }

      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      // setError(err);
      console.log(err);
    }
  }

  useEffect(() => {
    if (topic_id && popupState) fetchLessonsByModule(topic_id);
  }, [popupState]);

  const chapterCardClickHandler = (lesson: LessonInfo) => {
    if (resource_id) updateLesson(lesson, resource_id);
  };

  async function updateLesson(selectedLesson: LessonInfo, resourceId: string) {
    try {
      // setLoading(true);

      const response = await LessonTeachAPIServiceV1Client.upsertLesson({
        teacherId: BigInt(teacher_id),
        lessonId: selectedLesson.lessonId,
        title: selectedLesson.title,
        subjectId: Number(subject_id),
        moduleId: selectedLesson.moduleId,
        resourceIds: [...selectedLesson.resourceIds, resourceId],
        creationStatus: CreationStatusEnum.CREATION_STATUS_APPROVED,
        schoolClassSectionId: section_id
        // moduleCategory: selectedLesson.moduleCategory,
        // posterImageUrl: selectedLesson.posterImageUrl,
        // sourceLessonId: selectedLesson.lessonId,
        // creationStatus: selectedLesson.creationStatus,
      });

      if (response?.data) {
        const data = response.data;
        // console.log('updateLesson', data);

        // dispatch(setSelectedLessonInfo(data));

        setPopupState(false);
        dispatch(
          setToastInfo({
            label: 'Your resource added into your ' + selectedLesson.title,
            variant: 'success',
            open: true,
          })
        );

        if (topic_id) fetchLessonsByModule(topic_id);

        // setTimeout(() => {
        //   dispatch(
        //     setToastInfo({
        //       label: '',
        //       variant: 'success',
        //       open: false,
        //     })
        //   );
        // }, 3000);
      } else {
        // setError(new Error('Login failed'));
      }

      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      // setError(err);
      console.log(err);
    }
  }

  return (
    <Modal
      open={popupState}
      onClose={() => setPopupState(false)}
      sx={styles.modal}
    >
      <Slide
        direction="up"
        in={popupState}
        mountOnEnter
        unmountOnExit
        timeout={500}
      >
        <Box sx={styles.root}>
          <Box sx={styles.headingBox}>
            <Typography variant="h3" fontWeight={800}>Add to Lesson Plan</Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCreateLpState(true);
              }}
              sx={styles.createButton}
            >
              <Typography variant="smallText" color="common.white" fontFamily="poppins">
                + CREATE
              </Typography>
            </Button>
          </Box>

          <Box sx={styles.cardMapperBox}>
            {lessonPlanList.map((lesson, lessonIndex) => (
              <ChapterCard
                defaultImage="lessonplan-v1"
                key={lessonIndex}
                withArrow={isMobile ? false : true}
                variant="normal"
                mainHeading={lesson.title}
                rootStyle={styles.chapterCardStyle}
                iconDetails={iconDetails(lesson)}
                cardClickHandler={() => chapterCardClickHandler(lesson)}
                image={getMediaBasePath(
                  lesson.posterImageUrl,
                  'processedMediaBucket'
                )}
              />
            ))}
          </Box>

          <CreateLpPopup
            modalState={createLpState}
            setModalState={setCreateLpState}
            topic_id={topic_id}
            subject_id={subject_id}
            lessonPlanList={lessonPlanList}
            setLessonPlanList={setLessonPlanList}
            resource_id={resource_id}
            setCreateLoaderState={setCreateLoaderState}
            section_id={section_id}
            setLessonPlanPopupState={setPopupState}
          />
        </Box>
      </Slide>
    </Modal>
  );
};

const iconDetails = (resource: LessonInfo) => {
  const retValue = [
    {
      iconName: 'clock',
      text: `${resource.estimatedTimeInMin ? resource.estimatedTimeInMin : 0
        } Min`,
    },

    {
      iconName: 'questions',
      text: `${resource.resourceIds.length} Resources`,
    },
  ];

  return retValue;
};
