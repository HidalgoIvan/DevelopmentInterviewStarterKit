import * as actions from './Constants'

export function receiveMe(me) {
  return {
    type: actions.RECEIVE_ME,
    me
  }
}

export function receivePeople(people) {
  return {
    type: actions.RECEIVE_PEOPLE,
    people
  }
}

export function receivePeopleDuplicates(duplicates) {
  return {
    type: actions.RECEIVE_PEOPLE_DUPLICATES,
    duplicates
  }
}