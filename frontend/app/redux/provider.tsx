'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Auth0Provider } from "@auth0/auth0-react";
const persistor = persistStore(store);
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
export default function ReduxProvider({ children }: PropsWithChildren) {
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
         <PersistGate persistor={persistor}>{children}</PersistGate>
     {/* {children} */}
      </Auth0Provider>
    </Provider>
  );
}
