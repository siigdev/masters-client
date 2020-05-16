import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

import { theme } from "../constants";

export default class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      children,
      ...props
    } = this.props;
    return (
          <Text style={[
            styles.text,
            h1 && styles.h1,
            h2 && styles.h2,
            h3 && styles.h3,
            title && styles.title,
            body && styles.body,
            caption && styles.caption,
            small && styles.small,
            size && { fontSize: size },
            transform && { textTransform: transform },
            align && { textAlign: align },
            height && { lineHeight: height },
            spacing && { letterSpacing: spacing },
            weight && { fontWeight: weight },
            regular && styles.regular,
            bold && styles.bold,
            semibold && styles.semibold,
            medium && styles.medium,
            light && styles.light,
            center && styles.center,
            right && styles.right,
            color && styles[color],
            color && !styles[color] && { color },
            accent && styles.accent,
            primary && {color: theme.colors.primary},
            secondary && {color: theme.colors.secondary},
            tertiary && {color: theme.colors.tertiary},
            black && {color: theme.colors.black},
            white && {color: theme.colors.white},
            gray && {color: theme.colors.gray},
            gray2 && {color: theme.colors.gray2},
            style
          ]} {...props}>
            {children}
          </Text>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black
  },
  // variations
  regular: {
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
  },
  semibold: {
    fontWeight: "500",
  },
  medium: {
    fontWeight: "500",
  },
  light: {
    fontWeight: "200",
  },
  // position
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small
});