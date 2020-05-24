import React, { Component } from 'react'
import { Button, Block, Text, Input } from '../components';
import { Keyboard, AsyncStorage, KeyboardAvoidingView, ActivityIndicator, StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../constants';
import firebase from 'firebase';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        error: ''
    }
    _signInAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.setItem('userToken', 'abc');
        navigation.navigate("App");
    };
    loginHandler() {
        const { email, password } = this.state;
        Keyboard.dismiss();
        this.setState({ isLoading: true });
        try {
            firebase.auth().signInWithEmailAndPassword(email.replace(/\s/g, ''), password).then(() => {
                this._signInAsync();
            })
                .catch(error => {
                    this.setState({ isLoading: false });
                    switch (error.code) {
                        case 'auth/invalid-email':
                            this.setState({ error: 'Invalid mail' })
                            break;
                    }
                });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    }
    render() {
        const { navigation } = this.props;
        const { isLoading } = this.state;
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Block animation="zoomIn" duration={400} padding={[0, theme.sizes.base * 2]}>

                            {isLoading ?
                                <Block middle><ActivityIndicator size={100} color={theme.colors.primary} /></Block> :
                                <Block middle>
                                    <Input
                                        label="Email"
                                        style={[styles.input]}
                                        defaultValue={this.state.email}
                                        onChangeText={text => this.setState({ email: text })}
                                    />
                                    <Input
                                        secureTextEntry={true}
                                        label="Password"
                                        style={[styles.input]}
                                        defaultValue={this.state.password}
                                        onChangeText={text => this.setState({ password: text })}
                                    />
                                    <Button gradient onPress={() => this.loginHandler()}>
                                        <Text bold white center>Login</Text>
                                    </Button>
                                    <Button onPress={() => navigation.navigate('ForgotPassword')}>
                                        <Text gray caption center>
                                            Forgot your password?
                            </Text>
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