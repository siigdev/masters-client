import React, { Component } from 'react'
import { Button, Block, Text } from '../components';
import { Animated, Dimensions, Image, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

export default class ForgotPassword extends Component {
    state = {
        showTerms: false,
    }
    renderAppIllustrations() {
        return (
            <Text>Coming soon</Text>
        )
    }
    render() {
        const { navigation } = this.props;
        return (
            <Block>
                <Text h1 center>Forgot Password</Text>
            </Block>
        )
    }
}