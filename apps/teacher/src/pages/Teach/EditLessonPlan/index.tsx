import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Button, TableBody, TableRow, Typography } from '@mui/material';

import { LessonTeachAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ActionsPopup,
  ContentDetailCard,
  HwProceedButton,
  IStyles,
  IconWrapper,
  ImageWrapper,
  InPageHeader,
  InstructionsPopup,
  PrimaryButton,
  SecondaryButton,
  deserify,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { CreationStatusEnum } from '@protos/content_management/content.db_pb';
import {
  LessonContent,
  LessonInfo,
} from '@protos/learning_management/lms.lesson.common.apis_pb';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  ADD_RESOURCES,
  REPLACE_RESOURCE,
  TEACHING_FLOW,
} from '../../../routeHandling/RoutesNomenclature';
import {
  getResourceCategory,
  resourceTypeName,
} from '../../../utils/functions';
import { setToastInfo } from '../../Home/reducer/homeDashboard.slice';
import InfoBar from '../TeachingFlow/components/InfoBar';
import {
  setLessonContent,
  setSelectedLessonInfo,
} from '../reducer/teach.slice';

const styles: IStyles = {
  root: {
    backgroundColor: 'neutral.paleGrey',
    height: '100vh',
    marginBottom: pxTovW(10),
    padding: { xs: pxToRem(20), md: 0 },
    boxSizing: 'border-box',
  },
  headingImage: {
    width: { xs: pxToRem(60), md: pxTovW(105) },
    height: { xs: pxToRem(60), md: pxTovW(105) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
    objectFit: 'cover',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: pxToRem(40), md: pxTovW(270) },
    padding: { md: `${pxTovW(15)} ${pxTovW(240)}` },
  },
  leftPanel: {
    flexBasis: { md: pxTovW(444) },
    display: 'flex',
    flexDirection: 'column',
    gap: { md: pxTovW(30) },
  },
  rightPanel: {
    // border:"1px solid red",
    height: { xs: '75vh', md: '100vh' },
    overflow: 'auto',
    paddingX: pxTovW(20),
    flexBasis: { md: pxTovW(727) },
  },
  infoBox: {},
  editButton: {
    cursor: 'pointer',
    padding: 0,
    minWidth: 0,
    width: { xs: pxToRem(34), md: pxTovW(50) },
    height: { xs: pxToRem(34), md: pxTovW(50) },
    borderRadius: pxTovW(8),
    bgcolor: 'common.white',
    border: '1px solid #EEEEEE',
  },
  cardsContainer: { display: 'block' },
  addButton: {
    borderRadius: { xs: pxToRem(8), md: pxTovW(10) },
    width: { xs: pxToRem(80), md: pxTovW(120) },
    height: { xs: pxToRem(38), md: pxTovW(58) },
    background: ' #FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #0000000A',
    border: '1px solid #EEEEEE',
    color: 'secondary.main',
    fontSize: { xs: pxToRem(14), md: pxTovW(21) },
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    '&:hover': {
      background: '#FFFFFF 0% 0% no-repeat padding-box',
    },
  },
  lineAndButton: {
    margin: { xs: `${pxToRem(25)} 0`, md: `${pxTovW(40)} 0` },
    height: { xs: '.5vw', md: '0.146vw' }, //2px
    background: '#EEEEEE',
    textAlign: 'center',
    position: 'relative',
  },
  button: {},
};
export default function EditLessonPlan() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openIntructionsPopup, setOpenIntructionsPopup] = useState(false);
  const teacher_id = getLocalStorage('userId');
  const { subject_id, topic_id, lesson_id } = useParams();

  // Copy of the selected Lesson Plan
  const { selected_lessons_info } = deserify(
    useAppSelector((state) => state.teach)
  );
  // console.log('selected_lessons_info: ', selected_lessons_info);

  const [openDialog, setOpenDialog] = useState(false);
  const popupClose = () => {
    setRemoveIndex(-1);
    setOpenDialog(false);
  };
  // --------------------------------------------------------------------------

  const addClickHandler = (resourceIndex: number) => {
    navigate(
      `${ADD_RESOURCES}/${subject_id}/${topic_id}/${lesson_id}/${resourceIndex}`
    );
  };
  // --------------------------------------------------------------------------

  const removeClickHandler = (resourceIndex: number) => {
    // it will be deleted in deleteCLickHandler after popup opens
    setRemoveIndex(resourceIndex);
    setOpenDialog(true);
  };
  // --------------------------------------------------------------------------

  const replaceClickHandler = (resourceIndex: number) => {
    navigate(
      `${REPLACE_RESOURCE}/${subject_id}/${topic_id}/${lesson_id}/${resourceIndex}`
    );
  };
  // --------------------------------------------------------------------------

  const saveClickHandler = () => {
    // console.log('saveClickHandler: ', selected_lessons_info);
    if (selected_lessons_info) updateLesson(selected_lessons_info);
  };
  // --------------------------------------------------------------------------

  async function updateLesson(selectedLesson: LessonInfo) {
    try {
      // setLoading(true);
      const resIds = lessons_content?.resources
        .sort((a, b) => a.rank - b.rank)
        .map((val) => val.resourceId);

      if (resIds?.length === 0) {
        dispatch(
          setToastInfo({
            variant: 'error',
            label: 'Please enter at least one resource',
            open: true,
          })
        );
        return;
      }
      //calculate estimated time

      const response = await LessonTeachAPIServiceV1Client.upsertLesson({
        lessonId: lesson_id,
        teacherId: BigInt(teacher_id),
        title: selectedLesson.title,
        subjectId: selectedLesson.subjectId,
        moduleId: selectedLesson.moduleId,
        moduleCategory: selectedLesson.moduleCategory,
        posterImageUrl: selectedLesson.posterImageUrl,
        resourceIds: resIds,
        // sourceLessonId: Number(selectedLesson.lessonId),
        // sourceLessonId: selectedLesson.lessonId,
        creationStatus: CreationStatusEnum.CREATION_STATUS_APPROVED,
      });

      if (response?.data) {
        const data = response.data;
        // console.log('updateLesson', data);
        // console.log(typeof data, data);
        dispatch(setSelectedLessonInfo(data));

        navigate(`${TEACHING_FLOW}/${subject_id}/${topic_id}/${data.lessonId}`);
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
  // --------------------------------------------------------------------------

  // Getting all the Lesson content
  const { lessons_content } = deserify(useAppSelector((state) => state.teach));
  // console.log('lessons_content: ', lessons_content);

  //^ delete the item required
  const [removeIndex, setRemoveIndex] = useState(-1);
  const deleteCLickHandler = () => {
    // creating a copy and removing required resource
    const temp_lessons_content: LessonContent = JSON.parse(
      JSON.stringify(lessons_content)
    );
    const deletedTitle = temp_lessons_content.resources[removeIndex].title;
    temp_lessons_content.resources.splice(removeIndex, 1);

    // fixing rank
    temp_lessons_content.resources.forEach((content, index) => {
      temp_lessons_content.resources[index].rank = index + 1;
    });

    dispatch(
      setLessonContent({
        ...lessons_content,
        resources: temp_lessons_content.resources,
      })
    );

    dispatch(
      setToastInfo({
        variant: 'info',
        label: `Deleted resource - ${deletedTitle}`,
        open: true,
      })
    );

    setRemoveIndex(-1);
    popupClose();
  };
  // --------------------------------------------------------------------------

  //^ Drag and drop
  const dragItem = useRef(0);
  const dragOverItem = useRef(0);

  // will be used to adjust styling of the item over which it is hovering
  const [dragOverItemIndex, setdragOverItemIndex] = useState(-1);

  const dragStart = (position: number) => {
    // record the position from where the item is picked
    dragItem.current = position;
  };

  const dragEnter = (position: number) => {
    // record the position above which the item is present
    dragOverItem.current = position;
    setdragOverItemIndex(position);
  };

  const drop = () => {
    const temp_lessons_content: LessonContent = JSON.parse(
      JSON.stringify(lessons_content)
    );
    // create a copy of the item being dragged
    const dragItemContent = temp_lessons_content.resources[dragItem.current];
    // remove the item being dragged from the list
    temp_lessons_content.resources.splice(dragItem.current, 1);
    // add the item to its new position
    temp_lessons_content.resources.splice(
      dragOverItem.current,
      0,
      dragItemContent
    );
    // reset the values
    dragItem.current = -1;
    dragOverItem.current = -1;
    setdragOverItemIndex(-1);
    // fixing rank
    temp_lessons_content.resources.forEach((content, index) => {
      temp_lessons_content.resources[index].rank = index + 1;
    });

    // set the new array
    dispatch(
      setLessonContent({
        ...lessons_content,
        resources: temp_lessons_content.resources,
      })
    );
  };
  // --------------------------------------------------------------------------

  const totalTimeOfResources = lessons_content?.resources.reduce(
    (acc, resource) => acc + resource.estimatedTimeInMin,
    0
  );

  return (
    <Box sx={styles.root}>
      <InPageHeader
        title={<Heading selectedLessonInfo={lessons_content} />}
        buttonText="SAVE"
        // buttonClickHandler={() => navigate(HOME)}
        buttonClickHandler={saveClickHandler}
      />
      <Box sx={styles.mainContainer}>
        <Box sx={styles.leftPanel}>
          {lessons_content?.learningOutcomes &&
            lessons_content.learningOutcomes.length !== 0 && (
              <Box
                sx={{
                  margin: {
                    xs: `${pxToRem(26)} ${pxToRem(4)} ${pxToRem(0)} ${pxToRem(
                      4
                    )}`,
                    md: 0,
                  },
                }}
              >
                <SecondaryButton
                  variant="outlined"
                  witharrow
                  fullWidth
                  onClick={() => setOpenIntructionsPopup(true)}
                >
                  <Typography variant="h5" fontWeight="bold">
                    Learning Outcome
                  </Typography>
                </SecondaryButton>
              </Box>
            )}

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <InfoBar
              noOfResources={lessons_content?.resources.length}
              totalTime={totalTimeOfResources}
            />
          </Box>

          <Box
            onClick={saveClickHandler}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <PrimaryButton fullWidth>SAVE</PrimaryButton>
          </Box>
        </Box>

        <Box sx={styles.rightPanel}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h2">Teaching Flow</Typography>
            <Button
              sx={styles.editButton}
              onClick={() => navigate(`${TEACHING_FLOW}/${lesson_id}`)}
              disabled
            >
              <EditOutlinedIcon color="disabled" fontSize="large" />
            </Button>
          </Box>

          <TableBody sx={styles.cardsContainer}>
            {lessons_content?.resources.map(
              (resource: ResourceInfo, resourceIndex: number) => (
                <TableRow
                  key={resourceIndex}
                  draggable={true}
                  onDragStart={() => dragStart(resourceIndex)}
                  onDragEnter={() => dragEnter(resourceIndex)}
                  onDragEnd={drop}
                  sx={{
                    opacity: dragOverItemIndex === resourceIndex ? 0.2 : 1,
                    display: 'block',
                  }}
                >
                  <Box sx={styles.lineAndButton}>
                    <Button
                      sx={styles.addButton}
                      onClick={() => addClickHandler(resourceIndex)}
                    >
                      Add
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      height: { xs: pxToRem(127), md: pxTovW(177) },
                      width: '100%',
                      marginTop: { xs: pxToRem(20), md: pxTovW(20) },
                    }}
                  >
                    <Box sx={{ flexBasis: { xs: '10%' } }}>
                      <InterActiveButtonGroup
                        removeClickHandler={() =>
                          removeClickHandler(resourceIndex)
                        }
                        replaceClickHandler={() =>
                          replaceClickHandler(resourceIndex)
                        }
                        dragStart={dragStart}
                        dragEnter={dragEnter}
                        drop={drop}
                        resourceIndex={resourceIndex}
                      />
                    </Box>

                    <Box sx={{ flexBasis: { xs: '90%', md: '100%' } }}>
                      <ContentDetailCard
                        variant="large"
                        tagName={getResourceCategory(
                          resource.resourceCategoryType
                        )}
                        image={getMediaBasePath(
                          resource.posterImageUrl,
                          'processedMediaBucket'
                        )}
                        heading={resource.title}
                        iconDetails={[
                          {
                            iconName: 'clock',
                            text: `${resource.estimatedTimeInMin} Min`,
                          },
                          {
                            iconName: resourceTypeName(resource.resourceType)
                              .icon,

                            text: resourceTypeName(resource.resourceType).name,
                          },
                        ]}
                        rootStyle={{
                          width: '100%',
                          backgroundColor: 'common.white',
                          // p: { xs: pxToRem(13), md: pxTovW(20) },
                        }}
                      />
                    </Box>
                  </Box>
                </TableRow>
              )
            )}

            <Box sx={styles.lineAndButton}>
              <Button
                sx={styles.addButton}
                onClick={() => {
                  addClickHandler(lessons_content?.resources?.length || 0);
                }}
              >
                Add
              </Button>
            </Box>
          </TableBody>
        </Box>

        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            bottom: 10,
          }}
          onClick={saveClickHandler}
        >
          <HwProceedButton
            buttonTitle="SAVE"
            clickHandler={saveClickHandler}
            tabs={[
              {
                quantity: lessons_content?.resources.length.toString() || '0',
                title: 'Resources',
              },

              {
                quantity: totalTimeOfResources?.toString() || '',
                title: 'Mins',
              },
            ]}
          />
        </Box>
      </Box>
      <InstructionsPopup
        popupText={lessons_content?.learningOutcomes}
        open={openIntructionsPopup}
        handleClose={() => setOpenIntructionsPopup(false)}
      />

      <ActionsPopup
        open={openDialog}
        handleClose={popupClose}
        iconName="delete"
        fontSmall
        popupText={`Are you sure want to delete`}
        splitText={`${lessons_content?.resources[removeIndex]?.title}?`}
        yesClickHandler={deleteCLickHandler}
        noClickHandler={popupClose}
      />
    </Box>
  );
}

