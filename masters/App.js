import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import ApiKeys from './src/constants/ApiKeys';
import { Block } from './src/components';
import Navigation from './src/navigation';

export default function App() {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
  return (
    <Block>
        <Navigation />
    </Block>
  );
}