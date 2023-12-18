import { serifyMiddleware } from '@geneo2-web/shared-ui';
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import analyticsSlice from '../pages/Analytics/reducer/analytics.slice';
import authSlice from '../pages/Auth/reducer/auth.slice';
import homeDashboard from '../pages/Home/reducer/homeDashboard.slice';
import homeworkSlice from '../pages/Homework/reducer/homework.slice';
import manageHomeworkSlice from '../pages/ManageHomework/reducer/manageHomework.slice';
import teachSlice from '../pages/Teach/reducer/teach.slice';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice,
    homeDashboard: homeDashboard,
    homework: homeworkSlice,
    manageHomework: manageHomeworkSlice,
    analytics: analyticsSlice,
    teach: teachSlice,
  })
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    serifyMiddleware({ serifyKey: null, types: {} }),
  ],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
