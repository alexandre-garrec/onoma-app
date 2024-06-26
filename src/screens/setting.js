import React from "react";
import { StyleSheet, View } from "react-native";

import { RkButton } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/Ionicons";
import Container from "../component/common/container";

const Setting = () => (
  <Container>
    <View style={styles.wrapper}>
      <RkButton rkType="default warning">
        <Icon
          name="md-trash"
          onPress={() => onClickSetting(router)}
          style={{ marginRight: 10, fontSize: 18 }}
        />
        Supprimer mon Compte
      </RkButton>
    </View>
  </Container>
);

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Setting);

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  }
});
