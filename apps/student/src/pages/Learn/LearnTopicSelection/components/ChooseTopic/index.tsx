import { ContentCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  Loader,
  NoContentCard,
  TopicCard,
  deserify,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../reduxStore/reduxHooks';
import { TOPIC_LESSON } from '../../../../../routeHandling/RoutesNomenclature';
import { setSelectedChapterTopicInfo } from '../../../reducer/learn.slice';

const styles: IStyles = {
  topicBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    '& > div': {
      borderBottom: '1px solid #C6C6C6',
      width: {
        xs: '100%',
        md: `calc(100% - ${pxToRem(24)})`,
      },
      paddingLeft: { xs: '20px' },
      paddingY: {
        xs: 0,
        md: pxToRem(19),
      },
    },
  },
};
export default function ChooseTopic() {
  const { subject_id, chapter_id } = useParams();
  const subjectId = Number(subject_id);
  const chapterId = Number(chapter_id);
  const navigate = useNavigate();
  const chapterTopic = deserify(
    useAppSelector((state) => state.learn.selected_chapter_topic_info)
  );
  const topics = chapterTopic?.chapterTopics || [];
  const dispatch = useDispatch();
  const user = deserify(useAppSelector((state) => state.auth.userInfo));
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );

  const topicNavigation = (topicId: number) => {
    navigate(`${TOPIC_LESSON}/${subjectId}/${chapterId}/${topicId}`);
    // console.log('topic navigate');
  };

  useEffect(() => {
    fetchChapterTopicInfo();
  }, []);

  const fetchChapterTopicInfo = async () => {
    try {
      setLoading('loading');
      const response =
        await ContentCommonAPIServiceV1Client.fetchChapterTopicInfo({
          personId: user?.studentProfileId,
          personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
          subjectId: subjectId,
          chapterId: chapterId,
          sectionId: user?.classSectionDetails?.sectionId,
        });
      // console.log(response.data);
      if (response) {
        setLoading('completed');
        if (response?.data) {
          const data = response.data;
          // console.log(typeof data, data);

          data.chapterTopics.sort((a, b) => a.topicNo - b.topicNo);
          dispatch(setSelectedChapterTopicInfo(response.data));
          return;
        }
      }
      dispatch(setSelectedChapterTopicInfo(undefined));
    } catch (err) {
      console.log(err);
      setLoading('error');
      dispatch(setSelectedChapterTopicInfo(undefined));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: pxToRem(7), md: pxTovW(2) },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            paddingLeft: { xs: pxToRem(20), md: 0 },
            mb: { xs: pxToRem(0), md: pxTovW(18) },
          }}
        >
          Choose a Topic
        </Typography>
        {/* <Typography variant="h3">
          <ChipBadge label={topics.length} color="primary" size="small" />
        </Typography> */}
      </Box>
      {loading === 'loading' ? (
        <Loader />
      ) : loading === 'error' ? (
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      ) : topics.length === 0 ? (
        <NoContentCard
          variant="white"
          icon="coming-soon-yellow"
          text="No topics to show"
          rootStyle={{
            flexDirection: 'column',
            gap: { xs: pxToRem(20), md: pxTovW(20) },
          }}
        />
      ) : (
        <Box sx={styles.topicBox}>
          {topics.map((topic, index) => (
            <TopicCard
              key={'topic_' + index}
              // title={topic.topicNo + '. ' + topic.topicTitle}
              title={topic.topicTitle}
              lessonPlanCount={topic.topicContentStats?.lessonCount || 0}
              questionsCount={topic.topicContentStats?.questionCount || 0}
              viewAllClickHandler={() => topicNavigation(topic.topicId)}
              profileType={ProfileRolesEnum.PROFILE_ROLE_STUDENT}
            />
          ))}
        </Box>
      )}
    </>
  );
}
