import React, { Component } from 'react'
import { Button, Block, Text } from '../components';
import { AsyncStorage, Dimensions, Image, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import { theme } from '../constants';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');

export default class Main extends Component {
    state = {
        showTerms: false,
    }
    _signOutAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.clear();
        firebase.auth().signOut();
        navigation.navigate('Welcome');
    }
    render() {
        return (
            <Block>
                <Text h1 center>Main</Text>
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync}>
                    <Text bold black center>Log Out</Text>
                </Button>
            </Block>
        )
    }
}