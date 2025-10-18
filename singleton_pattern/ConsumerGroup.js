import Consumer from "./Consumer.js"

class ConsumerGroup {
    constructor() {
        this.group = []
    }

    addConsumer(consumerId) {
        const consumer = new Consumer(consumerId)
        this.group.push(consumer)
    }

    removeConsumer(consumerId) {
        this.group = this.group.filter(consumer => consumer.id !== consumerId)
    }

    getConsumer(consumerId) {
        return this.group.find(consumer => consumer.id === consumerId)
    }
}

export default ConsumerGroup