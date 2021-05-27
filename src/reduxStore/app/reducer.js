import HttpStatus from 'http-status-codes';

/* @Constants */
import { SET_LANGUAGE, STATUS_CODES } from 'reduxStore/app/constants';

const initialState = {
  htmlLang: 'en-EN',
  language: 'en',
  locales: {},
  config: {
    cookieLifetimeDays: null,
  },
  statusCode: HttpStatus.OK,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_CODES.UPDATE:
      return {
        ...state,
        statusCode: action.payload.statusCode,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};
