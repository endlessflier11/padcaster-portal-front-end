import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import Contact from '../components/contact/Contact';
import Tutorials from '../components/tutorials/Tutorials';
import Home from '../components/home/Home';
import MediaBrowser from '../components/mediabrowser/MediaBrowser';
import Privacy from '../components/privacy/Privacy';
import StyleReference from '../components/stylereference/StyleReference';
import Terms from '../components/terms/Terms';
import Wrapper from '../components/wrapper/Wrapper';
import ViewType from '../types/ViewType';
import { SearchContext } from '../contexts/SearchContext';

export const IndexPage = () => {
  const { viewType, setViewType } = useContext(AppContext);
  const { setQuery } = useContext(SearchContext);
  const router = useRouter();
  const dev = router?.query?.dev === "true";

  useEffect(() => {
    if (router?.asPath === '/') {
      setViewType(ViewType.HOME);
    }
    setQuery('');
  }, [router, setViewType, setQuery]);

  return (
    <Wrapper>
      {viewType === ViewType.CONTACT && <Contact />}
      {viewType === ViewType.TUTORIALS && <Tutorials />}
      {viewType === ViewType.HOME && <Home />}
      {viewType === ViewType.MEDIA && <MediaBrowser />}
      {viewType === ViewType.PRIVACY && <Privacy />}
      {viewType === ViewType.TERMS && <Terms />}
      {dev && <StyleReference />}
    </Wrapper>
  );
}

export default IndexPage;