interface HProps {
  selectedLessonInfo?: LessonContent;
}
const Heading = ({ selectedLessonInfo }: HProps) => {
  // console.log('selectedLessonInfo:', selectedLessonInfo);

  const dispatch = useAppDispatch();
  const { selected_lessons_info } = deserify(
    useAppSelector((state) => state.teach)
  );

  return (
    <Box sx={{ display: 'flex', gap: { xs: pxToRem(10), md: pxTovW(20) } }}>
      <ImageWrapper
        name="chapterImage"
        type="png"
        styles={styles.headingImage}
        parentFolder="tempAssets"
        path={selectedLessonInfo?.lessonPosterImageUrl}
      />
      {/* <Typography variant="h1">{selectedLessonInfo?.lessonTitle}</Typography> */}

      <Typography variant="h1">
        <Box
          component="input"
          type="text"
          value={selected_lessons_info?.title}
          onChange={(event) => {
            dispatch(
              setSelectedLessonInfo({
                ...selectedLessonInfo,
                title: event.target.value,
              })
            );
          }}
          sx={{
            fontFamily: 'Poppins',
            color: '#1D1D1D',
            fontWeight: '800',
            fontSize: { xs: pxToRem(21), md: pxTovW(42) },

            border: 'none',
            borderBottom: `${pxTovW(2)} solid red`,
            borderColor: 'secondary.main',
            p: { xs: pxToRem(10), md: pxTovW(10) },

            width: { xs: '90%', md: 'unset' },

            '&:focus': {
              borderBottom: `${pxTovW(5)} solid red`,
              outline: 'none',
              borderColor: 'primary.main',
            },
          }}
        />
      </Typography>
    </Box>
  );
};

