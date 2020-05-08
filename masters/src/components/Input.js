import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import Text from './Text';
import Block from './Block';
import { theme } from '../constants';

export default class Input extends Component {
  renderLabel() {
    const { label, error } = this.props;

    return (
      <Block flex={false}>
        {label ? <Text gray2={!error} accent={error}>{label}</Text> : null}
      </Block>
    )
  }

  render() {
    const {
      email,
      phone,
      number,
      error,
      style,
      ...props
    } = this.props;

    const inputStyles = [
      styles.input,
      error && { borderColor: theme.colors.accent },
      style,
    ];

    const inputType = email
      ? 'email-address' : number
      ? 'numeric' : phone
      ? 'phone-pad' : 'default';

    return (
      <Block flex={false} margin={[theme.sizes.base, 0]}>
        {this.renderLabel()}
        <TextInput
          style={inputStyles}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          {...props}
        />
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
  }
});