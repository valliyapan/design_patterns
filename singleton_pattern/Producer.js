import queue from './Queue.js'

class Producer {
    constructor(id) {
        this.id = id
    }

    send(data) {
        const response = queue.write(data)
        console.log(`[Producer-${this.id}] Send response: ${response.message}`)
    }
}

export default Producer