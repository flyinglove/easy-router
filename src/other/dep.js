class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
class Observer {
    update() {
        console.log('update')
    }
}

const dep = new Dep()
const observer = new Observer()
dep.addSub(observer)
dep.notify()