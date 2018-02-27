import { NativeModules, NativeEventEmitter } from 'react-native'
import { eventChannel } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { listen } from './saga'

const { FirebaseLinks } = NativeModules

const firebaseLinksEmitter = new NativeEventEmitter(FirebaseLinks)

const EVENTS = { received: 'dynamic_link_received' }

class FirebaseLink {
  getInitialLink() {
    return FirebaseLinks.getInitialLink().then(link => link)
  }
  onLink(cb) {
    if (this.channel) {
      return console.log('onLink event already listening')
    }

    function createChannel() {
      return eventChannel(emit => {
        const _onLink = payload => emit({ payload })
        firebaseLinksEmitter.addListener(EVENTS.received, _onLink)
        const unsubscribe = () => {
          firebaseLinksEmitter.removeListener(EVENTS.received, _onLink)
        }
        return unsubscribe
      })
    }
    this.channel = createChannel()
    return fork(listen, this.channel, cb)
  }
  removeOnLink() {
    this.channel && this.channel.close()
  }
}

export default new FirebaseLink()
