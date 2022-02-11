import { useContext, useEffect } from 'react';
import { TutorialsContext } from '../../contexts/TutorialsContext';
import PageContainer from '../layout/PageContainer';
import styles from './Tutorials.module.scss';
import TutorialsNav from './TutorialsNav';

const Tutorials = ({ children }) => {
  const { loadAll } = useContext(TutorialsContext);

  useEffect(() => {
    loadAll()
  }, [loadAll]);

  return (
    <PageContainer>
      <TutorialsNav />
      <div className={styles.articleContainer}>
        {children}
      </div>
    </PageContainer>
  );
}

export default Tutorials;

