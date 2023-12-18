import { Dispatch, SetStateAction, useState } from 'react';

import { Box, Modal, Slide, Typography } from '@mui/material';

import {
  LessonCommonAPIServiceV1Client,
  LessonTeachAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  IStyles,
  ImageWrapper,
  InputField,
  SecondaryButton,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { CreationStatusEnum } from '@protos/content_management/content.db_pb';
import { LessonInfo } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { setToastInfo } from '../../pages/Home/reducer/homeDashboard.slice';
import { useAppDispatch } from '../../reduxStore/reduxHooks';

const styles: IStyles = {
  modal: {
    boxSizing: 'border-box',
    // pt: { xs: '0', md: pxTovW(300) },
    display: { xs: 'flex', md: 'flex' },
    alignItems: { xs: 'flex-end', md: 'center' },
    border: '2px solid cyan',
  },

  root: {
    backgroundColor: 'common.white',
    overflowY: 'auto',
    margin: 'auto',
    width: { xs: '100%', md: pxTovW(528) },
    height: { xs: '60%', md: 'max-content' },
    borderRadius: { xs: pxToRem(30), md: pxToRem(15) },
    padding: { xs: pxToRem(22) },
    // boxSizing: 'border-box',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  headingBox: {
    width: '100%',
    // borderBottom: '1px solid #E0DFDE',
    display: 'flex',
    justifyContent: 'right',
    padding: { xs: `${pxToRem(14)} ${pxToRem(0)}`, md: pxTovW(6) },
  },
  closeBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  close: {
    width: { xs: pxToRem(13) },
    height: { xs: pxToRem(13) },
    alignItems: 'center',
    cursor: 'pointer',
  },
  contentBox: {
    margin: {
      xs: `${pxToRem(0)} ${pxToRem(18)} ${pxToRem(0)} ${pxToRem(18)}`,
      md: '0px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: { xs: '90%', md: '95%' },
    height: { md: '95%' },
    // backgroundColor: 'red',
    gap: { xs: pxToRem(30), md: pxTovW(30) },
  },
  imageBox: {
    width: { xs: pxToRem(168), md: pxTovW(211) },
    height: { xs: pxToRem(150), md: pxTovW(189) },
    // backgroundColor: '#CCE6FE',
  },
};

//* Interface
interface IProps {
  modalState: boolean;
  setModalState: (arg: boolean) => void;
  topic_id?: string;
  subject_id?: string;
  lessonPlanList: LessonInfo[];
  setLessonPlanList: (arg: LessonInfo[]) => void;
  resource_id?: string;
  setCreateLoaderState: Dispatch<SetStateAction<boolean>>;
  section_id?: number;
  setLessonPlanPopupState?: Dispatch<SetStateAction<boolean>>
}
export const CreateLpPopup = ({
  modalState,
  setModalState,
  topic_id,
  subject_id,
  lessonPlanList,
  setLessonPlanList,
  resource_id,
  setCreateLoaderState,
  section_id,
  setLessonPlanPopupState
}: IProps) => {
  const dispatch = useAppDispatch();

  const teacher_id = getLocalStorage('userId');

  const [newLpName, setNewLpName] = useState('');

  const createClickHandler = () => {
    // console.log('newLpName:', newLpName);

    if (resource_id) createNewLesson(resource_id);
  };

  async function createNewLesson(resourceId: string) {
    try {
      // setLoading(true);
      setCreateLoaderState(true);
      const response = await LessonTeachAPIServiceV1Client.upsertLesson({
        teacherId: BigInt(teacher_id),
        title: newLpName,
        subjectId: Number(subject_id),
        moduleId: Number(topic_id),
        resourceIds: [resourceId],
        creationStatus: CreationStatusEnum.CREATION_STATUS_APPROVED,
        schoolClassSectionId: section_id
        // moduleCategory: selectedLesson.moduleCategory,
        // posterImageUrl: selectedLesson.posterImageUrl,
        // creationStatus: selectedLesson.creationStatus,
      });

      if (response?.data) {
        const data = response.data;
        // console.log('createNewLesson', data);
        const res = await LessonCommonAPIServiceV1Client.fetchLessonsByModule({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          // subjectId: Number(subjectId),
          // chapterId: Number(chapterId),
          moduleId: Number(topic_id),
          sectionId: section_id
        });
        const lessonList = resource_id
          ? res.data?.lessons.filter(
            (val) => !val.resourceIds.includes(resource_id)
          )
          : res.data?.lessons;
        const lessons = lessonList?.sort((a, b) => {
          const aTime = a.createdOn?.toDate().getTime() || 0;
          const bTime = b.createdOn?.toDate().getTime() || 0;
          return bTime - aTime;
        });
        if (lessons) {
          setLessonPlanList(lessons);
        }
        setModalState(false);
        if (setLessonPlanPopupState) {
          setLessonPlanPopupState(false)
        }
        setCreateLoaderState(false);
        dispatch(
          setToastInfo({
            label: 'Your resource added into your ' + newLpName,
            variant: 'success',
            open: true,
          })
        );
        // dispatch(setLessonsByModule(data))

        // dispatch(setSelectedLessonInfo(data));
        // navigate(
        //   `${EDIT_LESSON_PLAN}/${subject_id}/${topic_id}/${data.lessonId}`
        // );
      } else {
        // setError(new Error('Login failed'));
        setCreateLoaderState(false);
      }

      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      // setError(err);
      setCreateLoaderState(false);
      console.log(err);
    }
  }

  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      sx={styles.modal}
    >
      <Slide
        direction="up"
        in={modalState}
        mountOnEnter
        unmountOnExit
        timeout={500}
      >
        <Box sx={styles.root}>
          <Box sx={styles.headingBox}>
            <Box onClick={(e) => setModalState(false)} sx={styles.closeBox}>
              <ImageWrapper
                name="close"
                type="png"
                parentFolder="icons"
                styles={styles.close}
              />
            </Box>
          </Box>

          <Box sx={styles.contentBox}>
            <ImageWrapper
              name="lesson-plan-illustration"
              type="png"
              parentFolder="images"
              styles={styles.imageBox}
            />

            <Typography variant="h3" fontWeight="bold">
              Give Your Lesson Plan Name
            </Typography>

            <InputField
              variant="outlined"
              onChange={(e) => setNewLpName(e.target.value)}
              sx={{
                height: { xs: pxToRem(52), md: '100%' },
                width: { xs: pxToRem(271), md: pxTovW(373) },
                backgroundColor: '#CCE6FE',
              }}
            />

            <SecondaryButton
              styles={{
                width: { xs: pxToRem(111), md: pxTovW(208) },
                height: { xs: pxToRem(36), md: pxTovW(55) },
              }}
              onClick={createClickHandler}
              disabled={newLpName === '' ? true : false}
            >
              <Typography variant="h3" color="#FFFFFFFF" fontWeight="bold">
                Create
              </Typography>
            </SecondaryButton>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};
