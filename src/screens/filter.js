import React, { Component } from "react";
import { StyleSheet, ScrollView, Switch, View, Text } from "react-native";
import { RkText } from "react-native-ui-kitten";
import GenderIcon from "../component/common/genderIcon";
import { ButtonWrapper, Button } from "../component/common/inlineButton";

import { COLOR_PINK } from "../style";

import { padding } from "../utils/style";
import { capitalizeFirstLetter } from "../utils";

import { connect } from "react-redux";
import { SET_FILTER } from "../actions";
import { getFilters } from "../selectors/name";
import { getOrigins } from "../selectors/origin";

const GenderButton = ({
  isMale = false,
  isFemale = false,
  isActive = false,
  onPress
}) => {
  const color = isActive ? {} : { color: "#e5e5e5" };
  return (
    <Button onPress={onPress} style={{ flex: 1 }} isActive={isActive}>
      <GenderIcon
        size={35}
        style={[{ margin: 10 }, color]}
        isMale={isMale}
        isFemale={isFemale}
      />
      <Text style={color}>{isMale ? "Garçon" : "Fille"}</Text>
    </Button>
  );
};

class Filter extends Component {
  setOrigin(id) {
    const {
      setFilter,
      filters: { origin: origins = [] }
    } = this.props;
    const origin = (() => {
      if (origins.includes(id)) return [...origins].filter(o => o !== id);
      else return [...origins, id];
    })();

    setFilter({ origin: origin });
  }
  render() {
    const { navigator, setFilter, filters, origins } = this.props;
    return (
      <ScrollView style={styles.wrapper}>
        <RkText rkType="menu">Sexe</RkText>
        <ButtonWrapper>
          <GenderButton
            isMale
            onPress={() => setFilter({ isMale: !filters.isMale })}
            isActive={filters.isMale}
          />
          <GenderButton
            isFemale
            onPress={() => setFilter({ isFemale: !filters.isFemale })}
            isActive={filters.isFemale}
          />
        </ButtonWrapper>

        <RkText rkType="menu">Prénoms</RkText>
        <View style={styles.rowContainer}>
          {origins.map(origin => (
            <View key={origin.id} style={styles.row}>
              <Text style={styles.rowText}>
                {capitalizeFirstLetter(origin.name)}
              </Text>
              <Switch
                onValueChange={() => this.setOrigin(origin.id)}
                value={filters.origin && filters.origin.includes(origin.id)}
                tintColor={"#e5e5e5"}
                onTintColor={COLOR_PINK}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const filters = getFilters(state);
  const origins = getOrigins(state);
  return {
    filters,
    origins
  };
};

const mapDispatchToProps = (dispatch, { id }) => ({
  setFilter: filter => dispatch({ type: SET_FILTER, payload: filter })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F7F7F7",
    flex: 1
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: "#e5e5e5",
    ...padding(10, 20)
  },
  rowText: {},
  rowContainer: {
    borderColor: "#e5e5e5",
    borderTopWidth: 1
  }
});
