import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

import { H2, H3, H4, P } from "../../../styles/text";
import { BOLD } from "../../../styles/font";
import { COLOR_PINK, COLOR_BLUE, COLOR_BLACK } from "../../../style";
import { padding, margin } from "../../../utils/style";

import { connect } from "react-redux";
import { USER_FACEBOOK_LOGIN } from "../../../actions";

const FacebookButton = ({ loginFb }) => {
  return (
    <TouchableOpacity style={{ height: 50 }} onPress={loginFb}>
      <LinearGradient
        style={styles.wrapper}
        // locations={[0.3, 0.9]}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 1, y: 1.0 }}
        colors={["#4254B6", "#C3C9E8"]}
      >
        <H2 style={styles.text}>Se connecter avec Facebook</H2>
      </LinearGradient>
    </TouchableOpacity>
  );
};

{
  /*<Icon
  style={[styles.text, { marginRight: 10 }]}
  size={20}
  name={"logo-facebook"}
  />*/
}

const mapDispatchToProps = dispatch => ({
  loginFb: data => dispatch({ type: USER_FACEBOOK_LOGIN })
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    ...padding(10, 20),
    borderRadius: 4,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontFamily: BOLD
  }
});

export default connect(
  null,
  mapDispatchToProps
)(FacebookButton);
