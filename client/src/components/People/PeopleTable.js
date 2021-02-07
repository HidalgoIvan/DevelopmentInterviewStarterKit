import React from 'react';
import styled from 'styled-components';

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
  padding: 5px 0;
`;

const Headers = () => (
  <TableHead>
    <tr>
      <TableHeader style={{borderTopLeftRadius: "7px"}}>
        Name
      </TableHeader>
      <TableHeader>
        Email
      </TableHeader>
      <TableHeader style={{borderTopRightRadius: "7px"}}>
        Title
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

const Rows = ({peopleList}) => (
  <tbody>
    {peopleList.map((person, i) => 
      <TableRow key={`person-${i}`}>
        <TableCell className="personCell">{person.display_name}</TableCell>
        <TableCell className="personCell">{person.email_address}</TableCell>
        <TableCell className="personCell">{person.title}</TableCell>
      </TableRow>
    )}
  </tbody>
) 

export const PeopleTable = ({peopleList}) => (
  <Table>
    <Headers/>
    <Rows peopleList={peopleList}/>
  </Table>
)