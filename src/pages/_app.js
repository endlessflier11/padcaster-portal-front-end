import '../styles/globals.scss';
import React, { useEffect, useMemo, useState } from 'react';
import AppProvider from '../contexts/AppContext';
import DeviceProvider from '../contexts/DeviceContext';
import TutorialsProvider from '../contexts/TutorialsContext';
import SearchProvider from '../contexts/SearchContext';
import UserProvider from '../contexts/UserContext';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { padTheme } from '../styles/theme';
import Router, { useRouter } from 'next/router';
import AuthGuard from '../components/authentication/AuthGuard';

export default function App({ Component, pageProps }) {
  const [navigating, setNavigating] = useState(false);
  const router = useRouter();
  const publicPaths = useMemo(() => ['/auth/login', '/auth/forgot-password', '/auth/signup'], []);
  const pathIsPublic = useMemo(() => publicPaths.indexOf(router.pathname) !== -1, [router.pathname, publicPaths]);

  useEffect(() => {
    Router.onRouteChangeStart = () => {
      setNavigating(true);
    };

    Router.onRouteChangeComplete = () => {
      setNavigating(false);
    };

    Router.onRouteChangeError = () => {
      setNavigating(false);
    };
  }, []);

  return (
    <ThemeProvider theme={padTheme}>
      <DeviceProvider>
        <UserProvider>
          <AuthGuard publicPaths={publicPaths}>
            {pathIsPublic ?
              <>
                {navigating ? <LinearProgress indeterminate="true" /> : null}
                <Component {...pageProps} />
              </>
              :
              <AppProvider navigating={navigating}>
                <SearchProvider>
                  <TutorialsProvider>
                    {navigating ? <LinearProgress indeterminate="true" /> : null}
                    <Component {...pageProps} />
                  </TutorialsProvider>
                </SearchProvider>
              </AppProvider>
            }
          </AuthGuard>
        </UserProvider>
      </DeviceProvider>
    </ThemeProvider>
  );
}
