import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

import FacebookButton from "../common/button/facebook";
import TextButton from "../common/button/text";
import Card from "../card/component";

import { H1, H2, H4, P } from "../../styles/text";
import { COLOR_PINK, COLOR_BLUE, COLOR_BLACK } from "../../style";
import { padding, margin } from "../../utils/style";

const onClick = router => {
  router.push({
    screen: "example.registration",
    animated: true,
    backButtonTitle: "",
    title: "Inscription"
  });
};

const Base = ({ text, children, router }) => (
  <View style={{ flex: 1 }}>
    <H2 style={{ textAlign: "center", ...margin(50, 30, 0, 30) }}>{text}</H2>
    <View style={styles.main}>{children}</View>
    <View style={{ ...padding(30, 30, 0, 30) }}>
      <FacebookButton />
      <TextButton
        onPress={() => onClick(router)}
        style={{
          textAlign: "center",
          ...margin(10, 0)
        }}
      >
        Inscrivez-vous avec votre Email
      </TextButton>
      <P
        style={{
          textAlign: "center",
          fontSize: 10,
          lineHeight: 12,
          marginBottom: 5
        }}
      >
        En vous inscrivant, vous acceptez les Conditions d'utilisation et la
        Politique de con dentialité.
      </P>
    </View>
  </View>
);

var styles = StyleSheet.create({
  main: {
    marginTop: 20,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Base;
