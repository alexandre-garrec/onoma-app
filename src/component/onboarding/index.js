import React from "react";
import Base from "./base";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";

import { COLOR_PINK } from "../../style";
import { H1, H4 } from "../../styles/text";

import { padding, margin } from "../../utils/style";

import Card from "../card/component";
import { name, origin } from "./fixtures";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Liste des matchs" },
      { key: "second", title: "Liste personnelle" },
      { key: "last", title: "Liste personnelle" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => null;

  render() {
    const { router } = this.props;
    const scheme = SceneMap({
      first: () => (
        <Base
          router={this.props.router}
          text="Trouver le prénom de votre bébé devient un jeu d’enfant !"
        >
          <Card
            style={{ width: 250, height: 300 }}
            id={1}
            name={name}
            origin={origin}
          />
        </Base>
      ),
      second: () => (
        <Base
          router={this.props.router}
          text="Glissez à Droite pour dire aimerun prénom sinon glissez pour
      passer"
        >
          <View>
            <View
              style={{
                borderRadius: 10,
                position: "absolute",
                zIndex: 99,
                borderWidth: 3,
                marginTop: 5,
                marginLeft: 55,
                borderRadius: 10,
                ...padding(0, 7),
                borderColor: "#F06292",
                transform: [{ rotate: "-20deg" }]
              }}
            >
              <Text
                style={{
                  color: "#F06292",
                  fontSize: 26
                }}
              >
                Oui
              </Text>
            </View>
            <Card
              style={{ width: 250, height: 300, position: "absolute" }}
              id={1}
              name={{
                name: "Camille",
                id: 1,
                isFemale: true,
                isMale: false
              }}
              origin={{ name: "latin" }}
            />
            <Card
              style={{
                width: 250,
                height: 300,
                marginLeft: 23,
                transform: [{ rotate: "10deg" }]
              }}
              id={1}
              name={{
                name: "Camille",
                id: 1,
                isFemale: true,
                isMale: false
              }}
              origin={{ name: "latin" }}
            />
          </View>
        </Base>
      ),
      last: () => (
        <Base
          router={this.props.router}
          text=" Si votre partenaire glisse aussi le prénoms à droite il
        apparaitra alors dans votre liste commune"
        >
          <View style={{ ...padding(30, 30, 0, 30) }}>
            <H1
              style={{
                color: COLOR_PINK,
                textAlign: "center"
              }}
            >
              Camille
            </H1>
            <H4 style={{ textAlign: "center" }}>
              Vous et votre partenaire avez indiqué que ce prénom vous plaisez.
            </H4>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={{
                  borderWidth: 3,
                  borderColor: "#fff",
                  margin: 20,
                  marginRight: 0,
                  height: 100,
                  borderRadius: 50,
                  width: 100
                }}
                source={require("../../../assets/male-face.png")}
              />
              <Image
                style={{
                  borderWidth: 3,
                  borderColor: "#fff",
                  margin: 20,
                  marginLeft: -20,
                  height: 100,
                  borderRadius: 50,
                  width: 100
                }}
                source={require("../../../assets/claire-face.png")}
              />
            </View>
          </View>
        </Base>
      )
    });

    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={scheme}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
