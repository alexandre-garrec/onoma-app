export const getError = state => state.user.gui.error

export const getCurrentId = state => state.user.current

export const getCurrentUser = state => state.user.users[getCurrentId(state)]
