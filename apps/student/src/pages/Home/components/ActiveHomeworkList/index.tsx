import { Timestamp } from '@bufbuild/protobuf';
import { LmsHomewokStudentAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  EarlyHomeworkPopup,
  IStyles,
  InfoDisplayCard,
  NewSectionList,
  deserify,
  pxToRem,
  pxTovW,
  remainingTimeInHours,
} from '@geneo2-web/shared-ui';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { onHomeworkCardClick } from '../../../../utils/homework';
import { setHomeActiveHomeworkList } from '../../reducer/homeDashboard.slice';
import SectionListSckeleton, { ShimmerActiveHwCard } from '../../shimmer';

const styles: IStyles = {
  idcRootStyle: {
    backgroundColor: 'common.white',
    minWidth: { xs: pxToRem(313), md: pxTovW(476) },
    width: { xs: pxToRem(313), md: pxTovW(476) },
    maxWidth: { xs: pxToRem(313), md: pxTovW(476) },
    height: { xs: pxToRem(157), md: pxTovW(196) },
  },
};

export default function ActiveHomeworkList() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [error, setError] = useState<boolean>(false);
  const selectedSubjectId = deserify(
    useAppSelector((state) => state.home.selected_subject_id)
  );

  const active_homework_list =
    deserify(useAppSelector((state) => state.home.active_homework_list)) || [];

  const activeHomeworkList = selectedSubjectId
    ? active_homework_list.filter((val) => val.subjectId == selectedSubjectId)
    : active_homework_list;

  const dispatch = useDispatch();
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState<Timestamp | undefined>(undefined);

  useEffect(() => {
    getHomeworkList();
  }, []);

  const getHomeworkList = async () => {
    try {
      if (!studentId) {
        return;
      }
      setLoading(true);
      const response =
        await LmsHomewokStudentAPIServiceV1Client.getStudentHomeworkList({
          studentId: studentId,
        });
      if (response) {
        setLoading(false);
        if (response.data) {
          dispatch(
            setHomeActiveHomeworkList(response.data?.allHomeworks?.active)
          );
          return;
        }
      }
      dispatch(setHomeActiveHomeworkList([]));
    } catch (err) {
      dispatch(setHomeActiveHomeworkList([]));
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };

  const getCardItems = () => {
    if (!activeHomeworkList) {
      return [];
    }
    return activeHomeworkList.map((val, index) => (
      <InfoDisplayCard
        onCardClick={() => {
          if (!studentId) {
            return;
          }
          if (val.startDate) {
            if (new Date(new Timestamp(val.startDate).toDate()) > new Date()) {
              setStartTime(val.startDate);
              return;
            }
          }
          onHomeworkCardClick(
            dispatch,
            navigate,
            val.homeworkId,
            studentId,
            'active',
            location.pathname
          );
        }}
        key={`home_activehomework_${index}`}
        variant="large"
        image={val.homeworkPosterImgUrl}
        currentTabValue={'Active'}
        homeworkItem={{
          subject: val.subject,
          chapter: val.moduleName,
          hwName: val.homeworkTitle,
          teacherName: val.teacherName,
          teacherProfileImageUrl: val.teacherProfileImageUrl,
          completed: val.scorePercent.toString(),
        }}
        iconDetails={[
          {
            iconName: 'questions',
            text: val.noOfQuestions.toString(),
            label: 'Questions',
          },
          {
            iconName: 'clock',
            text: remainingTimeInHours(val.endDate),
            label: 'Remaining',
          },
        ]}
        rootStyle={styles.idcRootStyle}
      />
    ));
  };

  return loading === true ? (
    <SectionListSckeleton children={ActiveHwShimmerArray} />
  ) : error === true || getCardItems().length == 0 ? (
    <></>
  ) : (
    <>
      <NewSectionList
        noContentMessage="No Homeworks for Today"
        isError={error}
        sectionTitle="Active Homeworks"
        background="#FCF1C7"
        items={getCardItems()}
        //   items={[tempIDC(), tempIDC(), tempIDC()]}
      />
      <EarlyHomeworkPopup
        open={!!startTime}
        okHandler={() => setStartTime(undefined)}
        startTime={startTime}
      />
    </>
    // <SectionListSckeleton children={ActiveHwShimmerArray} />
  );
}

// for testing while server is down
const tempIDC = () => {
  return (
    <InfoDisplayCard
      variant="large"
      homeworkItem={{
        subject: 'subject',
        chapter: 'chapter',
        hwName: 'hwName',
        teacherName: 'name',
        completed: '100',
      }}
      iconDetails={[
        { iconName: 'questions', text: '20', label: 'Questions' },
        { iconName: 'clock', text: '20 / 60 hrs', label: 'Remaining' },
      ]}
      rootStyle={styles.idcRootStyle}
    />
  );
};

const ActiveHwShimmerArray = [
  <ShimmerActiveHwCard key={1} variant="large" />,
  <ShimmerActiveHwCard key={2} variant="large" />,
];
