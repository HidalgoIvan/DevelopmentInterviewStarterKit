import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchPersonDuplicates } from '../../actions/AsyncActions';

import { PeopleTable } from './PeopleTable'

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

const People = (props = {peopleList: []}) => {
  const peopleList = props.peopleList;
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
    </div>
  )
}


const mapStateToProps = state => ({ peopleList: state.people.data });

export const ConnectedPeopleList = connect(mapStateToProps, { fetchPersonDuplicates })(People);

export default ConnectedPeopleList;