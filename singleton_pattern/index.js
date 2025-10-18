import ProducerGroup from "./ProducerGroup.js"
import ConsumerGroup from "./ConsumerGroup.js"

function runProducerGroup() {
    const producerGroup = new ProducerGroup()

    const producerIds = [1, 2, 3]

    producerIds.forEach((id) => {
        producerGroup.addProducer(id)
    })

    // Send message to queue every 500ms
    setInterval(() => {
        producerIds.forEach((id) => {
            const producer = producerGroup.getProducer(id)
            producer.send((+new Date()))
        })
    }, 500)
}

function runConsumerGroup() {
    const consumerGroup = new ConsumerGroup()

    const consumerIds = [1, 2]

    consumerIds.forEach((id) => {
        consumerGroup.addConsumer(id)
    })

    // Consume messages by polling every 400ms
    setInterval(() => {
        consumerIds.forEach((id) => {
            const consumer = consumerGroup.getConsumer(id)
            consumer.read()
        })
    }, 400)

    // Show available messages every one second
    setInterval(() => {
        const consumer = consumerGroup.getConsumer(1)
        consumer.getAvailableMeessages()
    }, 1000)
}

runConsumerGroup()
runProducerGroup()