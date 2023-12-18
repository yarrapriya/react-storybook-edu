import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

//
import {
  Disclaimer,
  Documentation,
  FAQElement,
  Notifications,
} from '@geneo2-web/shared-ui';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import AppLayout from '../../components/AppLayout/AppLayout';
import HalfSplitLayout from '../../components/HalfSplitLayout';
import { ChooseProfile } from '../../pages/Auth/Login/ChooseProfile';
import EnterUserIdentification from '../../pages/Auth/Login/EnterUserIdentification';
import { LoginNew } from '../../pages/Auth/Login/LoginNew';
import { ResetPasswordOtp } from '../../pages/Auth/Login/ResetPasswordOtp';
import DemoResource from '../../pages/DemoResource';
import Home from '../../pages/Home';
import { ActiveHw } from '../../pages/Homework/ActiveHw';
import { CompletedHw } from '../../pages/Homework/CompletedHw';
import { HwStartCover } from '../../pages/Homework/HwStartCover';
import { HwSubmitted } from '../../pages/Homework/HwSubmitted';
import { StudentHwDash } from '../../pages/Homework/StudentHwDash';
import { ViewRecommendations } from '../../pages/Homework/ViewRecommendations';
import LearnDashboard from '../../pages/Learn/LearnDashboard';
import LearnTopicSelection from '../../pages/Learn/LearnTopicSelection';
import { LessonView } from '../../pages/Learn/LessonView';
import ResourceView from '../../pages/Learn/ResourceView';
import { TopicLesson } from '../../pages/Learn/TopicLesson';
import { ChapterScorePage } from '../../pages/Performance/ChapterScorePage';
import { PerformanceDashboard } from '../../pages/Performance/PerformanceDashboard';
import { HelpAndSupport } from '../../pages/Sidebar/HelpAndSupport';
import { Profile } from '../../pages/Sidebar/Profile';
import {
  CHOOSE_PROFILE,
  DEMO_RESOURCE,
  DISCLAIMER,
  DOCS,
  ENTER_UID,
  FAQ,
  HELP,
  HOME,
  HOMEWORK_ACTIVE,
  HOMEWORK_COMPLETED,
  HOMEWORK_START_COVER,
  HOMEWORK_STUDENT_DASHBOARD,
  HOMEWORK_SUBMITTED,
  HOMEWORK_VIEW_RECOMMENDATION,
  LEARN_DASHBOARD,
  LEARN_TOPIC_SELECTION,
  LESSON_VIEW,
  LOGIN,
  LOGIN_NEW,
  NOTIFICATION,
  PERFORMANCE_STUDENT_CHAPTERWISE,
  PERFORMANCE_STUDENT_DASHBOARD,
  PROFILE,
  RESET_PASSWORD,
  RESET_PASSWORD_OTP,
  RESOURCE_VIEW,
  TOPIC_LESSON,
} from '../RoutesNomenclature';
import PrivateRouterWrapper from './PrivateRoutersWrapper';
import { ResetPassword } from '../../pages/Auth/Login/ResetPassword';
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* //! ------------- A U T H ------------- */}
      {/* <Route path={LOGIN} element={<LoginPage />} /> */}
      <Route path="/" element={<HalfSplitLayout />}>
        <Route path={'/'} element={<Navigate to={ENTER_UID} replace />} />
        <Route path={LOGIN} element={<Navigate to={ENTER_UID} replace />} />
        <Route path={ENTER_UID} element={<EnterUserIdentification />} />
        <Route path={LOGIN_NEW} element={<LoginNew />} />
        <Route path={RESET_PASSWORD_OTP} element={<ResetPasswordOtp />} />
        <Route path={RESET_PASSWORD} element={<ResetPassword />} />
      </Route>
      <Route path={CHOOSE_PROFILE} element={<ChooseProfile />} />
      <Route path="/" element={<AppLayout />}>
        <Route path={DEMO_RESOURCE} element={<DemoResource />} />
        <Route element={<PrivateRouterWrapper />}>
          <Route path="/" element={<Navigate to={HOME} replace />} />
          {/* ------------------------------------------------------------- */}
          <Route path={DOCS} element={<Documentation />} />
          <Route path={HOME} element={<Home />} />
          {/* - - - - - - - - - - - - - - - - - - - - - - - - -  */}

          {/* -------------------- Homework -------------------- */}
          <Route
            path={HOMEWORK_STUDENT_DASHBOARD}
            element={<StudentHwDash />}
          />
          <Route path={HOMEWORK_ACTIVE} element={<ActiveHw />} />
          <Route path={HOMEWORK_COMPLETED} element={<CompletedHw />} />
          <Route path={HOMEWORK_SUBMITTED} element={<HwSubmitted />} />
          <Route path={HOMEWORK_START_COVER} element={<HwStartCover />} />
          <Route
            path={`${HOMEWORK_VIEW_RECOMMENDATION}/:subject_id/:chapter_id/:topic_id`}
            element={<ViewRecommendations />}
          />

          {/* -------------------- Performance -------------------- */}
          <Route
            path={PERFORMANCE_STUDENT_DASHBOARD}
            element={<PerformanceDashboard />}
          />
          <Route
            path={PERFORMANCE_STUDENT_CHAPTERWISE}
            element={<ChapterScorePage />}
          />

          {/* -------------------- Learn -------------------- */}
          <Route
            path={`${LEARN_DASHBOARD}/:subject_id`}
            element={<LearnDashboard />}
          />
          <Route
            path={`${LEARN_TOPIC_SELECTION}/:subject_id/:chapter_id`}
            element={<LearnTopicSelection />}
          />
          <Route
            path={`${TOPIC_LESSON}/:subject_id/:chapter_id/:topic_id`}
            element={<TopicLesson />}
          />
          <Route
            path={`${LESSON_VIEW}/:subject_id/:topic_id/:lesson_id`}
            element={<LessonView />}
          />
          <Route path={RESOURCE_VIEW} element={<ResourceView />} />

          {/* -------------------- Sidebar -------------------- */}
          <Route path={PROFILE} element={<Profile />} />
        </Route>
        <Route path={`${NOTIFICATION}`} element={<Notifications />} />
        <Route path={`${HELP}`} element={<HelpAndSupport />} />
        <Route
          path={`${FAQ}`}
          element={<FAQElement role={ProfileRolesEnum.PROFILE_ROLE_STUDENT} />}
        />
        <Route path={`${DISCLAIMER}`} element={<Disclaimer />} />
      </Route>
    </>
  )
);
