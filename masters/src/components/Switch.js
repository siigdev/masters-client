import React, { Component } from 'react'
import { Switch } from 'react-native'
import { theme } from '../constants';

export default class SwitchInput extends Component {
    render() {
        const { value, ...props } = this.props;
        let thumbColor = null;
        return (
            <Switch
                thumbColor={thumbColor}
                ios_backgroundColor={theme.colors.gray}
                trackColor={{ true: theme.colors.primary }}
                value={value}
                {...props} />
        )
    }
}