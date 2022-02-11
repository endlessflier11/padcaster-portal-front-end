import { useContext, useEffect } from 'react';
import IndexPage from '..';
import Tutorials from '../../components/tutorials/Tutorials';
import TutorialsList from '../../components/tutorials/TutorialsList';
import Wrapper from '../../components/wrapper/Wrapper';
import { AppContext } from '../../contexts/AppContext';
import ViewType from '../../types/ViewType';

export const TutorialsPage = () => {
  return (
    <Wrapper>
      <Tutorials>
        <TutorialsList />
      </Tutorials>
    </Wrapper>
  )
}

export default TutorialsPage;
