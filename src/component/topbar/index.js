import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR_LIGHT_GRAY } from '../../style'

const IOS_NAV_BAR_HEIGHT = 44

const FacebookTabBar = ({ goToPage, style, activeTab }) =>
  <View style={[styles.tabs, style]}>
    <TouchableOpacity onPress={() => goToPage(0)} style={styles.tab}>
      <Icon
        name={'ios-contact'}
        size={30}
        color={activeTab === 0 ? '#3b5998' : COLOR_LIGHT_GRAY}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => goToPage(1)} style={styles.tab}>
      <Text style={{ color: activeTab === 1 ? '#f8bbd0' : COLOR_LIGHT_GRAY, fontSize: 17,  letterSpacing: 0.5,  fontWeight: '500'}}>ONOMA</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => goToPage(2)} style={styles.tab}>
      <Icon
        name={'md-heart-outline'}
        size={30}
        color={activeTab === 2 ? '#3b5998' : COLOR_LIGHT_GRAY}
      />
    </TouchableOpacity>
</View>

const styles = StyleSheet.create({
  tabs: {
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: IOS_NAV_BAR_HEIGHT,
    paddingLeft: 15,
    paddingRight: 15,
  }
})

export default FacebookTabBar;
