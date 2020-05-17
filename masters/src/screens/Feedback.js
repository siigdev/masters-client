import React, { Component } from 'react'
import { Button, Block, Text, Card } from '../components';
import { AsyncStorage, Image, StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../constants';
import firebase from 'firebase';
import Slider from 'react-native-slider'



const window = Dimensions.get('window');
const { width, height } = Dimensions.get('window');

export default class Feedback extends Component {
    state = {
        light: 0,
        occupants: 0,
        temperature: 0,
        lux: 0
    }
    sendFeedback() {
        const currUser = firebase.auth().currentUser.uid;
        const email = firebase.auth().currentUser.email;
        try {
            firebase.database().ref('users/').child(currUser).child("feedback").child(Date.now()).set({
                light: this.state.light,
                test: 'test'
            })
         }
        catch {
            console.warn("err")
        }
    }
    renderBackground() {
        return (
            <View style={styles.container}>
                <View style={styles.background} >
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
                        <View style={styles.content}>
                            {this.renderContent()}
                        </View>
                    </LinearGradient>
                </View>
            </View>
        )
    }
    renderContent() {
        return (
            <Block top center >
                <Image
                    source={require('../assets/images/bulb.png')}
                    resizeMode="contain"
                    style={{ width, height: height / 3, overflow: 'visible', marginTop: 20 }}
                />
                <Text h1 white center>Hvad synes du om lysniveauet?</Text>

                <Slider
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    style={{ height: 19, width: 300 }}
                    thumbStyle={styles.thumb, { backgroundColor: theme.colors.primary }}
                    trackStyle={{ height: 6, borderRadius: 6 }}
                    minimumTrackTintColor={theme.colors.gray4}
                    maximumTrackTintColor={theme.colors.secondary}
                    value={this.state.light}
                    onValueChange={value => this.setState({ light: value })}
                    padding={theme.sizes.base}
                />
                <Block center middle row padding={theme.sizes.base} style={{ width: width, justifyContent: 'space-between' }}>
                    <Text white>Ikke tilfreds</Text>
                    <Text white >Meget tilfreds</Text></Block>

            </Block>
        )
    }
    render() {
        return (
            <Block>
                {this.renderBackground()}

                <Block bottom padding={theme.sizes.base}>
                    <Button gradient onPress={() => this.sendFeedback()}>
                        <Text bold white center>Send feedback</Text>
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
    content: {
        height: window.width / 1.5,
        width: window.width,
        position: 'absolute',
        bottom: 200,
        marginLeft: window.width / 2,

    },
    linearGradient: {
        flex: 1,
    },
});