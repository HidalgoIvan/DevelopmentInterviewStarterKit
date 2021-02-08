import React, { useState } from 'react';
import styled from 'styled-components';

const DuplicateContainer = styled.div`
  padding: 42px 0;
  display: flex;
  justify-content: center;
`;

const DuplicatePanel = styled.div`
  width: fit-content;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  padding: 12px 24px;
`;

const DuplicateRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DuplicatePeople = ({duplicateList}) => {
  const originalPerson = duplicateList.metadata.originalPerson;
  const originalPersonName = originalPerson.display_name;
  const originalPersonMail = originalPerson.email_address;
  const duplicateNumberFound = duplicateList.metadata.duplicatesFound;
  return (
    <DuplicateContainer>
      { duplicateList &&
        <DuplicatePanel>
          <div>
            {duplicateNumberFound} Possible duplicate(s) found in {duplicateList.metadata.recordsSearched} records for <b>{originalPersonName}</b> ({originalPersonMail}):
          </div>
          <br/>
          {
            duplicateList.data.map((duplicate, i) => (
              <DuplicateRow key={i}>
                <div>
                  {duplicate.display_name}
                </div>
                <div>
                  {duplicate.email_address}
                </div>
              </DuplicateRow>
            ))
          }
        </DuplicatePanel>
      }
    </DuplicateContainer>
  )
}