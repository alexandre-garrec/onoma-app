import { Dimensions } from 'react-native'

export const extractStyle = style => (Array.isArray(style) ? style : [style])

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width
// const y = Dimensions.get('window').height

// Calculating ratio from iPhone breakpoints
// x < 375 ? (x < 320 ? 0.75 : 0.875) : 1
const ratioX = (() => {
  switch (true) {
    case x < 320:
      return 0.75
    case x >= 320 && x < 375:
      return 0.875
    case x >= 375 && x < 768:
      return 1
    case x >= 768:
      return 1.25
  }
})()

// const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1

// We set our base font size value
const baseUnit = 16

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX

// We add an em() shortcut function
export const em = value => unit * value
