class Subscriber {
    constructor() {
        this.subMap = {}
    }
    on(eventType, callback) {
        this.subMap[eventType] = this.subMap[eventType] || []
        this.subMap[eventType].push(callback)
    }
    emit(eventType) {
        this.subMap[eventType] && this.subMap[eventType].forEach(item => {
            item()
        } )
    }
    
}