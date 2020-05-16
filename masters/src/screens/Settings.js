import React, { Component } from 'react'
import { Button, Block, Text } from '../components';
import { Animated, Dimensions, Image, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

export default class Settings extends Component {
    state = {
        showTerms: false,
    }
    render() {
        return (
            <Block>
                <Text h1 center>Settings</Text>
            </Block>
        )
    }
}