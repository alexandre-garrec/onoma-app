import React from "react";
import { SegmentedControlIOS } from "react-native";
import MatchList from "../component/name/list/match";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {
  COLOR_BLACK,
  COLOR_PINK,
  COLOR_BLUE,
  COLOR_LIGHT_GRAY
} from "../style";
import { REGULAR } from "../styles/font";
import { em } from "../styles/utils";

import { View, StyleSheet, Dimensions } from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Liste des matchs" },
      { key: "second", title: "Liste personnelle" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => (
    <TabBar
      {...props}
      labelStyle={{
        color: COLOR_BLACK,
        textTransform: "lowercase",
        fontFamily: REGULAR,
        fontSize: em(0.8125)
      }}
      indicatorStyle={{ backgroundColor: COLOR_PINK }}
      style={{
        color: "red",
        backgroundColor: "#fff"
      }}
    />
  );

  render() {
    const { router } = this.props;
    const scheme = SceneMap({
      first: () => <MatchList router={router} />,
      second: () => <MatchList personal={true} router={router} />
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

// const Topbar = ({ goToPage, activeTab }) => (
//   <SegmentedControlIOS
//     style={{
//       margin: 20
//     }}
//     tintColor={COLOR_PINK}
//     selectedIndex={activeTab}
//     onChange={event => goToPage(event.nativeEvent.selectedSegmentIndex)}
//     values={['Liste des matchs', 'Liste personnelle']}
//   />
// )

// const List = ({ router }) => (
//   <ScrollableTabView
//     tabBarInactiveTextColor={COLOR_BLACK}
//     tabBarTextStyle={{ fontWeight: 'normal' }}
//     tabBarActiveTextColor={COLOR_PINK}
//     tabBarUnderlineStyle={{ height: 2, backgroundColor: COLOR_BLUE }}
//     renderTabBar={() => <Topbar />}
//     locked
//   >
//     <MatchList router={router} />
//     <MatchList personal router={router} />
//   </ScrollableTabView>
// )

// export default List
