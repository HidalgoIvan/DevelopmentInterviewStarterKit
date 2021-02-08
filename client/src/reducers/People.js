import { merge } from '../utils';
import { RECEIVE_PEOPLE } from '../actions/Constants';
import { RECEIVE_PEOPLE_DUPLICATES } from '../actions/Constants';
export function people(
  state={},
  action
) {
  switch(action.type) {
    case RECEIVE_PEOPLE:
      return merge(state, {peopleList: action.people});
    case RECEIVE_PEOPLE_DUPLICATES:
      return merge(state, {duplicates: action.duplicates});
    default:
      return state;
  }
}