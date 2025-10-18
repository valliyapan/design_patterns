import queue from "./Queue.js"

class Consumer {
    constructor(id) {
        this.id = id
    }

    read() {
        const data = queue.read()
        if (data) {
            console.log(`[Consumer-${this.id}] Received message: ${data.message} with uuid: ${data.uuid}`)
            // after successful reading delete the message
            this.delete(data.uuid)
        }
    }

    delete(uuid) {
        const response = queue.delete(uuid)
        console.log(`[Consumer-${this.id}] Delete message response for ${uuid}: ${response.message}`)
    }

    getAvailableMeessages() {
        const response = queue.getMessageCount()
        console.log(`[Consumer-${this.id}] Available messages: ${response}`)
    }
}

export default Consumer