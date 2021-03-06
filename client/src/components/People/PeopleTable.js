import React from 'react';
import styled from 'styled-components';

import { UniqueCharCount } from './UniqueCharCount';

const Table = styled.table`
  margin: 0 auto;
  border-spacing: 0;
  border-radius: 8px;
  border: 1px solid black;
`;

const TableHead = styled.thead`
  background-color: #1c71b1;
  color: #fff;
`;

const TableHeader = styled.th`
  padding: 5px 10px;
  &:first-child {
    border-top-left-radius: 7px;
  }
  &:last-child {
    border-top-right-radius: 7px;
  }
`;

const Headers = ({displayCharCount = false}) => (
  <TableHead>
    <tr>
      <TableHeader>
        Name
      </TableHeader>
      <TableHeader>
        Email
      </TableHeader>
      <TableHeader>
        Title
      </TableHeader>
      { displayCharCount &&
        <TableHeader>
          Character count in mail
        </TableHeader>
      }
      <TableHeader>
        Actions
      </TableHeader>
    </tr>
  </TableHead>
)

const TableRow = styled.tr`
  &:not(:last-child) .personCell {
    border-bottom: 1px solid #c7e9f4;
  }
`;

const TableCell = styled.td`
  padding: 4px 10px;
`;

const DuplicateSearchButton = styled.button`
  background-color: #d47300;
  color: #fff;
  border-radius: 15px;
  border: none;
  padding: 5px 15px;
`;

const Rows = ({peopleList = [], displayCharCount = false, fetchPersonDuplicates = () => {}}) => (
  <tbody>
    {peopleList.map((person, i) => 
      <TableRow key={`person-${i}`}>
        <TableCell className="personCell">{person.display_name}</TableCell>
        <TableCell className="personCell">{person.email_address}</TableCell>
        <TableCell className="personCell">{person.title}</TableCell>
        {displayCharCount &&
          <TableCell className="personCell">
            <UniqueCharCount mail={person.email_address}/>
          </TableCell>
        }
        <TableCell className="personCell">
          <DuplicateSearchButton onClick={() => {fetchPersonDuplicates(person.id)}}>
            Find duplicates
          </DuplicateSearchButton>
        </TableCell>
      </TableRow>
    )}
  </tbody>
)

export const PeopleTable = ({peopleList = [], displayCharCount = false, fetchPersonDuplicates = () => {}}) => {
  const rowProps = {
    peopleList,
    displayCharCount,
    fetchPersonDuplicates
  };
  return (
    <Table>
      <Headers displayCharCount={displayCharCount}/>
      <Rows {...rowProps}/>
    </Table>
  );
}