interface IBCProps {
  removeClickHandler?: () => void;
  replaceClickHandler?: () => void;
  moveClickHandler?: () => void;
  dragStart: (arg: number) => void;
  dragEnter: (arg: number) => void;
  drop: () => void;
  resourceIndex: number;
}
const InterActiveButtonGroup = (props: IBCProps) => {
  const {
    removeClickHandler,
    moveClickHandler,
    replaceClickHandler,
    dragStart,
    dragEnter,
    drop,
    resourceIndex,
  } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        '&>div': { cursor: 'pointer' },
      }}
    >
      <Button onClick={removeClickHandler}>
        <IconWrapper name="remove" size="md" type="png" parentFolder="icons" />
      </Button>

      <Button onClick={replaceClickHandler}>
        <IconWrapper name="refresh" size="md" type="png" parentFolder="icons" />
      </Button>

      <Button
        onClick={moveClickHandler}
        // draggable={true}
        // onDragStart={() => dragStart(resourceIndex)}
        // onDragEnter={() => dragEnter(resourceIndex)}
        // onDragEnd={drop}
        sx={{ cursor: 'grab' }}
      >
        <IconWrapper
          name="reorder"
          size="small"
          type="png"
          parentFolder="icons"
        />
      </Button>
    </Box>
  );
};
