let _Vue = null
class easyRouter {
    static install(Vue) {
        // 保证只安装一次
        if (this.install.installed) return
        this.install.install = true
        _Vue = Vue

        _Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            }
        })
    }
    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: location.pathname
        })
    }
    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    createRouteMap() {
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }
    initComponents(Vue) {
        let self = this
        Vue.component('router-link', {
            props: {
                to: String
            },
            methods: {
                clickHandler(e) {
                    self.data.current = this.to
                    history.pushState({}, '', this.to)
                    e.preventDefault()
                }
            },
            render(h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slots.default])
            }
        })
        Vue.component('router-view', {
            render(h) {
                const component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }
    initEvent() {
        window.addEventListener('popstate', () => {
            this.data.current = location.pathname
        })
    }
}

export default easyRouter
