import { configureStore } from '@reduxjs/toolkit';
import appReducer, { INITIAL_STATE } from './appSlice';
import listenerMiddleware from './middleware';

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const preloadedState = {
  app: {
    ...INITIAL_STATE,
    ...persistedState.app,
    streamingIndex: -1,
    streamingConversation: "",
  }
};

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