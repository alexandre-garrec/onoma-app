export const getError = state => state.user.gui.error

export const getCurrentId = state => state.user.current

export const getCurrentUser = state => state.user.users[getCurrentId(state)]

export const displayLogin = state => state.user.gui.displayLogin

export const getBadgeCount = state => state.user.gui.badge

export const getDynamiclink = state => state.user.gui.dynamiclink
