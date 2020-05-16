import React, { Component } from 'react'
import { Button, Block, Text, Card } from '../components';
import { AsyncStorage, Image, StyleSheet } from 'react-native';
import { theme } from '../constants';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';


export default class Feedback extends Component {
    renderBackground() {
        <Block style={styles.container}>
                        <Block style={styles.background} >
                            <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
                                
                            </LinearGradient>
                        </Block>
                    </Block>
    }
    render() {
        return (
            <Block>
                {this.renderBackground()}
                <Block middle center>
                    <Ionicons name="md-pin" size={60} color={theme.colors.gray2} />
                    <Text h1 gray2 center>Hvad synes du om lysniveauet?</Text>
                </Block>
                <Block bottom padding={theme.sizes.base}>
                    <Button gradient onPress={() => this.saveSettings()}>
                        <Text bold white center>Save Settings</Text>
                    </Button>
                </Block>
            </Block>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: window.width,
        height: window.width * 1.5,
        overflow: 'hidden',
        height: window.width / 1.5,
        marginBottom: 20,
    },
    background: {
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        marginBottom: 10,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 13,
        elevation: 5,
    },
    cardImage: {
        height: 75,
        width: 75,
    },
    slider: {
        height: window.width / 1.5,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,

    },
    linearGradient: {
        flex: 1,
    },
});