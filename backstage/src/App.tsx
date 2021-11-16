import React from 'react';
import "./App.css";

import { useAuth } from './context/auth-context';
//import { AuthenticatedApp } from './authenticated-app';
//import { UnauthenticatedApp } from './unauthenticate-app';
import { ErrorBoundary } from './components/error-boundary';
import { FullPageErrorFallback, FullPageLoading } from './components/lib';

const AuthenticatedApp = React.lazy(()=>import ("./authenticated-app"))
const UnauthenticatedApp = React.lazy(()=>import ("./unauthenticate-app"))


function App() {

  const {user} =useAuth()
  return (
    <div>
      {/**错误边界组件包裹 传进一个之前写的error 这样遇到error就会全部展现出来*/}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading/>}>
      {
        user ? <AuthenticatedApp /> : <UnauthenticatedApp />
      }
      </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
