import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {offerData} from './offer-data/offer-data';
import {offerProcess} from './offer-process/offer-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offerData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Process]: offerProcess.reducer,
});
