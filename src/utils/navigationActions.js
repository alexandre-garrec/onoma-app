class NavigationActionsClass {
    setNavigator(navigator) {
        this.navigator = navigator
    }
    push = (params) => this.navigator && this.navigator.push(params)
    pop = (params) => this.navigator && this.navigator.pop(params)
    resetTo = (params) => this.navigator && this.navigator.resetTo(params)
    toggleDrawer = (params) => this.navigator && this.navigator.toggleDrawer(params)
    showLightBox = (params) => this.navigator && this.navigator.showLightBox(params)
}

export default new NavigationActionsClass()