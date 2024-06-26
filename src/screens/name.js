import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Share } from "react-native";

import RoundButton, { Group } from "../component/common/roundButton";
import Container from "../component/common/container";
import Card from "../component/card";

const onClick = () => {
  Share.share({
    message: "J’ai trouvé un super prénom jettes-y un oeil:",
    url: "https://ono.ma",
    title: "Wow, did you see that?"
  });
};

const Name = ({ id, deleteItem, navigator }) => (
  <Container router={navigator}>
    <Card id={id} />
    <Group>
      <RoundButton
        icon="md-trash"
        onPress={() => {
          deleteItem();
          navigator.pop({
            animated: true
          });
        }}
      />
      {/*<RoundButton icon='md-share' onPress={onClick} />*/}
    </Group>
  </Container>
);

import { connect } from "react-redux";
import { DELETE_MATCH } from "../actions";

const mapDispatchToProps = (dispatch, { id }) => ({
  deleteItem: () => dispatch({ type: DELETE_MATCH, payload: id })
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(Name);
