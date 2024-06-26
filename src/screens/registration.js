import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import KeyboardSpace from "react-native-keyboard-space";
import EmailPasswordForm from "../component/form/EmailPassword";
import { COLOR_PINK } from "../style";

class Registration extends Component {
  static navigatorStyle = {
    navBarTextColor: COLOR_PINK,
    navBarButtonColor: "#d8dce5"
  };
  render() {
    const { navigator, register } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.section}>
          <View style={styles.rowContainer}>
            <View style={{ flex: 1 }}>
              <EmailPasswordForm
                submitText="Suivant"
                onSubmit={({ username, password }) => {
                  register({ username, password });
                }}
              />
              <KeyboardSpace />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

import { connect } from "react-redux";
import { USER_REGISTER } from "../actions";
import { getError, getCurrentId } from "../selectors/user";

const mapStateToProps = state => {
  const error = getError(state);
  const current = getCurrentId(state);
  return {
    error,
    current
  };
};

const mapDispatchToProps = dispatch => ({
  register: data => dispatch({ type: USER_REGISTER, payload: data })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: '#f06292'
  },
  image: {
    width: 170,
    marginBottom: 0
  },
  rowContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  section: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: 300
  }
});
