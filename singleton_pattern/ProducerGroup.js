import Producer from "./Producer.js"

class ProducerGroup {
    constructor() {
        this.group = []
    }

    addProducer(producerId) {
        const producer = new Producer(producerId)
        this.group.push(producer)
    }

    removeProducer(producerId) {
        this.group = this.group.filter(producer => producer.id !== producerId)
    }

    getProducer(producerId) {
        return this.group.find(producer => producer.id === producerId)
    }
}

export default ProducerGroup