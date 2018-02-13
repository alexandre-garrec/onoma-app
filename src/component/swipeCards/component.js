import React from 'react'
import { StyleSheet, View } from 'react-native'
import RoundButton, { Group } from '../common/roundButton'
import SwipeCards from '../common/swipeCard'
import { COLOR_BLUE, COLOR_PINK } from '../../style'
import { CARD_HANDLE_NEXT, ADD_MATCH, CARD_HANDLE_BACK } from '../../actions'
import { getCurrentCard, getNextCard, getCardNumber, getFilters, getNameLoadingStatus } from '../../selectors/name'
import { RkText, RkButton } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

const openModal = router =>
  router.push({
    screen: 'example.filter',
    animated: true,
    backButtonTitle: 'Retour',
    title: 'Filtre'
  })

const ChangeFiter = ({ router, filters }) =>
  <View style={{
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  }}>
    <RkText rkType='info'>{filters
      ? 'Modifiez vos filtres pour avoir des nouveaux prénoms'
      : 'Sélectionnez vos filtres avant de commencer'
    }</RkText>
    <RkButton onPress={() => openModal(router)} rkType='default' >
      <Icon name='ios-options' style={{ marginRight: 10, fontSize: 18 }} />
      Filtre
    </RkButton>
  </View>

const Loading = () =>
  <View style={{
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  }}>
    <RkText rkType='info'>Chargement ...</RkText>
  </View>

const SwipeCard = ({ onRight, onLeft, onBack, handleNext, current, next, router, number, filters, loading }) =>
  <View style={styles.container}>
    <View style={{
      flexGrow: 1
    }}>
      {loading
        ? <Loading />
        : number === 0
          ? <ChangeFiter router={router} filters={filters} />
          : <SwipeCards router={router} onLeft={onLeft} onRight={onRight} handleNext={handleNext} current={current} next={next} />
      }
    </View>
    <Group>
      <RoundButton image={require('../../../assets/icons/onoma-button-close.png')} onPress={() => {
        onLeft(current)
        handleNext()
      }} />
      <RoundButton image={require('../../../assets/icons/onoma-button-back.png')} size='small' onPress={onBack} />
      <RoundButton image={require('../../../assets/icons/onoma-button-heart.png')} onPress={() => {
        onRight(current)
        handleNext()
      }} />
    </Group>
  </View>

const mapStateToProps = (state) => {
  const current = getCurrentCard(state)
  const next = getNextCard(state)
  const number = getCardNumber(state)
  const filters = !!Object.keys(getFilters(state)).length
  const loading = getNameLoadingStatus(state)
  return {
    current,
    number,
    next,
    filters,
    loading
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleNext: () => dispatch({ type: CARD_HANDLE_NEXT }),
  onRight: (id) => dispatch({ type: ADD_MATCH, payload: { id, yes: true } }),
  onLeft: (id) => dispatch({ type: ADD_MATCH, payload: { id, yes: false } }),
  onBack: () => dispatch({ type: CARD_HANDLE_BACK })
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardWrapper: {
    backgroundColor: 'transparent'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SwipeCard)
