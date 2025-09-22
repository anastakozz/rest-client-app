import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Outlet, Scripts, useNavigate } from 'react-router';

import { AuthProvider } from './context/AuthContext.tsx';
import { initAuthWatcher } from './service/firebase.ts';
import { VariablesProvider } from '@/context/VariablesContext';
import './i18n/i18n.ts';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header.tsx';
import { store } from './store';

import type { JSX } from 'react';

import './App.css';

export default function Root(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = initAuthWatcher(navigate);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>My App</title>
      </head>
      <body>
        <AuthProvider>
          <VariablesProvider>
            <Provider store={store}>
              <div className="bg-pink-100 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 w-full flex flex-col items-center justify-center bg-pink-100 overflow-y-auto px-8 py-6 pt-0">
                  <div className="p-[2vw] w-full min-h-[83dvh] rounded-2xl bg-pink-200 flex flex-col items-stretch box-border">
                    <ErrorBoundary>
                      <Outlet />
                    </ErrorBoundary>
                  </div>
                </main>
                <Scripts />
                <Footer />
              </div>
            </Provider>
          </VariablesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
