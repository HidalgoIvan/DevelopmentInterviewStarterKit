import React from 'react';
import styled from 'styled-components';

import { ConnectedNavBar } from '../containers/ConnectedNavBar';
import { ConnectedPeopleList } from './People/People';

const Page = styled.div`
  display: grid;
  grid-template 46px 1fr / 1fr;
  height: 100%;
  width: 100%;
`;


export const LandingPage = () => (
  <Page>
    <ConnectedNavBar />
    <ConnectedPeopleList />
  </Page>
);
