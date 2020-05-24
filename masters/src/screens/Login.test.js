import React from 'react';
import 'react-native'
import renderer from 'react-test-renderer';

import Login from './Login';

describe('<Login />', () => {
    it('state has changed', () => {
        const login = renderer.create(<Login />).getInstance();
        login.setState({ email: 'faultyEmail' })
        login.setState({ password: 'dummyPassword' })
        login.loginHandler();
        expect(login.state.isLoading).toEqual(false)
        
    });
});
