import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

/* @Reducers */
import { appReducer } from 'reduxStore/app/reducer';

export const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
});
