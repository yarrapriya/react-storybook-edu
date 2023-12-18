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
import authSlice from '../pages/Auth/reducer/auth.slice';
import homeDashboardSlice from '../pages/Home/reducer/homeDashboard.slice';
import homeworkSlice from '../pages/Homework/reducer/homework.slice';
import learnSlice from '../pages/Learn/reducer/learn.slice';
import performanceSlice from '../pages/Performance/reducer/performance.slice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice,
    home: homeDashboardSlice,
    learn: learnSlice,
    homework: homeworkSlice,
    performance: performanceSlice,
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
