import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchPersonDuplicates } from '../../actions/AsyncActions';

import { PeopleTable } from './PeopleTable';
import { DuplicatePeople } from './DuplicatePeople';

// Things I would like to add in the future:

//   - Pagination for people search
//   - More actions for the people table (Delete, expand info, etc.)
//   - Icons
//   - Prettier CSS

const TableControls = styled.div`
  display: flex;
  justify-content: space-around;
`

const CharCountButton = styled.button`
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 25px;
  font-weight: bold;
  background-color: #4a90e2;
  margin-top: 10px;
  transition-duration: .3s;
  padding: 10px;
  &:hover {
    background-color: #62a4f0;
    box-shadow: 0 0 7px rgba(56, 56, 56, 0.6);
  }
`

const People = (props = {peopleList: [], duplicates: []}) => {
  const peopleList = props.peopleList && props.peopleList.data;
  const duplicateList = props.duplicates;
  const [displayCharCount, setDisplayCharCount] = useState(false);
  const peopleTableProps = {
    peopleList,
    displayCharCount,
    fetchPersonDuplicates: props.fetchPersonDuplicates
  }
  return (
    <div>
      { peopleList && 
        <PeopleTable {...peopleTableProps}/>
      }
      <TableControls>
        <CharCountButton onClick={() => setDisplayCharCount(!displayCharCount)}>
          {displayCharCount ?
            "Hide mail character count" :
            "Show mail character count"
          }
        </CharCountButton>
      </TableControls>
      { duplicateList &&
        <DuplicatePeople duplicateList={duplicateList}/>
      }
    </div>
  )
}


const mapStateToProps = state => ({ peopleList: state.people.peopleList, duplicates: state.people.duplicates });

export const ConnectedPeople = connect(mapStateToProps, { fetchPersonDuplicates })(People);

export default ConnectedPeople;