import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage 사용
import authReducer from './slices/authSlice';

const persistConfig = {
  key: 'auth', // localStorage에 저장될 key
  storage,
  whitelist: ['userRole'], // userRole만 persist 대상
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Persisted Reducer 사용
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 관련 에러 방지
    }),
});

export const persistor = persistStore(store);
export default store;

