import React from 'react';
import firebase from 'firebase';
import ApiKeys from './src/constants/APIKeys';
import { Block } from './src/components';
import Navigation from './src/navigation';
import { AppContextProvider } from './src/AppContextProvider'

export default function App() {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
  return (
    <AppContextProvider>
      <Block>
        <Navigation />
      </Block>
    </AppContextProvider>
  );
}