import { LmsBookAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  FullWidthSectionList,
  TextBookCover,
  deserify,
  getMediaBasePath,
} from '@geneo2-web/shared-ui';
import { Skeleton } from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { setHomeTextBookList } from '../../reducer/homeDashboard.slice';
import SectionListSckeleton, { ShimmerActiveHwCard } from '../../shimmer';

export default function TextBookList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const text_book_list =
    deserify(useAppSelector((state) => state.home.text_book_list)) || [];
  const selectedSubjectId = deserify(
    useAppSelector((state) => state.home.selected_subject_id)
  );
  const textBookList = selectedSubjectId
    ? text_book_list.filter((val) => val.subjectId == selectedSubjectId)
    : text_book_list;
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const classId = deserify(
    useAppSelector((state) => state.auth.userInfo?.classSectionDetails?.classId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetchClassBooks();
  }, []);

  async function fetchClassBooks() {
    try {
      if (!studentId) {
        return;
      }
      setLoading(true);
      const response = await LmsBookAPIServiceV1Client.fetchClassBooks({
        personId: studentId,
        personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
        classId: classId,
      });
      if (response) {
        setLoading(false);
        if (response.data) {
          dispatch(setHomeTextBookList(response.data?.books));
          return;
        }
      }
      dispatch(setHomeTextBookList(undefined));
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);

      dispatch(setHomeTextBookList(undefined));
    }
  }

  const textbooks = textBookList.map((val, index) => (
    <TextBookCover
      key={'home_textbook_' + index}
      image={val.coverImageUrl}
      subjectName={val.name}
      onClick={() => {
        if (val.pdf) {
          window.open(getMediaBasePath(val.pdf.pdfUrl, 'processedMediaBucket'));
        }
      }}
    />
  ));

  return loading === true ? (
    <SectionListSckeleton fullWidth children={TextBookArray} />
  ) : error === true || textbooks.length === 0 ? (
    <></>
  ) : (
    <FullWidthSectionList
      noContentMessage="No Textbooks Available"
      isError={error}
      hideListCount
      sectionTitle="Text Book"
      items={textbooks}
    />
  );
}
const TextBookArray = [
  <ShimmerActiveHwCard key={1} variant="small" />,
  <ShimmerActiveHwCard key={2} variant="small" />,
  <ShimmerActiveHwCard key={3} variant="small" />,
  <ShimmerActiveHwCard key={4} variant="small" />,
  <ShimmerActiveHwCard key={5} variant="small" />,
];
const ShimmerSkeleton = () => {
  return <Skeleton variant="rectangular" width={210} height={60} />;
};
