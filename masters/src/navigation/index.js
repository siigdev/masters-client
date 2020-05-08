import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';

const authLoadingScreen = createStackNavigator({
    AuthLoadingScreen: {
        screen: AuthLoadingScreen
    }
});
const authScreens = createStackNavigator({
    Welcome: {
        screen: Welcome,
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerTitle: <Text h1 bold>Login</Text>,
        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            headerTitle: <Text h1 bold>Sign Up</Text>,
        },
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerTitle: <Text h1 bold>Forgot Password</Text>,
        }
    }
}, {
    transitionConfig: () => fromLeft(500),
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "Transparent",
            shadowColor: "Transparent",
            elevation: 0,
            shadowRadius: 0,
            borderBottomColor: "transparent",
        }
    }
})
const mainScreen = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            headerStyle: {
                height: 0
            }
        }
    },
})
const screens = createBottomTabNavigator({
    mainScreen: {
        screen: mainScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-home'} size={25} />,
            title: 'Main',
        },
    },
    statisticsScreen: {
        screen: statisticsScreen,
        navigationOptions: {
            tabBarIcon: <Ionicons name={'md-trophy'} size={25} />,
            title: 'Statistics',
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
        App: screens, productScreen,
        Auth: authScreens,
    },
    {
        initialRouteName: 'AuthLoading',
    })
);