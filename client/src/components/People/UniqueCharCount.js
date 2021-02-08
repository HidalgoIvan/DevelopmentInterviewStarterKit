import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components'

// Play an animation when displaying the char count
// Does it look nice? Hmmm might wanna tweak this later
const fadeInAnimation = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const CharSpanContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CharSpan = styled.span`
  background-color: #007cba;
  color: #fff;
  border-radius: 5px;
  margin: 3px;
  padding: 1px 3px;
  opacity: 0;
  animation-name: ${fadeInAnimation};
  animation-fill-mode: forwards;
  white-space: pre;
`;

export const UniqueCharCount = ({mail = ""}) => {
  const charCount = getUniqueCharCount(mail);
  // Get the keys of charCount ordered by their value in the hash (desc)
  const orderedCharCountKeys = Object.keys(charCount)
    .sort((a,b) => {return charCount[b]-charCount[a]});
  
  return (
    <CharSpanContainer>
      {
        orderedCharCountKeys.map((key, i) => (
          <CharSpan key={i} style={{animationDuration: `${0.07 * i}s`}}>
            {key}: {charCount[key]}
          </CharSpan>
        ))
      }
    </CharSpanContainer>
  )
};

const getUniqueCharCount = (mail = "") => {
  const result = {};
  mail.split('').forEach((c) => {
    // Add the char to result if not present and add 1 is it is
    c in result ? result[c] = result[c] + 1 : result[c] = 1;
  });
  return result;
}