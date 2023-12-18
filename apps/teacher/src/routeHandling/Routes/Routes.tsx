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
import AppLayout from '../../app/Layouts/AppLayout';
import { AnalyticsDashboard } from '../../pages/Analytics/AnalyticsDashboard';
// import { ClassChapterScorePage } from '../../pages/Analytics/ChapterScorePage';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import HalfSplitLayout from '../../app/Layouts/HalfSplitAuthLayout';
import { ClassChapterScorePage } from '../../pages/Analytics/ChapterScorePage';
import { ClassScorePage } from '../../pages/Analytics/ClassScorePage';
import { StudentChapterScorePage } from '../../pages/Analytics/StudentScorePage';
import { ChooseProfile } from '../../pages/Auth/Login/ChooseProfile';
import EnterUserIdentification from '../../pages/Auth/Login/EnterUserIdentification';
import { LoginNew } from '../../pages/Auth/Login/LoginNew';
import { ResetPassword } from '../../pages/Auth/Login/ResetPassword';
import { ResetPasswordOtp } from '../../pages/Auth/Login/ResetPasswordOtp';
import { OtpScreen } from '../../pages/Auth/Registration/OtpScreen';
import { SetPassword } from '../../pages/Auth/Registration/SetPassword';
import { VerifyDetails } from '../../pages/Auth/Registration/VerifyDetails';
import { VerifyEmail } from '../../pages/Auth/Registration/VerifyEmail';
import { VerifyPhone } from '../../pages/Auth/Registration/VerifyPhone';
import Home from '../../pages/Home';
import { AssignHomework } from '../../pages/Homework/AssignHomework';
import { ChapterResourcePage } from '../../pages/Homework/ChapterResourcepage';
import { CongratulationsPage } from '../../pages/Homework/CongratulationsPage';
import { CreateHomework } from '../../pages/Homework/CreateHomework';
import CurrentHomework from '../../pages/Homework/CurrentHomework';
import HwChapterSelection from '../../pages/Homework/HwChapterSelection';
import TopicSelection from '../../pages/Homework/TopicSelection';
import { ViewHomework } from '../../pages/Homework/ViewHomework';
import { CompletedHomework } from '../../pages/ManageHomework/CompletedHomework';
import { HwPerformance } from '../../pages/ManageHomework/HwPerformance';
import { ManageHomework } from '../../pages/ManageHomework/ManageHomeworkHome';
import { OngoingHomework } from '../../pages/ManageHomework/OngoingHomework';
import { HelpAndSupport } from '../../pages/Sidebar/HelpAndSupport';
import { Profile } from '../../pages/Sidebar/Profile';
import AddResources from '../../pages/Teach/AddResources';
import EditLessonPlan from '../../pages/Teach/EditLessonPlan';
import LessonPlanLists from '../../pages/Teach/LessonPlanLists';
import ReplaceResources from '../../pages/Teach/ReplaceResources';
import { ResourcePage } from '../../pages/Teach/ResourcePage';
import TeachChapterSelection from '../../pages/Teach/TeachChapterSelection';
import TeachingFlow from '../../pages/Teach/TeachingFlow';
import TeachTopicSelection from '../../pages/Teach/TeachTopicSelection';
import {
  ADD_RESOURCES,
  ANALYTICS_CHAPTER_SCORE,
  ANALYTICS_CLASS_SCORE,
  ANALYTICS_CLASS_SELECTION,
  ANALYTICS_STUDENT_SCORE,
  CHOOSE_PROFILE,
  DISCLAIMER,
  DOCS,
  EDIT_LESSON_PLAN,
  ENTER_UID,
  FAQ,
  HELP,
  HOME,
  HOMEWORK_ASSIGN,
  HOMEWORK_CHAPTER_SELECTION,
  HOMEWORK_COMPLETED,
  HOMEWORK_CONGRATULATIONS,
  HOMEWORK_CREATE,
  HOMEWORK_CURRENT,
  HOMEWORK_MANAGE,
  HOMEWORK_ONGOING,
  HOMEWORK_PERFORMANCE,
  HOMEWORK_TOPIC_SELECTION,
  HOMEWORK_VIEW,
  LESSON_PLAN_LISTS,
  LOGIN,
  LOGIN_NEW,
  NOTIFICATION,
  OTP_SCREEN,
  PROFILE,
  REPLACE_RESOURCE,
  RESET_PASSWORD,
  RESET_PASSWORD_OTP,
  RESOURCE_PAGE,
  SET_PASSWORD,
  TEACH_CHAPTER_SELECTION,
  TEACH_TOPIC_SELECTION,
  TEACHING_FLOW,
  VERIFY_DETAILS,
  VERIFY_EMAIL,
  VERIFY_PHONE,
} from '../RoutesNomenclature';
import PrivateRouterWrapper from './PrivateRoutersWrapper';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* //! ------------- A U T H ------------- */}
      <Route path="/" element={<HalfSplitLayout />}>
        <Route path={'/'} element={<Navigate to={ENTER_UID} replace />} />
        <Route path={LOGIN} element={<Navigate to={ENTER_UID} replace />} />
        <Route path={ENTER_UID} element={<EnterUserIdentification />} />
        <Route path={VERIFY_PHONE} element={<VerifyPhone />} />
        <Route path={VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={OTP_SCREEN} element={<OtpScreen />} />
        <Route path={LOGIN_NEW} element={<LoginNew />} />
        <Route path={VERIFY_DETAILS} element={<VerifyDetails />} />
        <Route path={SET_PASSWORD} element={<SetPassword />} />
        <Route path={RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={RESET_PASSWORD_OTP} element={<ResetPasswordOtp />} />
      </Route>
      <Route path={CHOOSE_PROFILE} element={<ChooseProfile />} />

      {/* ---------------- A P P L I C A T I O N ----------------------- */}
      <Route path="/" element={<AppLayout />}>
        <Route element={<PrivateRouterWrapper />}>
          <Route path="/" element={<Navigate to={HOME} replace />} />
          <Route path={HOME} element={<Home />} />
          {/* <Route path="/header" element={<HeaderMidLogo />} /> */}
          <Route
            path={`${HOMEWORK_CHAPTER_SELECTION}/:subject_id`}
            element={<HwChapterSelection />}
          />
          <Route
            path={`${HOMEWORK_TOPIC_SELECTION}/:subject_id/:chapter_id`}
            element={<TopicSelection />}
          />
          <Route
            path={`${HOMEWORK_CREATE}/:module_id`}
            element={<CreateHomework />}
          />
          <Route path={`${HOMEWORK_ASSIGN}`} element={<AssignHomework />} />
          {/* <Route
            path={`${HOMEWORK_QUESTIONBANK}/:module_id`}
            element={<SearchQuestions />}
          />
          <Route
            path={`${HOMEWORK_REVIEW}/:module_id`}
            element={<ReviewHomeowork />}
          /> */}
          <Route
            path={`${HOMEWORK_CURRENT}/:module_id`}
            element={<CurrentHomework />}
          />
          <Route
            path={`${HOMEWORK_CONGRATULATIONS}/:homeworkId`}
            element={<CongratulationsPage />}
          />

          {/* --------------------------------------- */}
          {/* ----------- M A N A G E - H O M E WO R K--------------- */}

          <Route path={HOMEWORK_MANAGE} element={<ManageHomework />} />
          <Route path={`${HOMEWORK_ONGOING}`} element={<OngoingHomework />} />
          <Route
            path={`${HOMEWORK_COMPLETED}`}
            element={<CompletedHomework />}
          />
          <Route
            path={`${HOMEWORK_PERFORMANCE}/:student_id`}
            element={<HwPerformance />}
          />
          <Route path={HOMEWORK_VIEW} element={<ViewHomework />} />

          {/* ----------------------------------------- */}

          {/* //! ------------- ANALYTICS ------------- */}
          <Route
            path={ANALYTICS_CLASS_SELECTION}
            element={<AnalyticsDashboard />}
          />
          <Route path={ANALYTICS_CLASS_SCORE} element={<ClassScorePage />} />
          <Route
            path={ANALYTICS_CHAPTER_SCORE}
            element={<ClassChapterScorePage />}
          />
          <Route
            path={ANALYTICS_STUDENT_SCORE}
            element={<StudentChapterScorePage />}
          />
          {/* ----------------------------------------- */}

          {/* //! ------------- TEACH ------------- */}
          <Route
            path={`${TEACH_CHAPTER_SELECTION}/:subject_id`}
            element={<TeachChapterSelection />}
          />
          <Route
            path={`${TEACH_TOPIC_SELECTION}/:subject_id/:chapter_id`}
            element={<TeachTopicSelection />}
          />
          <Route
            path={`${LESSON_PLAN_LISTS}/:subject_id/:chapter_id/:topic_id`}
            element={<LessonPlanLists />}
          />
          <Route
            // path={`${TEACHING_FLOW}/:lesson_id`}
            path={`${TEACHING_FLOW}/:subject_id/:topic_id/:lesson_id`}
            element={<TeachingFlow />}
          />
          <Route
            // path={`${EDIT_LESSON_PLAN}/:lesson_id`}
            path={`${EDIT_LESSON_PLAN}/:subject_id/:topic_id/:lesson_id`}
            element={<EditLessonPlan />}
          />

          <Route
            path={`${ADD_RESOURCES}/:subject_id/:topic_id/:lesson_id/:resource_index`}
            element={<AddResources />}
          />

          <Route
            path={`${REPLACE_RESOURCE}/:subject_id/:topic_id/:lesson_id/:resource_index`}
            element={<ReplaceResources />}
          />

          <Route path={`${RESOURCE_PAGE}`} element={<ResourcePage />} />

          <Route
            path={'/chapter-resource-page'}
            element={<ChapterResourcePage />}
          />

          {/* //!--------------SIDEBAR------------- */}
          <Route path={PROFILE} element={<Profile />} />
        </Route>
        <Route path={`${NOTIFICATION}`} element={<Notifications />} />
        <Route path={`${HELP}`} element={<HelpAndSupport />} />
        <Route
          path={`${FAQ}`}
          element={<FAQElement role={ProfileRolesEnum.PROFILE_ROLE_TEACHER} />}
        />
        <Route path={`${DISCLAIMER}`} element={<Disclaimer />} />
      </Route>

      <Route path={DOCS} element={<Documentation />} />
    </>
  )
);
