'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
export default function ReduxProvider({ children }: PropsWithChildren) {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
  useAuth0();
  return (
    <Provider store={store} >
       <Auth0Provider
        domain="sahilvasuja.us.auth0.com"
        clientId="BSdsI5iW60oEjwkmvDj7U6v575eT0ndY"
        authorizationParams={{
          scope: "openid profile email offline_access",
          audience: "this is unique Identifier",
          redirect_uri: window.location.origin,
        }}
        useRefreshTokens
        cacheLocation="localstorage"
      >
     {children}
      </Auth0Provider>
    </Provider>
  );
}
