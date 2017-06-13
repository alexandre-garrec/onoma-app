import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { getBadgeCount } from '../../selectors/user'

const IOS_NAV_BAR_HEIGHT = 44

const isActive = (activeTab, index) => activeTab === index

const FacebookTabBar = ({ goToPage, style, activeTab, badgeCount = 0 }) =>
  <View style={[styles.tabs, style]}>
    <TouchableOpacity onPress={() => goToPage(0)} style={styles.tab}>
      <Image
        resizeMode='contain'
        style={styles.picto}
        source={isActive(activeTab, 0)
          ? require('../../../assets/picto-profil-active.png')
          : require('../../../assets/picto-profil.png')
        }
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => goToPage(1)} style={styles.tab}>
      <Image resizeMode='contain' style={styles.image} source={require('../../../assets/onoma-logo-topbar.png')} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => goToPage(2)} style={styles.tab}>
      <Image
        resizeMode='contain'
        style={styles.picto}
        source={isActive(activeTab, 2)
          ? require('../../../assets/picto-list-active.png')
          : badgeCount
            ? require('../../../assets/picto-list-notif.png')
            : require('../../../assets/picto-list.png')
        }
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
    paddingRight: 15
    // borderBottomWidth: 1,
  },
  image: {
    width: 100,
    height: 30
  },
  picto: {
    width: 25
  }
})

const mapStateToProps = (state) => {
  const badgeCount = getBadgeCount(state)
  return {
    badgeCount
  }
}

export default connect(mapStateToProps)(FacebookTabBar)
