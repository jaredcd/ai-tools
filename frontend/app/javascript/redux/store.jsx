import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import listenerMiddleware from './middleware';

const preloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = configureStore({
  reducer: {
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  preloadedState
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

export default store;