import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

import { H1, H3, H4, P } from "../../../styles/text";
import { COLOR_PINK, COLOR_BLUE, COLOR_BLACK } from "../../../style";
import { padding, margin } from "../../../utils/style";

import { connect } from "react-redux";
import { USER_FACEBOOK_LOGIN } from "../../../actions";

const FacebookButton = ({ loginFb }) => {
  return (
    <TouchableOpacity onPress={loginFb}>
      <View style={styles.wrapper}>
        <Icon
          style={[styles.text, { marginRight: 10 }]}
          size={20}
          name={"logo-facebook"}
        />
        <Text style={styles.text}>Connexion avec Facebook</Text>
      </View>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = dispatch => ({
  loginFb: data => dispatch({ type: USER_FACEBOOK_LOGIN })
});

var styles = StyleSheet.create({
  wrapper: {
    ...padding(10, 20),
    borderRadius: 20,
    backgroundColor: "#3b5998",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    textAlign: "center"
  }
});

export default connect(null, mapDispatchToProps)(FacebookButton);
