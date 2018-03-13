import React from "react";
import { Text, StyleSheet } from "react-native";
import { em, extractStyle } from "./utils";

import { BLACK, LIGHT_GREY } from "./colors";
import { BOLD, SEMI_BOLD, REGULAR } from "./font";

const text = (defaultStyle, { style = {}, children, ...props }) => (
  <Text {...props} style={[defaultStyle, ...extractStyle(style)]}>
    {children}
  </Text>
);

export const H1 = props => text(styles.h1, props);

export const H2 = props => text(styles.h2, props);

export const H3 = props => text(styles.h3, props);

export const H4 = props => text(styles.h4, props);

export const Subtitle = props => text(styles.subtitle, props);

export const P = props => text(styles.p, props);

export const B = props => text(styles.b, props);

const styles = StyleSheet.create({
  h1: {
    fontFamily: BOLD,
    fontSize: em(2), // 32
    color: BLACK
  },
  h2: {
    fontFamily: SEMI_BOLD,
    fontSize: em(1.125), // 18
    lineHeight: em(1.625), // 26
    color: BLACK
  },
  h3: {
    fontFamily: SEMI_BOLD,
    fontSize: em(1), // 16
    lineHeight: em(1.625), // 26
    color: BLACK
  },
  h4: {
    fontFamily: BOLD,
    fontSize: em(0.8125), // 13
    lineHeight: em(1.125), // 18
    color: BLACK
  },
  p: {
    fontFamily: REGULAR,
    fontSize: em(0.8125), // 13
    lineHeight: em(1.375), // 22
    color: LIGHT_GREY
  },
  text: {
    fontFamily: REGULAR,
    fontSize: em(0.8125), // 13
    lineHeight: em(1.125), // 18
    color: LIGHT_GREY
  },
  b: {
    fontFamily: SEMI_BOLD,
    fontSize: em(0.8125), // 13
    lineHeight: em(1.375), // 22
    color: BLACK
  }
});
