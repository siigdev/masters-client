import React, { Component } from 'react'
import { Button, Block, Text } from '../components';
import { FlatList, Image, StyleSheet, View, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../constants';
import firebase from 'firebase';
import Slider from 'react-native-slider'
import { AppConsumer } from '../AppContextProvider'
import { Avatar } from 'react-native-paper';

const window = Dimensions.get('window');
const { width, height } = Dimensions.get('window');

export default class Feedback extends Component {
    state = {
        light: 0,
        occupants: 0,
        temperature: 0,
        sound: 0,
        feedback: 1
    }
    sendFeedback() {
        const { navigation } = this.props;
        const currUser = firebase.auth().currentUser.uid;
        try {
            firebase.database().ref('users/').child(currUser).child("feedback").child(Date.now()).set({
                light: this.state.light,
                occupants: this.state.occupants,
                temperature: this.state.temperature,
                sound: this.state.sound,
            })
            this.setState({feedback: 1})
            this.flatListRef.scrollToIndex({ animated: true, index: 0 });
            navigation.navigate('Main')
        }
        catch {
            console.warn("err")
        }
    }
    renderBackground() {
        return (
            <AppConsumer>
                {appConsumer => (
                    <View style={styles.container}>
                        <View style={styles.background} >
                            <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
                                <View style={styles.content}>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                )
                }
            </AppConsumer>
        )
    }

    scrollToItem = () => {
        let index = this.state.feedback;
        this.flatListRef.scrollToIndex({ animated: true, index: "" + index });
        this.setState({ feedback: this.state.feedback + 1 });
    }
    renderTest() {
        const { feedbackData } = this.props;
        return (
            <AppConsumer>
                {appConsumer => (
                    <View style={styles.container}>
                        <View style={styles.background} >
                            <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
                                <View style={styles.content}>
                                    <FlatList
                                        horizontal
                                        pagingEnabled
                                        scrollEnabled={false}
                                        showsHorizontalScrollIndicator={false}
                                        ref={(ref) => { this.flatListRef = ref; }}
                                        scrollEventThrottle={16}
                                        snapToAlignment="center"
                                        data={feedbackData}
                                        extraDate={this.state}
                                        keyExtractor={(item, index) => `${item.id}`}
                                        renderItem={({ item }) => (
                                            <Block center middle style={{ width: window.width }}>
                                                <Image
                                                    source={item.source}
                                                    resizeMode="contain"
                                                    style={{ width, height: height / 3, overflow: 'visible', marginTop: 20 }}
                                                />
                                                <Text h1 white center style={{ marginBottom: theme.sizes.base }}>{item.text}</Text>
                                                <Slider
                                                    minimumValue={0}
                                                    maximumValue={5}
                                                    step={1}
                                                    style={{ height: 19, width: 300 }}
                                                    thumbStyle={styles.thumb, { backgroundColor: theme.colors.primary }}
                                                    trackStyle={{ height: 6, borderRadius: 6 }}
                                                    minimumTrackTintColor={theme.colors.gray4}
                                                    maximumTrackTintColor={theme.colors.secondary}
                                                    onValueChange={value => {
                                                        switch (this.state.feedback) {
                                                            case 1:
                                                                this.setState({ light: value })
                                                                break;
                                                            case 2:
                                                                this.setState({ sound: value })
                                                                break;
                                                            case 3:
                                                                this.setState({ occupants: value })
                                                                break;
                                                            case 4:
                                                                this.setState({ temperature: value })
                                                                break;
                                                        }
                                                    }}
                                                />
                                                <Block center middle row padding={theme.sizes.base} style={{ width: width, justifyContent: 'space-between' }}>
                                                    <Text h3 white>Ikke tilfreds</Text>
                                                    <Text h3 white >Meget tilfreds</Text></Block>
                                            </Block>

                                        )}
                                    />
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                )
                }
            </AppConsumer>
        )
    }
    render() {
        return (

            <AppConsumer>
                {appConsumer => (
                    <Block>
                        {this.renderTest()}

                        <Block bottom padding={theme.sizes.base}>
                            {this.state.feedback > 3 ?
                                <Button id={'SendFeedback'} gradient onPress={() => { this.sendFeedback() }}>
                                    <Text bold white center>Send feedback</Text>
                                </Button> :
                                <Button id={'NextFeedback'} gradient onPress={() => { this.scrollToItem() }}>
                                    <Text bold white center>Næste</Text>
                                </Button>
                            }
                        </Block>
                    </Block>
                )
                }
            </AppConsumer>
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
        width: window.width,
        position: 'absolute',
        bottom: 100,
        marginLeft: window.width / 2,
    },
    linearGradient: {
        flex: 1,
    },
    stepsContainer: {
        position: 'absolute',
        bottom: theme.sizes.base * 3,
        right: 0,
        left: 0,
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    },
});
Feedback.defaultProps = {
    feedbackData: [
        { id: 1, text: 'Hvad synes du om lysniveauet?', source: require('../assets/images/bulb.png') },
        { id: 2, text: 'Er der meget larm i rummet?', source: require('../assets/images/bulb.png') },
        { id: 3, text: 'Hvordan er mængden af personer i rummet?', source: require('../assets/images/people.png') },
        { id: 4, text: 'Er temperaturen passende for dig?', source: require('../assets/images/temp.png') }
    ],
};