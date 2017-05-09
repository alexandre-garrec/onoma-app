import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

const IOS_NAV_BAR_HEIGHT = 44

const FacebookTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },
  componentWillUpdate(nextProps) {
    if (nextProps.activeTab !== this.props.activeTab)
    this.props.setLocked([].includes(nextProps.activeTab))
  },

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
         <TouchableOpacity onPress={() => this.props.goToPage(0)} style={styles.tab}>
          <Icon
            name={'ios-contact'}
            size={30}
            color={this.props.activeTab === 0 ? 'rgb(59,89,152)' : '#d8dce5'}
            ref={(icon) => { this.tabIcons[0] = icon; }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.goToPage(1)} style={styles.tab}>
          <Text style={styles.navBarTitleText}>ONOMA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.goToPage(2)} style={styles.tab}>
          <Icon
            name={'md-heart-outline'}
            size={30}
            color={this.props.activeTab === 2 ? 'rgb(59,89,152)' : '#d8dce5'}
            ref={(icon) => { this.tabIcons[2] = icon; }}
          />
        </TouchableOpacity>
    </View>
    )
  }
})

const styles = StyleSheet.create({
  tabs: {
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: IOS_NAV_BAR_HEIGHT,
    paddingLeft: 15,
    paddingRight: 15,
  },
  navBarTitleText: {
    fontSize: 17,
    letterSpacing: 0.5,
    color: '#f8bbd0',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FacebookTabBar;
