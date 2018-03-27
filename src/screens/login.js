import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import Spinner from "react-native-spinkit";
import {
  RkButton,
  RkTextInput,
  RkConfig,
  RkText
} from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import KeyboardSpace from "react-native-keyboard-space";
import EmailPasswordForm from "../component/form/EmailPassword";

import FacebookButton from "../component/common/button/facebook";
import TextButton from "../component/common/button/text";

import Onboarding from "react-native-onboarding-swiper";
import { H1, H3, H4, P } from "../styles/text";
import Card from "../component/card/component";
import { COLOR_PINK, COLOR_BLUE, COLOR_BLACK } from "../style";
import { padding, margin } from "../utils/style";
import Onboarding2 from "../component/onboarding";
import { connect } from "react-redux";
import { USER_LOGIN, USER_FACEBOOK_LOGIN } from "../actions";
import { getError, getLoading } from "../selectors/user";

const onClick = router => {
  router.push({
    screen: "example.registration",
    animated: true,
    backButtonTitle: "",
    title: "Inscription"
  });
};

class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);

    this.state = {
      showOnboarding: true
    };
  }

  render() {
    const { navigator, login, error, loginFb, loading } = this.props;
    if (this.state.showOnboarding) {
      // onDone={() => {
      //   this.setState({ showOnboarding: false });
      // }}
      return <Onboarding2 router={navigator} />;
    }

    return (
      <View style={styles.wrapper}>
        {loading ? (
          <Spinner
            style={{ marginBottom: 0 }}
            isVisible={loading}
            size={70}
            type={"Pulse"}
            color={"#fff"}
          />
        ) : (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../assets/onoma-logo-topbar-active.png")}
          />
        )}
        <View style={styles.section}>
          <View style={styles.rowContainer}>
            <View style={{ flex: 1 }}>
              <RkText rkType="error">{error}</RkText>
              <EmailPasswordForm
                submitText="Connexion"
                onSubmit={({ username, password }) =>
                  login({ username, password })
                }
              />
              <RkButton
                rkType="default border"
                onPress={() => onClick(navigator)}
              >
                Inscription
              </RkButton>
              <RkButton rkType="default facebook" onPress={() => loginFb()}>
                <Icon style={{ marginRight: 10 }} name={"logo-facebook"} />
                Connexion avec Facebook
              </RkButton>
              <KeyboardSpace />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const error = getError(state);
  const loading = getLoading(state);
  return {
    error,
    loading
  };
};

const mapDispatchToProps = dispatch => ({
  login: data => dispatch({ type: USER_LOGIN, payload: data }),
  loginFb: data => dispatch({ type: USER_FACEBOOK_LOGIN })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: '#f06292'
  },
  image: {
    width: 170,
    height: 100,
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
