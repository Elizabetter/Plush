import produce from 'immer';
import { getAdsAction } from './actions';
import {
  genericReducer,
  namedListParams,
} from '../../dataProvider/routineUtils';

export const key = 'mainContent';

export const initialState = {
  ads: namedListParams('ads'),
};

const mainContentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case getAdsAction.REQUEST:
      case getAdsAction.SUCCESS:
      case getAdsAction.FAILURE:
        genericReducer(state, draft, action, initialState.ads.name);
        break;
      default:
        break;
    }
  });

export default mainContentReducer;
