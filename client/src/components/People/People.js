import React from 'react';
import { connect } from 'react-redux';

import { PeopleTable } from './PeopleTable'

let People = ({peopleList}) => {
  return (
    <div>
      { peopleList && 
        <PeopleTable peopleList={peopleList}/> 
      }
    </div>
  )
}


const mapStateToProps = state => ({ peopleList: state.people.data });

export const ConnectedPeopleList = connect(mapStateToProps)(People);

export default ConnectedPeopleList;