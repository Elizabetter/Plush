import { createRoutine } from 'redux-saga-routines';
// eslint-disable-next-line import/named
import { GET_ADS } from './constants';

export const getAdsAction = createRoutine(GET_ADS);
