import { useEffect } from 'react';
import { useAppSelector } from '../../../reduxStore/reduxHooks';

export default function PerformanceBanners() {
  const { banners } = useAppSelector((state) => state.homeDashboard);
  useEffect(() => {
    //geneo.teacher.misc.apis.TeacherMiscAPIServiceV1/fetchTeacherBanners (teacher_id required)
  }, []);
  return <div>PerformanceBanners</div>;
}
