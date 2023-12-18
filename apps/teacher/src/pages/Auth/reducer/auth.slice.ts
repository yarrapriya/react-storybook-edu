import { OTPEnum } from '@protos/user_management/ums.db_pb';
import {
  LoginTypeEnum,
  TeacherLoginResponseType,
  UserInfo,
} from '@protos/user_management/ums.login.apis_pb';
import { createSlice } from '@reduxjs/toolkit';
// import {} from '@protos/common/'

interface IOtpInfo {
  verification_code: string;
  otp_type: OTPEnum;
}
interface InfoToast {
  label: string | React.ReactElement;
  variant: 'success' | 'error' | 'info';
  open: boolean;
}
export interface IAuthState {
  user_info?: TeacherLoginResponseType;
  contact_popup_open: boolean;
  skipped_feature_screens: boolean;
  login_Type?: LoginTypeEnum;
  login_uid?: string;
  login_phone?: string;
  login_email?: string;
  multiple_profiles?: TeacherLoginResponseType[];
  otp_info?: IOtpInfo;
  verify_path: string;
  toast_info: InfoToast;
  password_verification?: string;
  user_validation_info?: UserInfo;
}

const initialState: IAuthState = {
  user_info: undefined,
  contact_popup_open: false,
  skipped_feature_screens: true,
  verify_path: '',
  toast_info: { label: '', variant: 'success', open: false },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // console.log('payload', action.payload);
      state.user_info = action.payload;
    },
    setNewFirstname: (state, action) => {
      if (state.user_info) {
        state.user_info.firstName = action.payload;
      }
    },
    setContactPopupOpen: (state, action) => {
      state.contact_popup_open = action.payload;
    },
    setSkippedFeatureScreens: (state, action) => {
      state.skipped_feature_screens = action.payload as boolean;
    },
    setLoginUID: (state, action) => {
      if (state.login_phone) {
        state.login_phone = undefined;
      }
      if (state.login_email) {
        state.login_email = undefined;
      }
      state.login_uid = action.payload;
      state.login_Type = LoginTypeEnum.LOGIN_TYPE_USERNAME;
    },
    setLoginPhone: (state, action) => {
      if (state.login_uid) {
        state.login_uid = undefined;
      }
      if (state.login_email) {
        state.login_email = undefined;
      }
      state.login_phone = action.payload;
      state.login_Type = LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER;
    },
    setLoginEmail: (state, action) => {
      if (state.login_phone) {
        state.login_phone = undefined;
      }
      if (state.login_uid) {
        state.login_uid = undefined;
      }
      state.login_email = action.payload;
      state.login_Type = LoginTypeEnum.LOGIN_TYPE_EMAIL;
    },
    setMultipleProfiles: (state, action) => {
      state.multiple_profiles = action.payload;
    },
    setOtpInfo: (state, action) => {
      state.otp_info = action.payload;
    },

    setVerifyPath: (state, action) => {
      state.verify_path = action.payload;
    },
    setToastInfo: (state, action) => {
      state.toast_info = action.payload;
    },
    setPasswordVerificationToken: (state, action) => {
      state.password_verification = action.payload;
    },
    SetUserValidationInfo: (state, action) => {
      state.user_validation_info = action.payload;
    },
    resetAuthState: (state) => {
      return initialState;
    },
  },
});

export const {
  setUserInfo,
  setNewFirstname,
  resetAuthState,
  setContactPopupOpen,
  setSkippedFeatureScreens,
  setToastInfo,
  setLoginUID,
  setLoginPhone,
  setLoginEmail,
  setMultipleProfiles,
  setOtpInfo,
  setPasswordVerificationToken,
  SetUserValidationInfo,
  setVerifyPath,
} = authSlice.actions;
export default authSlice.reducer;
