import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import Signup from '../screens/Signup';
import Main from '../screens/Main';
import Settings from '../screens/Settings';
import Feedback from '../screens/Feedback';
import ForgotPassword from '../screens/ForgotPassword';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants';

const authLoadingScreen = createStackNavigator({
    AuthLoadingScreen: {
        screen: AuthLoadingScreen
    }
});
const authScreens = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerTitle: "Login",
        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            headerTitle: "Sign Up",
        },
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerTitle: "Forgot Password",
        }
    },
})
const screens = createBottomTabNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-home'} size={25} />,
            title: 'Main',
        },
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-home'} size={25} />,
            title: 'Feedback',
        },
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-settings'} size={25} />,
            title: 'Settings',
        },
    },
}, {
    tabBarOptions: {
        activeTintColor: theme.colors.primary,
        activeBackgroundColor: theme.colors.gray4,
        inactiveBackgroundColor: theme.colors.gray4,
    }
})
export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: authLoadingScreen,
        App: screens,
        Auth: authScreens,
    },
    {
        initialRouteName: 'AuthLoading',
    })
);