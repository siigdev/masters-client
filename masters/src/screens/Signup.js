import React, { Component } from 'react'
import { Button, Block, Text, Input } from '../components';
import { AsyncStorage, ActivityIndicator, Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../constants';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window');

export default class Signup extends Component {
    state = {
        showTerms: false,
        isLoading: false
    }

    _signInAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.setItem('userToken', 'abc');
        const currUser = firebase.auth().currentUser.uid;
        const email = firebase.auth().currentUser.email;
        firebase.database().ref('users/').child(currUser).set({
            name: '',
            gender: 'Male',
            notifications: true,
            newsletter: false,
            email: email,
        })
        navigation.navigate("App");
    };
    signupHandler() {
        const { email, password } = this.state;
        Keyboard.dismiss();
        this.setState({ isLoading: true });
        try {
            firebase.auth().createUserWithEmailAndPassword(email.replace(/\s/g, ''), password).then(() => {
                this._signInAsync()
            }).catch(error => {
                this.setState({ isLoading: false });
                switch (error.code) {
                    case 'auth/invalid-email':
                        console.warn('Invalid mail')
                        break;
                }
            });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }
    render() {
        const { isLoading } = this.state;
        return (
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Block animation="zoomIn" duration={400} style={styles.inner} padding={[0, theme.sizes.base * 2]}>
                    {isLoading ?
                        <Block middle><ActivityIndicator size={100} color={theme.colors.primary} /></Block> :
                        <Block middle>
                            <Input
                                label={"Email "}
                                style={[styles.input]}
                                defaultValue={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                            <Input
                                secureTextEntry={true}
                                label={"Password "}
                                style={[styles.input]}
                                defaultValue={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                            />
                            <Button gradient onPress={() => this.signupHandler()}>
                                    <Text bold white center>Sign up</Text>
                            </Button>
                        </Block>
                    }
                </Block>
                </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray,
        borderBottomWidth: 1
    }
})  