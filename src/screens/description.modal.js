import React from "react";
import { StyleSheet, ScrollView, View, Share } from "react-native";

import { getNameById, getDescriptionById } from "../selectors/name";
import { getOriginById } from "../selectors/origin";
import { width } from "../utils/style";

import {
  CARD_HANDLE_NEXT,
  ADD_MATCH,
  CARD_HANDLE_BACK,
  DELETE_MATCH,
  GET_DESCRIPTION
} from "../actions";
import { connect } from "react-redux";
import { padding } from "../utils/style";
import withOutNavbar from "../utils/withOutNavbar";
import { COLOR_PINK, COLOR_BLUE } from "../style";
import { H1, H2, P } from "../styles/text";
import Icon from "react-native-vector-icons/Ionicons";
import GenderIcon from "../component/common/genderIcon";
import Chart from "react-native-chart";
import RoundButton, { Group } from "../component/common/roundButton";
import Query from "../utils/query";
import ScrollIndicator from "@inteach/react-native-scroll-indicator";

const getGenderColor = isFemale => (isFemale ? COLOR_PINK : COLOR_BLUE);

const Profil = ({
  description: { desc, orig, hist },
  name: { id, name, isFemale, isMale, giveIn },
  deleteItem,
  onLeft,
  onRight,
  handleNext,
  onBack,
  origin,
  navigator,
  withOutNavbar = false
}) => {
  const color = getGenderColor(isFemale);
  const dates = Object.keys(giveIn);
  const data = giveIn
    ? dates.reduce((memo, key) => [...memo, [key, giveIn[key]]], [])
    : [];

  return (
    <View style={{ justifyContent: "space-between", display: "flex", flex: 1 }}>
      {withOutNavbar ? (
        <View style={styles.topbar}>
          <Icon
            name="ios-arrow-down"
            color={COLOR_BLUE}
            size={36}
            onPress={() => navigator.dismissModal()}
          />
        </View>
      ) : null}
      <Query action={GET_DESCRIPTION} id={id} />
      <ScrollIndicator
        style={styles.wrapper}
        linearGradientColors={["rgba(255, 255, 255, 0)", "#ffffff"]}
      >
        <H1 style={{ color: color, marginBottom: 20 }}>
          {name} <GenderIcon isFemale={isFemale} isMale={isMale} />
        </H1>
        {origin ? (
          <View style={{ marginBottom: 20 }}>
            <H2 style={{ marginBottom: 20 }}>Origine</H2>
            <P>prénoms {origin.name}</P>
          </View>
        ) : null}
        <H2 style={{ marginBottom: 20 }}>Étymologie</H2>
        <P style={{ marginBottom: 20 }}>{desc || orig || hist || "NC"}</P>

        {giveIn ? <H2 style={{ marginBottom: 20 }}>Statistiques</H2> : null}
        {giveIn ? <P style={{ marginBottom: 5 }}>En milliers</P> : null}
        {giveIn ? (
          <Chart
            style={styles.chart}
            data={data}
            type="line"
            cornerRadius={5}
            lineWidth={2}
            dataPointRadius={0}
            axisColor="#989898"
            axisLabelColor="#989898"
            showGrid={false}
            xAxisTransform={val => {
              const index = dates.indexOf(val);
              if (index % 2) return "";
              return val;
            }}
            showDataPoint
            color={COLOR_PINK}
          />
        ) : null}
      </ScrollIndicator>
      <Group style={{ position: "absolute", bottom: 0, width: width(100) }}>
        <RoundButton
          image={require("../../assets/icons/onoma-button-close.png")}
          onPress={() => {
            if (withOutNavbar) {
              onLeft();
              handleNext();
              navigator.dismissModal();
            } else {
              deleteItem();
              navigator.pop();
            }
          }}
        />
        <RoundButton
          image={require("../../assets/icons/onoma-share.png")}
          size={withOutNavbar ? "small" : "normal"}
          onPress={() => {
            Share.share({
              message: "Rejoignez votre partenaire sur onoma",
              title: "Onoma invite"
            });
          }}
        />
        {withOutNavbar ? (
          <RoundButton
            image={require("../../assets/icons/onoma-button-heart.png")}
            onPress={() => {
              onRight();
              handleNext();
              withOutNavbar && navigator.dismissModal();
            }}
          />
        ) : null}
      </Group>
    </View>
  );
};

const mapStateToProps = (state, { id }) => {
  const name = getNameById(state, id) || false;
  const origin = name ? getOriginById(state, name.origin) : false;
  const description = getDescriptionById(state, id) || {};

  return {
    name,
    origin,
    description
  };
};

const mapDispatchToProps = (dispatch, { id }) => ({
  deleteItem: () => dispatch({ type: DELETE_MATCH, payload: id }),
  handleNext: () => dispatch({ type: CARD_HANDLE_NEXT }),
  onRight: () => dispatch({ type: ADD_MATCH, payload: { id, yes: true } }),
  onLeft: () => dispatch({ type: ADD_MATCH, payload: { id, yes: false } }),
  onBack: () => dispatch({ type: CARD_HANDLE_BACK })
});

var styles = StyleSheet.create({
  topbar: {
    zIndex: 1,
    borderTopWidth: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 55,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "transparent"
  },
  wrapper: {
    flexGrow: 1,
    overflow: "visible",
    ...padding(20, 20, 100, 20)
  },
  chart: {
    flex: 1,
    height: 150
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);

export const DescriptionwithOutNavbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(withOutNavbar(Profil));
